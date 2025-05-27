const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt = require('bcryptjs');
const EmployeeModel=require('./models/user')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const PlantRoute = require('./routes/PlantRoute');
const path = require("path");
const app=express()
const authRouter = require("./routes/auth");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios'); 
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const allowedOrigin = [
  'blume-haus-t3tz.vercel.app',
  'blume-haus-t3tz-git-main-nishita-s-projects.vercel.app',
    'blume-haus-t3tz-isg2a51zj-nishita-s-projects.vercel.app',
  'http://localhost:3000'
];

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
};
app.use(cors(corsOptions));



app.post('/login', (req,res)=>{
    const {email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                
                    
                if(response)
                    {
                        const token= jwt.sign({email: user.email},process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
                        res.cookie("token", token, {
  httpOnly: true,
  secure: true, // set to true if using HTTPS
  sameSite: "None", // required for cross-site requests like Vercel frontend
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
                        res.json("success")
                    }
                    else
                    {
                        res.json("Password is incorrect")
                    }
            })
        }
        else
        {
            res.json("No record exists")
        }
    })
})
app.post('/', (req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then(hash=>{
        EmployeeModel.create({name,email,password:hash})
        .then(employees=>res.json(employees))
        .catch((err)=>res.json(err))
    }).catch(err=>console.log(err.message))

})
const verifyUser=(req,res,next)=>{
    const token= req.cookies.token;
    if(!token)
{
    return res.json("This token is not available")
}
else{
    jwt.verify(token,`${process.env.JWT_SECRET_KEY}`,(err,decoded)=>{
        if(err) return res.json("Token is wrong")
        req.user = decoded; 
        next()
    })
}

}



app.get('/home',verifyUser,(req,res)=>{
    res.json("Success");
})

// mongoose.connect('mongodb+srv://kspprachi:hbeLLRuOQ8ZdIgFK@plant-care.j97rfdo.mongodb.net/?retryWrites=true&w=majority&appName=Plant-Care')

app.use("/api/plants",verifyUser, PlantRoute);
app.use("/api/auth", authRouter);
// app.use('/payment', paymentRoute);


//payment start
const MERCHANT_KEY=process.env.MERCHANT_KEY
const MERCHANT_ID=process.env.MERCHANT_ID

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const MERCHANT_BASE_URL=process.env.MERCHANT_BASE_URL
const MERCHANT_STATUS_URL=process.env.MERCHANT_STATUS_URL

const redirectUrl=`${process.env.REDIRECT_URL}/status`

const successUrl=`${process.env.FRONTEND_URL}/payment-success`
const failureUrl=`${process.env.FRONTEND_URL}/payment-failure`


app.post('/create-order', async (req, res) => {
    const { name, mobileNumber, amount } = req.body;
    const orderId = uuidv4();

    const paymentPayload = {
        merchantId: MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount: amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const keyIndex = 1;
    const stringToHash = payload + '/pg/v1/pay' + MERCHANT_KEY;

    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const option = {
        method: 'POST',
        url: MERCHANT_BASE_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payload
        }
    };

    try {
        const response = await axios.request(option);
        console.log("PhonePe response:", response.data);
        res.status(200).json({ msg: "OK", url: response.data.data.instrumentResponse.redirectInfo.url });
    } catch (error) {
        console.error("Detailed error in /create-order:", error.response?.data || error.message || error);
        res.status(500).json({ error: 'Failed to initiate payment', details: error.response?.data || error.message });
    }
});



app.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;

    const keyIndex = 1;
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const option = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    };

    try {
        const response = await axios.request(option);
        console.log("Status check response:", response.data);
        
        // More detailed status checking
        if (response.data.success && 
            response.data.code === 'PAYMENT_SUCCESS' && 
            response.data.data && 
            response.data.data.state === 'COMPLETED') {
            return res.redirect(successUrl);
        } else {
            return res.redirect(failureUrl);
        }
    } catch (error) {
        console.error("Status check error:", error);
        return res.redirect(failureUrl);
    }
});
//payment end

// Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


mongoose.connect(`${process.env.MONGO_URL}`)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error: ", err));




app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port 3001`)
})

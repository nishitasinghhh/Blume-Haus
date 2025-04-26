// import React from 'react'
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import './Login.css'

// const Login = () => {
  
//   const [email,setEmail] = useState('');
//   const [password,setPassword]= useState('');
//   const navigate=useNavigate();

//   axios.defaults.withCredentials=true;

//   const handleSubmit =(e)=>{
//     e.preventDefault()
//     axios.post('http://localhost:3001/login',{email,password},{withCredentials:true})
//     .then(result=>{
//       console.log(result)
//   if (result.data === 'success'){
//     navigate('/home')
//   }
// } )
    
//    // .catch((err) => console.log(err));
//   }
//   return (
//     <div className="container px-4 py-5 mx-auto">
//     <div className="card card0">
//       <div className="d-flex flex-lg-row flex-column-reverse">
//         <div className="card card1">
//           <div className="row justify-content-center my-auto">
//             <div className="col-md-8 col-10 my-5">
//               <div className="row justify-content-center px-3 mb-3">
//               <img id="logo" src="/leaf.png" alt="Logo" />

//               </div>

//               <h3 className="mb-5 text-center heading">Welcome to Blume Haus</h3>
//               <h6 className="msg-info text-center">Please login to access your account</h6>
//               <form onSubmit={handleSubmit}>
             

//               <div className="form-group">
//                 <label className="form-control-label text-muted">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Email address"
//                   className="form-control"
//                   onChange={(e)=> setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-control-label text-muted">Password</label>
//                 <input
//                   type="password"
//                   id="psw"
//                   name="psw"
//                   placeholder="Password"
//                   className="form-control"
//                   onChange={(e)=> setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="row justify-content-center my-3 px-3">
//                 <button  className="btn-block btn-color" onSubmit={handleSubmit}>Login</button>
//               </div>

//               <div className="row justify-content-center my-2">
//                 <a href="#">
//                   <small className="text-muted"></small>
//                 </a>
//               </div>
//               </form>
//             </div>
//           </div>

//           <div className="sm-text mx-auto mb-3 d-flex align-items-center justify-content-center gap-2">
//   <span>Don't have an account?</span>
//   <Link to="/register" className="btn btn-white">Sign Up</Link>
// </div>
//         </div>

//         <div className="card card2">
//           <div className="my-auto mx-md-5 px-md-5 right">
//             <h3 className="text-white">LEAF IT TO US 🌿</h3>
//             <small className="text-white">
//             At Blume Haus, we know how easy it is to forget when your plants need a little love. That’s why we've got your back! Our app sends you timely reminders, ensuring your plants get the right amount of water, every time. With just a tap, you can set up personalized care schedules for all your green friends, so you can focus on watching them thrive. No more guessing—just healthy, happy plants!


//             </small>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Login

import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from "react";
import './Login.css'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword]= useState('');
  const navigate=useNavigate();

  axios.defaults.withCredentials=true;

  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{email,password},{withCredentials:true})
    .then(result=>{
      console.log(result)
      if (result.data === 'success'){
        navigate('/home')
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-layout">
          <div className="login-form-section">
            <div className="login-form-container">
              <div className="login-logo-container">
                <img className="login-logo" src="/leaf.png" alt="Logo" />
              </div>

              <h3 className="login-title">Welcome to Blume Haus</h3>
              <h6 className="login-subtitle">Please login to access your account</h6>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                  <label className="login-form-label">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="Email address"
                    className="login-form-input"
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>

                <div className="login-form-group">
                  <label className="login-form-label">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    name="psw"
                    placeholder="Password"
                    className="login-form-input"
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>

                <div className="login-button-container">
                  <button type="submit" className="login-button">Login</button>
                </div>
              </form>
            </div>
          </div>

          <div className="login-info-section">
            <div className="login-info-content">
              <h3 className="login-info-title">LEAF IT TO US 🌿</h3>
              <p className="login-info-text">
                At Blume Haus, we know how easy it is to forget when your plants need a little love. 
                That's why we've got your back! Our app sends you timely reminders, ensuring your plants 
                get the right amount of water, every time.
              </p>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <Link to="/" className="login-footer-link">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;



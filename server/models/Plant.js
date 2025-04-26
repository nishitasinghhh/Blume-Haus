
const mongoose=require('mongoose')
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastWatered: { type: Date, required: true },
  waterFrequency: { type: Number, required: true }, 
  lightRequirement: { type: String, required: true },
  imageUrl: { type: String }, 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  healthStatus: {
    type: String,
    default: "Healthy"
  }
});

const Plant = mongoose.model("Plant", plantSchema);
module.exports=Plant;

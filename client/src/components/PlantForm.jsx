import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PlantForm.css'

const PlantForm = () => {
  const [name, setName] = useState("");
  const [lastWatered, setLastWatered] = useState("");
  const [waterFrequency, setWaterFrequency] = useState("");
  const [lightRequirement, setLightRequirement] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const plantData = new FormData();
    plantData.append("name", name);
    plantData.append("lastWatered", lastWatered);
    plantData.append("waterFrequency", parseInt(waterFrequency));
    plantData.append("lightRequirement", lightRequirement);
    
    // Only append the raw image file (backend will handle upload)
    if (image) {
      plantData.append("image", image); 
    }

    try {
      // Send all data (including raw image) to backend
      await axios.post("http://localhost:3001/api/plants", plantData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      navigate("/home");
      alert("Plant added successfully!");

      // Reset form
      setName("");
      setLastWatered("");
      setWaterFrequency("");
      setLightRequirement("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to add plant. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 form-container">
      <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-xl rounded-xl form-box">
        <div className="heading">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Plant</h2>
          <p className="text-gray-600 mb-6">Track and care for your new green friend</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="label-input">
            <label className="block text-sm font-medium text-gray-700">Plant Name</label>
            <input
              type="text" 
              placeholder="e.g., Monstera Deliciosa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="label-input">
            <label className="block text-sm font-medium text-gray-700">Planting Date</label>
            <input
              type="date"
              value={lastWatered}
              onChange={(e) => setLastWatered(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="label-input">
            <label className="block text-sm font-medium text-gray-700">Watering Schedule</label>
            <input
              type="number"
              placeholder="Water every (days)"
              value={waterFrequency}
              onChange={(e) => setWaterFrequency(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="label-input">
            <label className="block text-sm font-medium text-gray-700">Light Requirements</label>
            <select
              value={lightRequirement}
              onChange={(e) => setLightRequirement(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Light</option>
              <option value="Low light">Low light</option>
              <option value="Medium light">Medium light</option>
              <option value="Bright indirect">Bright indirect</option>
            </select>
          </div>

          <div className="label-input">
            <label className="block text-sm font-medium text-gray-700">Upload Plant Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="mt-1 w-full border border-dashed border-gray-400 rounded-lg p-4 text-center text-gray-500 cursor-pointer file:opacity-0"
            />
          </div>

          <div className="flex mt-6 label-input green-but">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white shadow hover:bg-green-700 transition add-plant"
            >
              Add Plant +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantForm;
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import "./PantCard.css"; 
import React from 'react'; 
function PlantCard({ plant, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPlant, setUpdatedPlant] = useState({ ...plant });

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/plants/${plant._id}`, { withCredentials: true });
      if (response.status === 200) onDelete(plant._id);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/plants/${plant._id}`, updatedPlant, { withCredentials: true });
      if (response.status === 200) {
        const updated = { ...response.data, healthStatus: getHealthStatus(response.data) };
        onUpdate(updated);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  const getHealthStatus = (plant) => {
    const last = new Date(plant.lastWatered);
    const today = new Date();
    const diffInDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    return diffInDays > plant.waterFrequency ? "Needs Water" : "Healthy";
  };

  const healthStatus = getHealthStatus(plant);

  return (
    <div className="plant-card">
      {!isEditing && (
        <>
          {plant.imageUrl && (
            <div className="plant-image-container">
              <img
               src={plant.imageUrl} 
               alt={plant.name}
                className="plant-image"
              />
              <span className={`health-status ${healthStatus === "Healthy" ? "healthy" : "needs-water"}`}>
                {healthStatus}
              </span>
            </div>
          )}
          
          <h2 className="plant-name">🪴 {plant.name}</h2>
          <p className="plant-info"><strong>⏳ Last Watered:</strong> {new Date(plant.lastWatered).toDateString()}</p>
          <p className="plant-info"><strong>💧 Water Frequency:</strong> Every {plant.waterFrequency} days</p>
          <p className="plant-info"><strong>☀️ Light Requirement:</strong> {plant.lightRequirement}</p>
          
          <div className="plant-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">✏️ Edit</button>
            <button onClick={handleDelete} className="delete-button">🗑️ Delete</button>
          </div>
        </>
      )}

      {isEditing && (
        <>
          <input
            type="text"
            value={updatedPlant.name}
            onChange={(e) => setUpdatedPlant({ ...updatedPlant, name: e.target.value })}
            className="edit-input"
          />
          <input
            type="date"
            value={updatedPlant.lastWatered.split("T")[0]}
            onChange={(e) => setUpdatedPlant({ ...updatedPlant, lastWatered: e.target.value })}
            className="edit-input"
          />
          <input
            type="number"
            value={updatedPlant.waterFrequency}
            onChange={(e) => setUpdatedPlant({ ...updatedPlant, waterFrequency: Number(e.target.value) })}
            className="edit-input"
          />
          <input
            type="text"
            value={updatedPlant.lightRequirement}
            onChange={(e) => setUpdatedPlant({ ...updatedPlant, lightRequirement: e.target.value })}
            className="edit-input"
          />
          
          <div className="edit-actions">
            <button onClick={handleUpdate} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

PlantCard.propTypes = {
  plant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastWatered: PropTypes.string.isRequired,
    waterFrequency: PropTypes.number.isRequired,
    lightRequirement: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    healthStatus: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlantCard;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from 'react-toastify';
import './WaterReminderSection.css';

function WaterReminderSection({ plants, onUpdate }) {
  const [duePlants, setDuePlants] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filtered = plants.filter(p => {
      const lastWatered = new Date(p.lastWatered);
      const daysSinceWatered = Math.floor((today - lastWatered) / (1000 * 60 * 60 * 24));
      const dueIn = p.waterFrequency - daysSinceWatered;
      return dueIn <= 3; 
    });
    setDuePlants(filtered);
  }, [plants]);

  const handleMarkDone = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/plants/${id}/water`);
      if (response.status === 200) {
        const updated = { ...response.data, healthStatus: "Healthy" };
        onUpdate(updated);
        toast.success('Watered successfully! 🌱');
      }
    } catch (err) {
      console.error("Error marking done", err);
      toast.error('Failed to update. Please try again.');
    }
  };

  const getDueText = (plant) => {
    const today = new Date();
    const last = new Date(plant.lastWatered);
    const days = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    const dueIn = plant.waterFrequency - days;
    if (dueIn <= 0) return "Due today";
    if (dueIn === 1) return "Due tomorrow";
    return `Due in ${dueIn} days`;
  };

  return (
    <div className="reminder-section">
      <h2 className="reminder-title">Upcoming Reminders</h2>
      {duePlants.length === 0 ? (
        <p className="no-reminders">All caught up on watering!</p>
      ) : (
        <ul className="reminder-list">
          {duePlants.map((plant) => (
            <li key={plant._id} className="reminder-item">
              <div className="reminder-text">
                <p className="reminder-action">Water {plant.name}</p>
                <p className="reminder-due">{getDueText(plant)}</p>
              </div>
              <button 
                onClick={() => handleMarkDone(plant._id)}
                className="mark-done-button"
              >
                Mark Done
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

WaterReminderSection.propTypes = {
  plants: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WaterReminderSection;

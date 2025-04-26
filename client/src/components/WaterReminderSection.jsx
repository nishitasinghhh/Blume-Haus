// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
// import { toast } from 'react-toastify';

// function WaterReminderSection({ plants, onUpdate }) {
//   const [duePlants, setDuePlants] = useState([]);

//   // useEffect(() => {
//   //   const filtered = plants.filter(p => p.healthStatus === "Needs Water");
//   //   setDuePlants(filtered);
//   // }, [plants]);

//   useEffect(() => {
//     const today = new Date();
//     const filtered = plants.filter(p => {
//       const lastWatered = new Date(p.lastWatered);
//       const daysSinceWatered = Math.floor((today - lastWatered) / (1000 * 60 * 60 * 24));
//       const dueIn = p.waterFrequency - daysSinceWatered;
  
//       return p.healthStatus === "Needs Water" || (dueIn > 0 && dueIn <= 3);
//     });
//     setDuePlants(filtered);
//   }, [plants]);

//   const handleMarkDone = async (id) => {
//     try {
//       const response = await axios.put(`http://localhost:3001/api/plants/${id}/water`);
//       if (response.status === 200) {
//         const updated = { ...response.data, healthStatus: "Healthy" };
//         onUpdate(updated);
//         toast.success('Watered successfully! 🌱');
//       }
//     } catch (err) {
//       console.error("Error marking done", err);
//       toast.error('Failed to update. Please try again.');
//     }
//   };

//   const getDueText = (plant) => {
//     const today = new Date();
//     const last = new Date(plant.lastWatered);
//     const days = Math.floor((today - last) / (1000 * 60 * 60 * 24));
//     const dueIn = plant.waterFrequency - days;
//     if (dueIn <= 0) return "Due today";
//     if (dueIn === 1) return "Due tomorrow";
//     return `Due in ${dueIn} days`;
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌱 Water Reminders</h2>
//       {duePlants.length === 0 ? (
//         <p className="text-gray-500">All plants are healthy!</p>
//       ) : (
//         <div className="space-y-3">
//           {duePlants.map((plant) => (
//             <div
//               key={plant._id}
//               className="flex items-center justify-between bg-blue-50 p-4 rounded-md shadow-sm"
//             >
//               <div>
//                 <p className="text-md font-medium text-gray-700">Water {plant.name}</p>
//                 <p className="text-sm text-gray-500">{getDueText(plant)}</p>
//               </div>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   onChange={() => handleMarkDone(plant._id)}
//                   className="h-5 w-5 text-blue-600"
//                 />
//                 <span className="text-blue-600 font-medium">Done</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// WaterReminderSection.propTypes = {
//   plants: PropTypes.array.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default WaterReminderSection;
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
      return dueIn <= 3; // Show reminders for plants due in next 3 days or overdue
    });
    setDuePlants(filtered);
  }, [plants]);

  const handleMarkDone = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/plants/${id}/water`);
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

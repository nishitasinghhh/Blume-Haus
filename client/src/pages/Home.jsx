// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PlantCard from '../components/PlantCard'; 
// import WaterReminderSection from '../components/WaterReminderSection';
// import './Home.css'
// import Footer from '../components/Footer';
// const Home = () => {
//   const [plants, setPlants] = useState([]);
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     axios.get('http://localhost:3001/home')
//       .then(result => {
//         if (result.data !== "Success") {
//           navigate('/login');
//         }
//       })
//       .catch(err => console.error("Login check failed:", err));

//     const fetchPlants = async () => {
//       try {
//         const res = await axios.get("http://localhost:3001/api/plants");
//         const updated = res.data.map(p => ({ ...p, healthStatus: getHealthStatus(p) }));
//         setPlants(updated);
//       } catch (error) {
//         console.error("Error fetching plant data", error);
//       }
//     };

//     fetchPlants();
//   }, [navigate]);

//   const getHealthStatus = (plant) => {
//     const last = new Date(plant.lastWatered);
//     const today = new Date();
//     const diffInDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
//     return diffInDays > plant.waterFrequency ? "Needs Water" : "Healthy";
//   };

//   const handleClick = () => navigate("/form");

//   const handleDelete = (deletedId) => {
//     setPlants(prev => prev.filter(plant => plant._id !== deletedId));
//   };

//   const handleUpdatePlant = (updatedPlant) => {
//     updatedPlant.healthStatus = getHealthStatus(updatedPlant);
//     setPlants((prevPlants) =>
//       prevPlants.map((p) => (p._id === updatedPlant._id ? updatedPlant : p))
//     );
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });

//       navigate('/login');
//     } catch (error) {
//       console.error("Error logging out:", error);
//     } 
//   };

//   return (
//     <div className="p-8 contai">
//        <div className='navbar'>
//         <h1>Blume Haus</h1>
//         <div className='navbar-button flex gap-4'>
//          <button
//           onClick={handleLogout}
//           className="btn-color rounded-xl shadow-md"
//         >
//           Logout
//         </button>
//         <button
//           className="btn-color rounded-xl shadow-md"
//         >
//           Donate
//         </button>
//         </div>
//        </div>
//        <div className="dashboard grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        
//   <div className="dashboard-card">
//     <h2>Total Plants 🌱</h2>
//     <p className="count">{plants.length}</p>
   
//   </div>
//   <div className="dashboard-card">
//     <h2>Needs Water Today 💧</h2>
//     <p className="count">
//       {plants.filter(p => p.healthStatus === "Needs Water").length}
//     </p>
    
//   </div>
//   <div className="dashboard-card">
//     <h2>Healthy Plants ❤️</h2>
//     <p className="count">
//       {plants.filter(p => p.healthStatus === "Healthy").length}
//     </p>
    
//   </div>
// </div>

// <div className="myplants-header flex justify-between items-center py-6 px-4 md:px-8">
//   <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Plants</h1>
//   <button
//     onClick={handleClick}
//     className="add-plant-btn flex items-center gap-2 bg-green-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-md hover:bg-green-700 transition font-medium shadow"
//   >
//     <span className="text-xl">＋</span> Add New Plant 🌱
//   </button>
// </div>


//       <div className="flex flex-wrap gap-6 justify-center plant-display">
//         {plants.length > 0 ? (
//           plants.map((plant) => (
//             <PlantCard
//               key={plant._id}
//               plant={plant}
//               onDelete={handleDelete}
//               onUpdate={handleUpdatePlant}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">No plants found.</p>
//         )}
//       </div>


//       <WaterReminderSection 
//         plants={plants} 
//         onUpdate={handleUpdatePlant} 
//       />

// <Footer />
//     </div>


//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlantCard from '../components/PlantCard'; 
import WaterReminderSection from '../components/WaterReminderSection';
import './Home.css'
import Footer from '../components/Footer';

const Home = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/home')
      .then(result => {
        if (result.data !== "Success") {
          navigate('/login');
        }
      })
      .catch(err => console.error("Login check failed:", err));

    const fetchPlants = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/plants");
        const updated = res.data.map(p => ({ ...p, healthStatus: getHealthStatus(p) }));
        setPlants(updated);
      } catch (error) {
        console.error("Error fetching plant data", error);
      }
    };

    fetchPlants();
  }, [navigate]);

  const getHealthStatus = (plant) => {
    const last = new Date(plant.lastWatered);
    const today = new Date();
    const diffInDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    return diffInDays > plant.waterFrequency ? "Needs Water" : "Healthy";
  };

  const handleClick = () => navigate("/form");

  const handleDelete = (deletedId) => {
    setPlants(prev => prev.filter(plant => plant._id !== deletedId));
  };

  const handleUpdatePlant = (updatedPlant) => {
    updatedPlant.healthStatus = getHealthStatus(updatedPlant);
    setPlants((prevPlants) =>
      prevPlants.map((p) => (p._id === updatedPlant._id ? updatedPlant : p))
    );
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    } 
  };

  return (
    <div className="home-container">
      <div className='home-navbar'>
        <h1 className="home-navbar__title">Blume Haus 🌿 </h1>
        <div className='home-navbar__buttons'>
          <button
            onClick={handleLogout}
            className="home-navbar__button home-navbar__button--logout"
          >
            Logout 👋🏻
          </button>
          <button 
  className="home-navbar__button home-navbar__button--donate"
  onClick={() => navigate('/donate')}
>
donate
</button>
        </div>
      </div>
      
      <div className="home-dashboard">
        <div className="home-dashboard__card">
          <h2>Total Plants 🌱</h2>
          <p className="home-dashboard__count">{plants.length}</p>
        </div>
        <div className="home-dashboard__card">
          <h2>Needs Water Today 💧</h2>
          <p className="home-dashboard__count">
            {plants.filter(p => p.healthStatus === "Needs Water").length}
          </p>
        </div>
        <div className="home-dashboard__card">
          <h2>Healthy Plants ❤️</h2>
          <p className="home-dashboard__count">
            {plants.filter(p => p.healthStatus === "Healthy").length}
          </p>
        </div>
      </div>

      <div className="home-plants-header">
        <h1 className="home-plants-header__title">My Plants</h1>
        <button
          onClick={handleClick}
          className="home-plants-header__button"
        >
          <span className="home-plants-header__button-icon">＋</span> Add New Plant 🌱
        </button>
      </div>

      <div className="home-plants-display">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <PlantCard
              key={plant._id}
              plant={plant}
              onDelete={handleDelete}
              onUpdate={handleUpdatePlant}
            />
          ))
        ) : (
          <p className="home-plants-display__empty">No plants found.</p>
        )}
      </div>

      <WaterReminderSection 
        plants={plants} 
        onUpdate={handleUpdatePlant} 
      />

      <Footer />
    </div>
  );
};

export default Home;
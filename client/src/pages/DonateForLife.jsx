// import React from 'react';
// import axios from 'axios';

// const Checkout = () => {

//   const handlePayment = async () =>{
//     const data = {
//       name: "John Doe",
//       mobileNumber:1234567890,
//       amount:100,
//     }
//     try {
//       const response = await axios.post('http://localhost:3001/create-order', data)
//       console.log(response.data)
//       window.location.href = response.data.url
//     } catch (error) {
//       console.log("error in payment", error)
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <button
//       onClick={handlePayment}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default Checkout;


import React from 'react';
import axios from 'axios';
import '/Users/nishitasingh/Desktop/plant/client/src/pages/DonateForLife.css'; // Import the CSS file

const DonateForLife = () => {
  const handlePayment = async () => {
    const data = {
      name: "Donor",
      mobileNumber: "",
      amount: 100,
    };

    try {
      const response = await axios.post('http://localhost:3001/create-order', data);
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("error in payment", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="donation-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Donate for Life</h1>
        <p className="header-text">
          Help us plant trees and create a sustainable future for generations to come.<br />
          Each tree you help plant makes a difference.
        </p>
        
        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-item">
            <p className="stat-title">1 Tree</p>
            <p className="stat-value">= ₹100</p>
          </div>
          <div className="stat-item">
            <p className="stat-title">1 Tree</p>
            <p className="stat-value">= 500kg CO₂/year</p>
          </div>
          <div className="stat-item">
            <p className="stat-title">1 Tree</p>
            <p className="stat-value">= 4 Lives Impacted</p>
          </div>
        </div>
        
        <div className="divider"></div>
      </div>

      
     
        

     

      {/* Payment Button */}
      <div className="payment-section">
        <button
          onClick={handlePayment}
          className="donate-button"
        >
          Donate Now with PhonePe
        </button>
        <p className="secure-text">Secure payment powered by</p>
        <div className="payment-provider">
          <span>PhonePe</span>
        </div>
      </div>
    </div>
  );
};

export default DonateForLife;
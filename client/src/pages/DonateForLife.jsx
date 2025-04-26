
import React from 'react';
import axios from 'axios';
import './DonateForLife.css'; 

const DonateForLife = () => {
  const handlePayment = async () => {
    const data = {
      name: "Donor",
      mobileNumber: "",
      amount: 100,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/create-order`, data);
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log("error in payment", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="donation-container">
    
      <div className="header-section">
        <h1>Donate for Life</h1>
        <p className="header-text">
          Help us plant trees and create a sustainable future for generations to come.<br />
          Each tree you help plant makes a difference.
        </p>
        
   
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
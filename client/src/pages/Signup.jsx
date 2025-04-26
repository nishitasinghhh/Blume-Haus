import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Sign.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_API_URL}/`, { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-layout">
          
          {/* Left Card: Form */}
          <div className="signup-form-section">
            <div className="signup-form-container">
              <div className="signup-logo-container">
                <img className="signup-logo" src="/leaf.png" alt="Logo" />
              </div>

              <h3 className="signup-title">Welcome to Blume Haus</h3>
              <h6 className="signup-subtitle">Create your account to get started</h6>

              <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-form-group">
                  <label className="signup-form-label">Username</label>
                  <input
                    type="text"
                    placeholder="Your username"
                    className="signup-form-input"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-form-group">
                  <label className="signup-form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="signup-form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-form-group">
                  <label className="signup-form-label">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="signup-form-input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-button-container">
                  <button type="submit" className="signup-button">Sign Up</button>
                </div>
              </form>
            </div>

            <div className="signup-footer">
              <span>Already have an account?</span>
              <Link to="/login" className="signup-footer-link">Login</Link>
            </div>
          </div>

     
          <div className="signup-info-section">
            <div className="signup-info-content">
              <h3 className="signup-info-title">LEAF IT TO US 🌿</h3>
              <p className="signup-info-text">
                At Blume Haus, we know how easy it is to forget when your plants need a little love.
                That's why we've got your back! Our app sends you timely reminders, ensuring your plants
                get the right amount of water, every time. With just a tap, you can set up personalized
                care schedules for all your green friends. No more guessing—just healthy, happy plants!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

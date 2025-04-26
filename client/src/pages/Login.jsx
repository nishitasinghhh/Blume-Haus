
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
    axios.post(`${import.meta.env.VITE_APP_API_URL}/login`,{email,password},{withCredentials:true})
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



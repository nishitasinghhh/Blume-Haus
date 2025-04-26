// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';


// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3001/register', { name, email, password })
//       .then(result => {
//         console.log(result);
//         navigate('/login');
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="container px-4 py-5 mx-auto">
//       <div className="card card0">
//         <div className="d-flex flex-lg-row flex-column-reverse">
          
//           {/* Left Card: Form */}
//           <div className="card card1">
//             <div className="row justify-content-center my-auto">
//               <div className="col-md-8 col-10 my-5">
                
//                 <div className="row justify-content-center px-3 mb-3">
//                   <img id="logo" src="/leaf.png" alt="Logo" />
//                 </div>

//                 <h3 className="mb-5 text-center heading">Welcome to Blume Haus</h3>
//                 <h6 className="msg-info text-center">Create your account to get started</h6>

//                 <form onSubmit={handleSubmit}>

//                   <div className="form-group mb-1">
//                     <label className="form-control-label text-muted">Username</label>
//                     <input
//                       type="text"
//                       placeholder="Your username"
//                       className="form-control"
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group mb-1">
//                     <label className="form-control-label text-muted">Email</label>
//                     <input
//                       type="email"
//                       placeholder="Email address"
//                       className="form-control"
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="form-group mb-1">
//                     <label className="form-control-label text-muted">Password</label>
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       className="form-control"
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="row justify-content-center my-2 px-3">
//                     <button className="btn-block btn-color">Sign Up</button>
//                   </div>
//                 </form>

//               </div>
//             </div>

//             <div className="sm-text mx-auto mb-5 d-flex align-items-center justify-content-center gap-2">
//               <span>Already have an account?</span>
//               <Link to="/login" className="btn btn-white">Login</Link>
//             </div>
//           </div>

//           {/* Right Card: Message */}
//           <div className="card card2">
//             <div className="my-auto mx-md-5 px-md-5 right">
//               <h3 className="text-white">LEAF IT TO US 🌿</h3>
//               <small className="text-white">
//                 At Blume Haus, we know how easy it is to forget when your plants need a little love.
//                 That’s why we've got your back! Our app sends you timely reminders, ensuring your plants
//                 get the right amount of water, every time. With just a tap, you can set up personalized
//                 care schedules for all your green friends. No more guessing—just healthy, happy plants!
//               </small>
//             </div>
//           </div>
  

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

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
    axios.post('http://localhost:3001/', { name, email, password })
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

          {/* Right Card: Message */}
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

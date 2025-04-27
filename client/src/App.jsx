import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './pages/Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PlantForm from './components/PlantForm'
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import DonateForLife from './pages/DonateForLife'
import Success from './pages/Succes'
import Failure from './pages/Failure'
import axios from 'axios'


function App() {
axios.defaults.withCredentials=true

  return (
    <BrowserRouter>
    <Routes>
  
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>     
      <Route path="/form" element={<PlantForm />} />
     <Route path="/donate" element={<DonateForLife/>}/>
      <Route path="/payment-success" element={<Success />} />
      <Route path="/payment-failure" element={<Failure />} />
     
    </Routes>
    </BrowserRouter>
  )
}

export default App

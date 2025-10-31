import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
// Place this at the top of your main.jsx or App.jsx
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Manager/>
      <Footer/>
    </div>
  )
}

export default App

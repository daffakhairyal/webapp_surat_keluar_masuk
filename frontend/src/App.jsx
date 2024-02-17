/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Dashboard from './pages/Dashboard';



const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
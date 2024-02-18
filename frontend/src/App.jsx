/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Dashboard from './pages/Dashboard';
import FileSuratMasuk from './pages/FileSuratMasuk';
import FileSuratKeluar from './pages/FileSuratKeluar';
import RecordSuratMasuk from './pages/RecordSuratMasuk';
import RecordSuratKeluar from './pages/RecordSuratKeluar';
import Users from './pages/Users';



const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/file/surat-masuk" element={<FileSuratMasuk/>}/>
          <Route path="/file/surat-keluar" element={<FileSuratKeluar/>}/>
          <Route path="/record/surat-masuk" element={<RecordSuratMasuk/>}/>
          <Route path="/record/surat-keluar" element={<RecordSuratKeluar/>}/>
          <Route path="/users" element={<Users/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './pages/Dashboard';
import FileSuratMasukPage from './pages/FileSuratMasuk';
import FileSuratKeluarPage from './pages/FileSuratKeluar';
import RecordSuratMasukPage from './pages/RecordSuratMasuk';
import RecordSuratKeluarPage from './pages/RecordSuratKeluar';
import UsersPage from './pages/Users';
import DivisionPage from './pages/Division';
import SuratMasukTemplate from './pages/SuratMasukTemplate';
import SuratKeluarTemplate from './pages/SuratKeluarTemplate';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/file/surat-masuk" element={<FileSuratMasukPage />} />
          <Route path="/file/surat-keluar" element={<FileSuratKeluarPage />} />
          <Route path="/record/surat-masuk" element={<RecordSuratMasukPage />} />
          <Route path="/record/surat-keluar" element={<RecordSuratKeluarPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/divisions" element={<DivisionPage />} />
          <Route path="/surat-masuk/:id" element={<SuratMasukTemplate />} />
          <Route path="/surat-keluar/:id" element={<SuratKeluarTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

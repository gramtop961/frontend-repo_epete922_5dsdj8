import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import RetroLayout from './components/RetroLayout';
import LoginPage from './components/LoginPage';
import HuntPage from './components/HuntPage';
import AdminPage from './components/AdminPage';

function TopNav() {
  const user = typeof window !== 'undefined' ? localStorage.getItem('shiva_current_user') : '';
  return (
    <div className="mb-4 flex items-center justify-between" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/login" className="underline-offset-4 hover:underline">Login</Link>
        <Link to="/hunt" className="underline-offset-4 hover:underline">Hunt</Link>
        <Link to="/admin" className="underline-offset-4 hover:underline">Admin</Link>
      </div>
      <div className="text-xs opacity-70">{user ? `Signed in as ${user}` : 'Not signed in'}</div>
    </div>
  );
}

export default function App() {
  return (
    <RetroLayout>
      <HashRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hunt" element={<HuntPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </RetroLayout>
  );
}

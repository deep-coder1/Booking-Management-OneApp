import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';

// Placeholders
import Dashboard from './pages/Dashboard';
const Users = () => <div className="p-4"><h1 className="text-2xl font-bold">User Management</h1><p>Manage system users.</p></div>;
const Bookings = () => <div className="p-4"><h1 className="text-2xl font-bold">Booking Management</h1><p>View and manage bookings.</p></div>;
const Settings = () => <div className="p-4"><h1 className="text-2xl font-bold">Settings</h1><p>Application settings.</p></div>;
const Unauthorized = () => <div className="p-4 text-red-500"><h1>Unauthorized Access</h1></div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

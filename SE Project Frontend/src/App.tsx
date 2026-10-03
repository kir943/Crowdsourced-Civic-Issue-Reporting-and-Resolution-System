import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { OfficerDashboardPage } from './pages/OfficerDashboardPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (Standalone without AppShell) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Citizen Dashboard Route */}
        <Route
          path="/citizen/dashboard"
          element={
            <AppShell role="citizen">
              <CitizenDashboardPage />
            </AppShell>
          }
        />
        <Route
          path="/citizen/report"
          element={
            <AppShell role="citizen">
              <CitizenDashboardPage />
            </AppShell>
          }
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin/dashboard"
          element={
            <AppShell role="admin">
              <AdminDashboardPage />
            </AppShell>
          }
        />

        {/* Officer Dashboard Route */}
        <Route
          path="/officer/dashboard"
          element={
            <AppShell role="officer">
              <OfficerDashboardPage />
            </AppShell>
          }
        />

        {/* Default and Fallback Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminShell from '../layouts/AdminShell';
import AdminPageLayout from '../components/AdminPageLayout';

// Lazy loading pages
const Dashboard = lazy(() => import('../pages/Dashboard').catch(() => ({ default: () => <AdminPageLayout title="Dashboard" /> })));
const Users = lazy(() => import('../pages/Users').catch(() => ({ default: () => <AdminPageLayout title="Users" /> })));
const Organizations = lazy(() => import('../pages/Organizations').catch(() => ({ default: () => <AdminPageLayout title="Organizations" /> })));
const Engines = lazy(() => import('../pages/Engines').catch(() => ({ default: () => <AdminPageLayout title="Engines" /> })));
const Signals = lazy(() => import('../pages/Signals').catch(() => ({ default: () => <AdminPageLayout title="Signals" /> })));
const Forecasts = lazy(() => import('../pages/Forecasts').catch(() => ({ default: () => <AdminPageLayout title="Forecasts" /> })));
const DARIA = lazy(() => import('../pages/DARIA').catch(() => ({ default: () => <AdminPageLayout title="DARIA" /> })));
const Compliance = lazy(() => import('../pages/Compliance').catch(() => ({ default: () => <AdminPageLayout title="Compliance" /> })));
const Security = lazy(() => import('../pages/Security').catch(() => ({ default: () => <AdminPageLayout title="Security" /> })));
const Billing = lazy(() => import('../pages/Billing').catch(() => ({ default: () => <AdminPageLayout title="Billing" /> })));
const Monitoring = lazy(() => import('../pages/Monitoring').catch(() => ({ default: () => <AdminPageLayout title="Monitoring" /> })));
const Settings = lazy(() => import('../pages/Settings').catch(() => ({ default: () => <AdminPageLayout title="Settings" /> })));

export const getAdminRoutes = () => {
  return (
    <Route path="/admin" element={<AdminProtectedRoute />}>
      <Route element={<AdminShell />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="engines" element={<Engines />} />
        <Route path="signals" element={<Signals />} />
        <Route path="forecasts" element={<Forecasts />} />
        <Route path="daria" element={<DARIA />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="security" element={<Security />} />
        <Route path="billing" element={<Billing />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Route>
  );
};

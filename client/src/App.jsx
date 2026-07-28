import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import Layout from './components/Layout';
import PageWrapper from './components/PageWrapper';

import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Signals from './pages/Signals';
import Forecasts from './pages/Forecasts';
import Compliance from './pages/Compliance';
import Bidding from './pages/Bidding';
import Audience from './pages/Audience';
import EvidencePacks from './pages/EvidencePacks';
import EvidencePackDetail from './pages/EvidencePackDetail';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import SignalDetail from './pages/SignalDetail';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import EmptyState from './pages/EmptyState';
import ResetPassword from './pages/ResetPassword';
import './index.css';

function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* Auth & Public Routes */}
      <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
      <Route path="/onboarding" element={<PageWrapper><Onboarding /></PageWrapper>} />
      <Route path="/reset-password" element={<PageWrapper><ResetPassword /></PageWrapper>} />

      {/* App Routes with Sidebar and Header layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/forecasts" element={<Forecasts />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/evidence-packs" element={<EvidencePacks />} />
        <Route path="/evidence-packs/:id" element={<EvidencePackDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/signals/:id" element={<SignalDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/empty-state" element={<EmptyState />} />
      </Route>

      {/* Catch-all for unmatched routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <RouteChangeListener />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

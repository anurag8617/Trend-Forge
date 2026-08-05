import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './screens/Dashboard';
import EngineWorkspace, { type EngineConfig } from './screens/EngineWorkspace';
import EvidenceLibrary from './screens/EvidenceLibrary';
import History from './screens/History';
import Settings from './screens/Settings';
import Team from './screens/Team';
import Billing from './screens/Billing';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import { AppProvider } from './state/AppContext';
import { getAdminRoutes } from './admin/routes/AdminRouteConfig';
import AdminLogin from './admin/pages/AdminLogin';

const ENGINE_CONFIGS: Record<string, EngineConfig> = {
  ghost: {
    title: 'Ghost Mode',
    metricLabel: 'Anomalous Velocity',
    heroMetric: '124',
    description: 'Scans fringe networks for anomalous velocity before trends reach mainstream density.',
    caveat: 'Tracks velocity, not veracity. Cannot confirm factual truth of emerging trends.',
    vizType: 'feed'
  },
  quantum: {
    title: 'Quantum Guess',
    metricLabel: 'Predicted Saturation',
    heroMetric: '+42%',
    description: 'Forecasts saturation trajectories based on historical adoption curves.',
    caveat: 'Peeking system, not a prediction oracle. Highly sensitive to exogenous shocks.',
    vizType: 'line'
  },
  bio: {
    title: 'Bio-Feel',
    metricLabel: 'Audience Resonance',
    heroMetric: '0.84',
    description: 'Scores emotional arousal and audience resonance across engaged demographics.',
    caveat: 'Measures emotional intensity, not sentiment valence. High arousal does not guarantee positive reception.',
    vizType: 'gauge'
  },
  disinfo: {
    title: 'DisinfoDefender',
    metricLabel: 'Network Purity',
    heroMetric: '99.8%',
    description: 'Filters synthetic engagement and cross-checks compliance thresholds.',
    caveat: 'Statistical bot screening. May occasionally flag highly coordinated human action as synthetic.',
    vizType: 'log'
  },
  holo: {
    title: 'HoloBidder',
    metricLabel: 'Execution Velocity',
    heroMetric: '4.2k',
    description: 'Executes pre-market bidding across multiple automated channels simultaneously.',
    caveat: 'Automated execution network. Subject to underlying exchange latency and liquidity.',
    vizType: 'queue'
  }
};

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signals" element={<EngineWorkspace config={ENGINE_CONFIGS.ghost} />} />
            <Route path="/forecasts" element={<EngineWorkspace config={ENGINE_CONFIGS.quantum} />} />
            <Route path="/audience" element={<EngineWorkspace config={ENGINE_CONFIGS.bio} />} />
            <Route path="/compliance" element={<EngineWorkspace config={ENGINE_CONFIGS.disinfo} />} />
            <Route path="/bidding" element={<EngineWorkspace config={ENGINE_CONFIGS.holo} />} />
            <Route path="/evidence" element={<EvidenceLibrary />} />
            <Route path="/history" element={<History />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/team" element={<Team />} />
            <Route path="/billing" element={<Billing />} />
            </Route>
          </Route>
          
          {getAdminRoutes()}
        </Routes>
      </Router>
    </AppProvider>
  );
}
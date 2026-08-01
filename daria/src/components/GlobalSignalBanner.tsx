import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../state/AppContext';
import { typography } from '../lib/tokens';

const ENGINE_NAMES: Record<string, string> = {
  ghost: 'Ghost Mode',
  quantum: 'Quantum Guess',
  bio: 'Bio-Feel',
  disinfo: 'DisinfoDefender',
  holo: 'HoloBidder',
};

export default function GlobalSignalBanner() {
  const { isAlertActive, triggerEngine } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  // Reset the dismissed state if a new alert comes in
  useEffect(() => {
    if (isAlertActive) {
      setDismissed(false);
    }
  }, [isAlertActive, triggerEngine]);

  const isDashboard = location.pathname === '/dashboard';
  const shouldShow = isAlertActive && !isDashboard && !dismissed;

  const engineName = triggerEngine ? ENGINE_NAMES[triggerEngine] || 'Core Engine' : 'Core Engine';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-[90] max-w-sm w-full bg-background border border-cyan-400/40 shadow-[0_0_20px_rgb(34,211,238,0.15)] rounded-lg p-4 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_var(--theme-accent)]"></div>
              <span className={`${typography.microLabel} text-cyan-400`}>Signal Detected</span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
              aria-label="Dismiss banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-white text-sm leading-snug font-light">
            New signal from <span className="font-medium text-cyan-400">{engineName}</span> &mdash; worth a look.
          </p>

          <button
            onClick={() => {
              navigate('/dashboard');
              setDismissed(true);
            }}
            className="w-full mt-1 py-2 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400 transition-colors rounded text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Review buy window
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

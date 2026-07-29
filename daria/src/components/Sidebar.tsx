import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { typography, colors } from '../lib/tokens';
import DariaJellyfish from './DariaJellyfish';
import { useAppState } from '../state/AppContext';

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <rect width="10" height="10" x="7" y="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/> },
  { name: 'Signals', path: '/signals', icon: <polygon points="12,4 20,12 12,20 4,12" fill="none" stroke="currentColor" strokeWidth="1.5"/> }, // open diamond (Ghost Mode)
  { name: 'Forecasts', path: '/forecasts', icon: <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/> }, // circle (Quantum Guess)
  { name: 'Audience', path: '/audience', icon: <polygon points="12,5 19,12 12,19 5,12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/> }, // diamond (Bio-Feel)
  { name: 'Compliance', path: '/compliance', icon: <polygon points="12,6 18,12 12,18 6,12" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/> }, // filled diamond (DisinfoDefender)
  { name: 'Bidding', path: '/bidding', icon: <rect width="12" height="12" x="6" y="6" transform="rotate(45 12 12)" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5"/> }, // HoloBidder
  { name: 'Evidence Packs', path: '/evidence', icon: <rect width="14" height="10" x="5" y="7" fill="none" stroke="currentColor" strokeWidth="1.5"/> },
];

const bottomNavItems = [
  { name: 'Settings', path: '/settings', icon: <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/> },
  { name: 'Team', path: '/team', icon: <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none"/> },
  { name: 'Billing', path: '/billing', icon: <rect width="12" height="12" x="6" y="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/> },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isAlertActive, triggerEngine, dariaState } = useAppState();

  const engineToPath: Record<string, string> = {
    ghost: '/signals',
    quantum: '/forecasts',
    bio: '/audience',
    disinfo: '/compliance',
    holo: '/bidding'
  };
  const triggerEnginePath = triggerEngine ? engineToPath[triggerEngine] : null;

  return (
    <aside 
      className={`flex flex-col bg-[#0A0F1C] border-r border-[#1A1B41] transition-all duration-300 ease-in-out z-20 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* DARIA Glow Indicator (Placeholder) */}
      <div className="h-16 flex items-center justify-center border-b border-[#1A1B41]">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="relative flex items-center justify-center w-8 h-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <DariaJellyfish size={32} state={dariaState} confidence={90} className="transition-transform group-hover:scale-110" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-10 scrollbar-hide">
        <nav className="flex flex-col gap-1 px-3">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isAlerting = isAlertActive && triggerEnginePath === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                title={isCollapsed ? item.name : ''}
                className={`relative flex items-center gap-4 px-3 py-2.5 rounded group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive ? 'bg-[#1A1B41]/50 text-white' : `${typography.textSecondary} hover:bg-[#1A1B41]/30 hover:text-white`
                } ${isAlerting && !isActive ? 'bg-accent/10' : ''}`}
              >
                {/* Alert Glow Indicator */}
                {isAlerting && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--theme-accent-rgb) / 0.8)] pointer-events-none"></div>
                )}
                
                <svg className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive || isAlerting ? colors.accentText : 'text-[#4b5563] group-hover:text-white'
                } ${isAlerting ? 'drop-shadow-[0_0_8px_rgb(var(--theme-accent-rgb) / 0.6)]' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {item.icon}
                </svg>
                {!isCollapsed && (
                  <span className={`text-[13px] font-medium tracking-wide whitespace-nowrap overflow-hidden ${isAlerting ? 'text-white' : ''}`}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-1 px-3">
          <div className="h-px bg-[#1A1B41] mx-3 mb-4"></div>
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                title={isCollapsed ? item.name : ''}
                className={`flex items-center gap-4 px-3 py-2 rounded group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive ? 'text-white' : `${typography.textTertiary} hover:text-gray-300`
                }`}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {item.icon}
                </svg>
                {!isCollapsed && (
                  <span className="text-[12px] font-medium tracking-wide whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

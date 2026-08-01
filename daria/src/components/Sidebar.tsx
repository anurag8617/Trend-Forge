import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { typography, colors } from '../lib/tokens';
import { useAppState } from '../state/AppContext';
import logo from '../assets/logo.png';

import { EngineGlyphs } from './EngineGlyph';

const mainNavItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <rect
        width="10"
        height="10"
        x="7"
        y="7"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ),
  },
  { name: 'Signals', path: '/signals', icon: EngineGlyphs.ghost },
  { name: 'Forecasts', path: '/forecasts', icon: EngineGlyphs.quantum },
  { name: 'Audience', path: '/audience', icon: EngineGlyphs.bio },
  { name: 'Compliance', path: '/compliance', icon: EngineGlyphs.disinfo },
  { name: 'Bidding', path: '/bidding', icon: EngineGlyphs.holo },
  {
    name: 'Evidence Packs',
    path: '/evidence',
    icon: (
      <rect
        width="14"
        height="10"
        x="5"
        y="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ),
  },
  {
    name: 'History',
    path: '/history',
    icon: (
      <path
        d="M12 8v4l3 3M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const bottomNavItems = [
  {
    name: 'Settings',
    path: '/settings',
    icon: <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  },
  {
    name: 'Team',
    path: '/team',
    icon: (
      <path
        d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        fill="none"
      />
    ),
  },
  {
    name: 'Billing',
    path: '/billing',
    icon: (
      <rect
        width="12"
        height="12"
        x="6"
        y="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isAlertActive, triggerEngine, hasNewSignals } = useAppState();

  const engineToPath: Record<string, string> = {
    ghost: '/signals',
    quantum: '/forecasts',
    bio: '/audience',
    disinfo: '/compliance',
    holo: '/bidding',
  };
  const triggerEnginePath = triggerEngine ? engineToPath[triggerEngine] : null;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed md:relative inset-y-0 left-0 flex flex-col h-full bg-background border-r border-border transition-all duration-300 ease-in-out z-50 ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-surface border border-border text-textSecondary hover:text-text hover:border-primary/50 hover:shadow-[0_0_8px_var(--color-primary-soft)] rounded-full p-1.5 z-50 transition-all shadow-lg cursor-pointer hidden md:block"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo & Brand Name */}
        <div
          className={`h-20 flex items-center border-b border-border transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'}`}
        >
          <img src={logo} alt="TrendForge Logo" className="w-10 h-10 object-contain shrink-0" />
          <div
            className={`flex flex-col justify-center  overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
          >
            <h1 className="text-base font-bold leading-tight tracking-tight flex items-center text-text">
              <span>Trend</span>
              <span className="text-primary ml-0.5">Forge</span>
            </h1>
            <p className="text-[8px] uppercase tracking-[0.1em] text-muted font-semibold mt-0.5">
              Predictive Media Intelligence
            </p>

            <div className="flex flex-col justify-center mt-0.5">
              <div className="w-13 h-px bg-[#596272] opacity-60"></div>

              <span className="mt-0.5 text-[8px] tracking-[0.35em] font-bold text-[#6F7888]">
                THE6KID
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-10 scrollbar-hide">
          {/* Main Navigation */}
          <nav className="flex flex-col gap-1 pl-3">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isAlerting = isAlertActive && triggerEnginePath === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  title={isCollapsed ? item.name : ''}
                  {...(item.name === 'Signals' ? { 'data-tour': 'sidebar-signals' } : {})}
                  className={`relative flex items-center py-2.5 rounded group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isCollapsed ? 'justify-center md:pr-3 px-3 md:px-0' : 'gap-4 px-3'
                  } ${
                    isActive
                      ? 'bg-linear-to-r from-[#13383f] to-surface-100 text-white'
                      : `${typography.textSecondary} hover:bg-surface/30 hover:text-white`
                  } ${isAlerting && !isActive ? 'bg-accent/10' : ''}`}
                >
                  {/* Alert Glow Indicator */}
                  {isAlerting && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--theme-accent-rgb) / 0.8)] pointer-events-none"></div>
                  )}

                  {/* ICON: Added isActive condition for text-cyan-400 */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        isActive
                          ? 'text-cyan-400'
                          : isAlerting
                            ? colors.accentText
                            : 'text-[#4b5563] group-hover:text-cyan-400'
                      } ${isAlerting ? 'drop-shadow-[0_0_8px_rgb(var(--theme-accent-rgb) / 0.6)]' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon}
                    </svg>
                    {item.name === 'Signals' && hasNewSignals && isCollapsed && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                    )}
                  </div>

                  {(!isCollapsed || window.innerWidth < 768) && (
                    <div className="flex items-center justify-between flex-1 overflow-hidden">
                      <span
                        className={`text-[13px] font-medium tracking-wide whitespace-nowrap overflow-hidden ${isAlerting ? 'text-white' : ''}`}
                      >
                        {item.name}
                      </span>
                      {item.name === 'Signals' && hasNewSignals && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></div>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="mt-auto flex flex-col gap-1 pl-3 ">
            <div className="h-px bg-surface mx-3 mb-4 "></div>
            {bottomNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  title={isCollapsed ? item.name : ''}
                  className={`flex items-center py-2 rounded group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isCollapsed ? 'justify-center md:px-0 px-3' : 'gap-4 px-3'
                  } ${
                    isActive
                      ? 'bg-linear-to-r from-[#13383f] to-surface-100 text-white'
                      : `${typography.textSecondary} hover:bg-surface/30 hover:text-white`
                  }`}
                >
                  {/* ICON: Added text-cyan-400 for active state and hover state */}
                  <svg
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {item.icon}
                  </svg>

                  {(!isCollapsed || window.innerWidth < 768) && (
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
    </>
  );
}

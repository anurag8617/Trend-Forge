import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggleMobileMenu', handleToggle);
    return () => window.removeEventListener('toggleMobileMenu', handleToggle);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> },
    { name: 'Signals', path: '/signals', icon: <path d="M12 2l9 7-9 7-9-7 9-7z"></path> },
    { name: 'Forecasts', path: '/forecasts', icon: <path d="M12 2l9 7-9 7-9-7 9-7z"></path> },
    { name: 'Audience', path: '/audience', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></> },
    { name: 'Compliance', path: '/compliance', icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> },
    { name: 'Bidding', path: '/bidding', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> },
    { name: 'Evidence Packs', path: '/evidence-packs', icon: <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"></path> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`
          ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-[240px]'} w-[240px]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed inset-y-0 left-0 z-50 lg:relative
          transition-all duration-300 ease-in-out border-r border-[#27272a] flex flex-col justify-between bg-[#111113] shrink-0
        `}
      >
        {/* Toggle Button - Desktop Only */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-8 bg-[#1C1C1E] border border-[#27272a] text-[#a1a1aa] hover:text-white rounded-full p-1.5 z-50 transition-colors shadow-lg cursor-pointer"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Close Button - Mobile Only */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute right-4 top-6 text-[#a1a1aa] hover:text-white z-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <div className={`p-6 flex items-center ${isCollapsed ? 'lg:justify-center lg:px-0' : 'gap-3'}`}>
            <img src={logo} alt="TrendForge Logo" className="w-8 h-8 object-contain shrink-0" />
            <div className={`flex flex-col justify-center overflow-hidden whitespace-nowrap ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              <h1 className="text-sm font-bold leading-tight tracking-tight flex items-center">
                <span>Trend</span>
                <span className="text-[#00E5FF]">Forge</span>
              </h1>
              <p className="text-[5px] uppercase tracking-[0.2em] text-[#71717a] font-semibold">
                Predictive Media Intelligence
              </p>
            </div>
          </div>
          
          <nav className={`mt-4 space-y-2 ${isCollapsed ? 'lg:pl-3' : 'pl-4'} pl-4 lg:pl-4`}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={isCollapsed ? item.name : ""}
                  className={`flex items-center ${isCollapsed ? 'lg:justify-center lg:rounded-tl-lg lg:p-3 gap-3 py-2.5 rounded-tl-lg rounded-bl-lg' :
                    'gap-3 px-3 py-2.5 rounded-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none lg:rounded-br-none'} text-sm font-medium transition-colors ${
                    isActive 
                      ? ' bg-gradient-to-r from-[#393d3f] to-[#161618] text-white' 
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#1C1C1E]'
                  }`}
                >
                  <svg className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00E5FF]' : 'text-[#71717a]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                  <span className={`whitespace-nowrap overflow-hidden ${isCollapsed ? 'lg:hidden' : 'block'}`}>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className={`py-3 pl-3 border-t border-[#27272a] ${isCollapsed ? 'lg:flex lg:justify-center' : ''}`}>
          <Link 
            to="/settings" 
            title={isCollapsed ? "Settings" : ""}
            className={`flex items-center ${isCollapsed ? 'lg:justify-center lg:p-3 lg:rounded-tl-lg gap-3 px-3 py-2.5 rounded-tl-lg rounded-bl-lg' : 
              'gap-3 px-3 py-2.5 rounded-tl-lg rounded-bl-lg'} text-sm font-medium transition-colors ${
              location.pathname === '/settings' || location.pathname === '/billing'
                ? 'bg-[#1C1C1E] text-white' 
                : 'text-[#a1a1aa] hover:text-white hover:bg-[#1C1C1E]'
            }`}
          >
            <svg className={`w-4 h-4 shrink-0 ${location.pathname === '/settings' || location.pathname === '/billing' ? 'text-[#00E5FF]' : 'text-[#71717a]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
            </svg>
            <span className={`whitespace-nowrap overflow-hidden ${isCollapsed ? 'lg:hidden' : 'block'}`}>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

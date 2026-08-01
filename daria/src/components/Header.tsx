import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { typography } from '../lib/tokens';
import { useAppState, type Tenant } from '../state/AppContext';

interface Workspace {
  id: Tenant;
  name: string;
  label: string;
  accent: string;
}

const WORKSPACES: Workspace[] = [
  { id: 'daria',      name: 'DARIA',           label: 'Core Intelligence',   accent: '#3DD6F5' },
  { id: 'gov',        name: 'Government',       label: 'GOV / OVERSEER',      accent: '#00E5FF' },
  { id: 'enterprise', name: 'Enterprise',       label: 'AEGIS Platform',      accent: '#6366F1' },
  { id: 'marketing',  name: 'Marketing Team',   label: 'Campaign Ops',        accent: '#34D399' },
  { id: 'clientA',    name: 'Client A',         label: 'External Workspace',  accent: '#FBBF24' },
  { id: 'clientB',    name: 'Client B',         label: 'External Workspace',  accent: '#F472B6' },
];

export default function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void }) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<HTMLDivElement>(null);
  const { tenant, setTenant, isAlertActive } = useAppState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setSelectedBadge(null);
      }
      if (wsRef.current && !wsRef.current.contains(event.target as Node)) {
        setWsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const badgeDescriptions: Record<string, string> = {
    'GDPR': 'Privacy rules (Europe)',
    'CCPA': 'Privacy rules (California)',
    'FISMA': 'Data security (Government)'
  };

  const currentWorkspace = WORKSPACES.find(w => w.id === tenant) || WORKSPACES[0];

  const handleSelectWorkspace = (ws: Workspace) => {
    setTenant(ws.id);
    setWsDropdownOpen(false);
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6 shrink-0 relative z-40">
      
      {/* Left: Hamburger + Workspace Selector */}
      <div className="flex items-center gap-2">
        {/* Hamburger - mobile only */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors -ml-1"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Workspace Dropdown */}
        <div className="relative" ref={wsRef}>
          <button
            onClick={() => setWsDropdownOpen(!wsDropdownOpen)}
            className="flex items-center gap-2.5 cursor-pointer hover:bg-surface/40 transition-all rounded-lg px-3 py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-expanded={wsDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select workspace"
          >
            {/* Accent dot */}
            <div 
              className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_6px_var(--theme-accent)]" 
              style={{ backgroundColor: currentWorkspace.accent }}
            />
            <div className="flex flex-col items-start">
              <span className="text-white font-semibold text-sm leading-tight tracking-tight">
                {currentWorkspace.name}
              </span>
              <span className="text-gray-500 text-[10px] leading-tight hidden sm:block">
                {currentWorkspace.label}
              </span>
            </div>
            <svg 
              className={`w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-transform duration-200 ${wsDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Panel */}
          <AnimatePresence>
            {wsDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                role="listbox"
                aria-label="Workspaces"
              >
                {/* Dropdown Header */}
                <div className="px-4 py-3 border-b border-border">
                  <span className={`${typography.microLabel} ${typography.textTertiary}`}>
                    Select Workspace
                  </span>
                </div>

                {/* Workspace List */}
                <div className="py-1.5 max-h-64 overflow-y-auto">
                  {WORKSPACES.map((ws) => {
                    const isActive = ws.id === tenant;
                    return (
                      <button
                        key={ws.id}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSelectWorkspace(ws)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors group/item focus-visible:outline-none focus-visible:bg-surface/40 ${
                          isActive 
                            ? 'bg-surface/50' 
                            : 'hover:bg-surface/30'
                        }`}
                      >
                        {/* Color indicator */}
                        <div 
                          className={`w-2 h-2 rounded-full shrink-0 transition-shadow ${isActive ? 'shadow-[0_0_8px_var(--theme-accent)]' : ''}`}
                          style={{ backgroundColor: ws.accent }}
                        />
                        {/* Name + label */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-300 group-hover/item:text-white'}`}>
                            {ws.name}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">
                            {ws.label}
                          </div>
                        </div>
                        {/* Active check */}
                        {isActive && (
                          <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Persistent Glow Indicator */}
        <button
          onClick={() => navigate('/dashboard')}
          className="ml-2 flex items-center justify-center p-2 rounded-full hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={isAlertActive ? "New signal detected, click to review" : "No active signal"}
          title={isAlertActive ? "New signal detected, click to review" : "No active signal"}
        >
          <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isAlertActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse' : 'bg-gray-600'}`}></div>
        </button>
      </div>

      {/* Right: Actions + Badges + Avatar */}
      <div className="flex items-center gap-4 md:gap-8">
        
        {/* Compliance Badges */}
        <div className="hidden sm:flex items-center gap-2 relative" ref={popoverRef}>
          {['GDPR', 'CCPA', 'FISMA'].map(badge => (
            <button
              key={badge}
              onClick={() => setSelectedBadge(selectedBadge === badge ? null : badge)}
              className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedBadge === badge 
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' 
                  : 'border-border text-gray-500 hover:text-gray-300 hover:border-gray-700'
              }`}
              aria-label={`${badge}: ${badgeDescriptions[badge]}`}
              title={`${badge}: ${badgeDescriptions[badge]}`}
            >
              {badge}
            </button>
          ))}

          {/* Badge Popover */}
          <AnimatePresence>
            {selectedBadge && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full right-0 mt-3 w-64 bg-background border border-border shadow-xl rounded-lg p-4 z-50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>
                  <span className={`${typography.microLabel} text-white`}>{selectedBadge} Cleared</span>
                </div>
                <p className={`${typography.textSecondary} text-xs leading-relaxed`}>
                  {badgeDescriptions[selectedBadge]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Account Avatar */}
        <div 
          role="button" 
          tabIndex={0} 
          className="w-8 h-8 rounded-full bg-surface flex items-center justify-center cursor-pointer hover:bg-surface/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span className={`${typography.textSecondary} text-xs font-medium`}>
            {currentWorkspace.name.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-full hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          title="Logout"
          aria-label="Logout"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}

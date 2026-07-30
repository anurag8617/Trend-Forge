import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { useAppState, type Tenant } from '../state/AppContext';

export default function Header() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { tenant, setTenant, isAlertActive } = useAppState();

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setSelectedBadge(null);
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

  const tenantData: Record<Tenant, { org: string, app: string, logo: string }> = {
    daria: { org: 'TrendForge', app: 'DARIA', logo: 'TF' },
    gov: { org: 'GOV Node', app: 'OVERSEER', logo: 'GOV' },
    enterprise: { org: 'Enterprise', app: 'AEGIS', logo: 'ENT' }
  };

  const handleNextTenant = () => {
    const sequence: Tenant[] = ['daria', 'gov', 'enterprise'];
    const idx = sequence.indexOf(tenant);
    setTenant(sequence[(idx + 1) % sequence.length]);
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0 relative z-40">
      
      {/* Workspace Switcher */}
      <div className="flex items-center gap-3">
        <div 
          onClick={handleNextTenant}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNextTenant()}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded p-1"
        >
          <span className="text-white font-medium text-sm">{tenantData[tenant].org}</span>
          <span className="text-cyan-400 text-sm font-semibold">/ {tenantData[tenant].app}</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* DARIA Glow Indicator (Persistent Presence) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group cursor-pointer" title="DARIA Supervisor Status">
        <div className="relative flex items-center justify-center w-8 h-8">
          {/* Outer glow (pulsing if active) */}
          <div className={`absolute inset-0 rounded-full bg-cyan-400 opacity-20 blur-md transition-all duration-700 ${isAlertActive ? 'animate-pulse scale-150' : 'scale-100'}`}></div>
          {/* Inner core */}
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"></div>
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity absolute top-full mt-1">Supervisor</span>
      </div>

      <div className="flex items-center gap-8">
        {/* Compliance Badges */}
        <div className="flex items-center gap-2 relative" ref={popoverRef}>
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

          {/* Popover */}
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

        {/* Account Menu Placeholder */}
        <div 
          role="button" 
          tabIndex={0} 
          className="w-8 h-8 rounded-full bg-surface flex items-center justify-center cursor-pointer hover:bg-[#282a57] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span className={`${typography.textSecondary} text-xs font-medium`}>{tenantData[tenant].logo}</span>
        </div>
      </div>
    </header>
  );
}

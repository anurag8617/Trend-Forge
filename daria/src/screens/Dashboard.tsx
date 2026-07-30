import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DariaJellyfish, { type DariaState } from '../components/DariaJellyfish';
import BuyWindowModal from '../components/BuyWindowModal';
import { colors, typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';

const ENGINES = [
  { id: 'ghost', name: 'Ghost Mode', desc: 'Fringe velocity & wide-bridge crossings' },
  { id: 'quantum', name: 'Quantum Guess', desc: 'Trajectory & saturation forecasting' },
  { id: 'bio', name: 'Bio-Feel', desc: 'Emotional arousal scoring' },
  { id: 'disinfo', name: 'DisinfoDefender', desc: 'Compliance & bot screening' },
  { id: 'holo', name: 'HoloBidder', desc: 'Cross-channel bid execution' },
];

const InfoTooltip = ({ label, info }: { label: string, info: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-1">
      <span className={`${typography.microLabel} ${typography.textSecondary}`}>{label}</span>
      <button 
        className="text-gray-500 hover:text-white focus-visible:outline-none focus-visible:text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        aria-label={`How is ${label} calculated?`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-surface border border-gray-700 rounded  shadow-xl z-50 text-xs text-gray-300 font-normal normal-case tracking-normal"
          >
            {info}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Dashboard() {
  const { isAlertActive, setAlertState, triggerEngine, addAuditLog, dariaState, setDariaState } = useAppState();
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [confidence] = useState(90);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  // Sync DARIA visually when alert activates
  useEffect(() => {
    if (isAlertActive) {
      setDariaState('signal');
    } else {
      setDariaState(prev => prev === 'executing' ? 'executing' : 'standby');
    }
  }, [isAlertActive]);
  
  // Toggle demo alert function
  const handleToggleAlert = () => {
    if (!isAlertActive) {
      setAlertState(true, 'quantum');
    } else {
      setAlertState(false);
    }
  };

  const handleBuyWindow = () => {
    setIsBuyModalOpen(true);
  };

  const handleConfirmAction = (isDelegate: boolean) => {
    setIsBuyModalOpen(false);
    
    if (isDelegate) {
      addAuditLog('BUY_WINDOW_DELEGATED', 'Target delegated to HoloBidder protocol for execution.');
    } else {
      addAuditLog('BUY_WINDOW_CONFIRMED', 'Target executed directly by manual confirmation.');
     }
    
    setAlertState(false);
    setDariaState('executing');
    
    setTimeout(() => {
      setDariaState('standby');
    }, 4000);
  };

  const handleEvidencePack = () => {
    addAuditLog('EVIDENCE_EXPORTED', 'Generated evidence pack for DARIA Supervisor context.');
    navigate('/evidence');
  };

  const hasActiveSignal = dariaState === 'signal' || dariaState === 'executing';
  const trendScore = hasActiveSignal ? '84.2' : '—';
  const leadTime = hasActiveSignal ? '72 HRS' : '—';
  const latency = '42ms'; 

  // Dimming class for secondary elements when alert is active
  const dimClass = isAlertActive ? "opacity-30 pointer-events-none grayscale-[50%] transition-all duration-700 blur-[2px]" : "transition-all duration-700";

  return (
    <div className="flex flex-col gap-8 min-h-full max-w-6xl mx-auto pt-4 pb-12 relative">
      
      {/* Dev Toggle Button */}
      <div className="absolute top-0 right-0 z-50">
        <button 
          onClick={handleToggleAlert}
          className={`text-xs px-3 py-1 bg-background rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isAlertActive ? 'border-red-500/50 text-red-500' : 'border-border text-gray-400 hover:text-white'}`}
        >
          {isAlertActive ? 'Dismiss Alert (Demo)' : 'Trigger Alert (Demo)'}
        </button>
      </div>

      {/* Top Section: DARIA & Trend Score */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 min-h-[440px]">
        
        {/* DARIA Anchor Panel */}
        <div 
          className={`${colors.bgPanel} flex flex-col relative overflow-hidden group ${isAlertActive ? 'ring-1 ring-cyan-400 shadow-[0_0_30px_rgb(var(--theme-accent-rgb) / 0.1)]' : ''}`}
          onMouseEnter={() => !isAlertActive && setShowSummary(true)}
          onMouseLeave={() => setShowSummary(false)}
        >
          <div className="group p-6 pb-0 flex justify-between items-start absolute w-full z-10">
            <div>
              <h2 className={`${typography.microLabel} ${typography.textSecondary} group-hover:text-white`}>Core Engine</h2>
              <h3 className="text-xl font-bold text-white mt-1 tracking-wide group-hover:text-cyan-500">DARIA Supervisor</h3>
            </div>
            
            {/* Standard controls only shown when NOT in alert mode */}
            {!isAlertActive && (
              <select 
                value={dariaState} 
                onChange={(e) => setDariaState(e.target.value as DariaState)}
                className="bg-transparent text-[#9ca3af] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded cursor-pointe transition-colors"
                aria-label="DARIA Supervisor State"
              >
                <option value="standby">Standby</option>
                <option value="scanning">Scanning</option>
                <option value="signal">Signal</option>
                <option value="executing">Executing</option>
                <option value="low-confidence">Low Confidence</option>
              </select>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center mt-12 relative">
             <DariaJellyfish size={240} state={dariaState} confidence={confidence} />
             
             {/* Persistent context card */}
             <div className="absolute bottom-8 left-8 right-8 z-20">
               <AnimatePresence mode="wait">
                 {!isAlertActive ? (
                   // Standby Hover Summary
                   showSummary && (
                     <motion.div 
                       key="standby"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="max-w-md mx-auto bg-surface/80 backdrop-blur border border-border p-5 rounded-xl shadow-2xl cursor-pointer hover:bg-surface transition-colors"
                     >
                       <div className="flex items-center gap-3 mb-2">
                         <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                         <span className={`${typography.microLabel} text-white`}>Supervisor Status</span>
                       </div>
                       <p className={`${typography.textSecondary} text-sm leading-relaxed`}>
                         Signal steady across all engines. No action needed. Baseline velocity normal.
                       </p>
                     </motion.div>
                   )
                 ) : (
                   // Alert Persistent Card
                   <motion.div 
                     key="alert"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="max-w-md mx-auto bg-background border border-accent/40 p-6 rounded-xl shadow-[0_0_40px_rgb(var(--theme-accent-rgb) / 0.1)] relative overflow-hidden"
                   >
                     <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                     
                     <div className="flex items-center gap-3 mb-4">
                       <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--theme-accent)]"></div>
                       <span className={`${typography.microLabel} text-white`}>Action Required</span>
                     </div>
                     
                     <div className="mb-6">
                       <p className="text-white text-lg font-light leading-snug">
                         +42% velocity spike detected by <span className={`${colors.accentText} font-medium`}>Quantum Guess</span>.
                       </p>
                     </div>
                     
                     <div className="flex gap-3 w-full">
                       <button 
                         onClick={handleBuyWindow}
                         className="flex-1 bg-accent text-background font-semibold text-sm py-3 rounded-lg hover:bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                       >
                         Review buy window
                       </button>
                       <button 
                         onClick={handleEvidencePack}
                         className="px-4 border border-accent/40 text-accent hover:bg-accent/10 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                         title="View Evidence Library"
                         aria-label="View Evidence Library"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                         </svg>
                       </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Trend Score Panel - Dimmed during alert */}
        <div className={`group ${colors.bgPanel} flex flex-col p-8 justify-between ${dimClass}`}>
          <div>
            <h2 className={`${typography.microLabel} ${typography.textSecondary} group-hover:text-white`}>Trend Score</h2>
            <p className={`${typography.textTertiary} text-sm mt-2 leading-relaxed`}>
              Aggregated momentum across tracked nodes. Requires active signal.
            </p>
          </div>
          <div className="flex items-baseline">
             <h1 className={`${typography.heroMetric} ${hasActiveSignal ? colors.accentText : typography.textTertiary}`}>
               {trendScore}
             </h1>
          </div>
        </div>

      </div>

      {/* Middle Section: Five Engine Pipeline - Dimmed during alert */}
      <div className={dimClass}>
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-4 ml-1`}>Execution Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 ">
          {ENGINES.map((engine) => {
            const engineState = isAlertActive && triggerEngine === engine.id ? 'signal' : 
                               isAlertActive ? 'standby' : dariaState;
            
            const renderGlyph = () => {
              if (engineState === 'executing') return <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect width="10" height="10" className="fill-gray-500 group-hover:fill-cyan-400 transition-colors duration-300" /></svg>;
              if (engineState === 'signal') return <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><polygon points="5,0 10,10 0,10" className="fill-gray-500 group-hover:fill-cyan-400 animate-pulse transition-colors duration-300" /></svg>;
              if (engineState === 'scanning') return <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="5" className="fill-gray-500 group-hover:fill-cyan-400 transition-colors duration-300" /></svg>;
              if (engineState === 'low-confidence') return <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1,9 L5,1 L9,9 Z" className="stroke-gray-500 group-hover:stroke-cyan-400 fill-none stroke-2 animate-pulse transition-colors duration-300" /></svg>;
              
              // Default standby
              return <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><rect width="8" height="8" rx="4" className="fill-gray-500 group-hover:fill-cyan-400 transition-colors duration-300" /></svg>;            
            };

            return (
              <div key={engine.id} className={`group ${colors.bgPanel} p-5 flex flex-col justify-between min-h-[140px] ${isAlertActive && triggerEngine === engine.id ? 'border-accent/50 bg-accent/5' : ''}`}>                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-4  h-4">{renderGlyph()}</div>
                  <span className={`${typography.microLabel} ${typography.textTertiary} group-hover:text-white`}>
                    {engineState}
                  </span>
                </div>
                <div>
                  <h3 className={`text-white font-medium text-[13px] mb-1 ${isAlertActive && triggerEngine === engine.id ? colors.accentText : ''}`}>{engine.name}</h3>
                  <p className={`${typography.textSecondary} text-[11px] leading-snug`}>{engine.desc}</p>
                </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Trust Metrics Strip - Dimmed during alert */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border ${dimClass}`}>
        <div className="flex flex-col gap-2">
          <InfoTooltip label="Lead Time" info="Calculated via DARIA's quantum forecasting model, indicating the optimal execution window before the target saturates." />
          <span className={typography.heroMetricSub}>{leadTime}</span>
        </div>
        <div className="flex flex-col gap-2">
          <InfoTooltip label="Confidence" info="Derived from multi-vector signal consensus and historical anomaly patterns. >85% is considered actionable." />
          <div className="flex items-baseline gap-1">
             <span className={typography.heroMetricSub}>{confidence}</span>
             <span className={`${typography.textTertiary} text-xl`}>%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`${typography.microLabel} ${typography.textSecondary}`}>System Latency</span>
          <span className={typography.heroMetricSub}>{latency}</span>
        </div>
      </div>

      <BuyWindowModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)}
        onConfirm={() => handleConfirmAction(false)}
        onDelegate={() => handleConfirmAction(true)}
      />

    </div>
  );
}

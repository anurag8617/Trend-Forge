import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';
import HoloBidderQueue from '../components/HoloBidderQueue';

export type EngineType = 'feed' | 'line' | 'gauge' | 'log' | 'queue';

export interface EngineConfig {
  title: string;
  heroMetric: string;
  metricLabel: string;
  description: string;
  caveat: string;
  vizType: EngineType;
}

const MOCK_SIGNALS = [
  {
    id: 1,
    title: 'Mob-wife aesthetic — fringe velocity spike',
    severity: 'high',
    timestamp: '12 min ago',
    sparkline: 'M0 25 L20 22 L40 24 L60 15 L80 18 L100 5',
    dariaVoice: 'This is spreading fast and naturally across lots of platforms. It looks like a good time to advertise.',
    cta: 'Review buy window',
    technicalDetails: [
      'Source group: 99B',
      'Cross-community spread: Confirmed',
      'Growth vs normal: +412%',
      'Fake account check: Passed'
    ]
  },
  {
    id: 2,
    title: 'Y2K translucent hardware — steady buildup',
    severity: 'medium',
    timestamp: '45 min ago',
    sparkline: 'M0 25 L20 26 L40 23 L60 20 L80 16 L100 12',
    dariaVoice: 'This is slowly building up in a small group of fans. Not big yet, but growing.',
    cta: 'View evidence',
    technicalDetails: [
      'Source group: 21A',
      'Cross-community spread: Pending',
      'Growth vs normal: +65%',
      'Fake account check: Passed'
    ]
  },
  {
    id: 3,
    title: 'Brutalist web revival — early rumblings',
    severity: 'low',
    timestamp: '2 hrs ago',
    sparkline: 'M0 25 L20 24 L40 25 L60 26 L80 23 L100 20',
    dariaVoice: "A small, steady signal is showing up in design communities. I'm keeping an eye on it.",
    cta: 'View evidence',
    technicalDetails: [
      'Source group: 01C',
      'Cross-community spread: Negative',
      'Growth vs normal: +12%',
      'Fake account check: Passed'
    ]
  }
];

function SignalCard({ signal }: { signal: typeof MOCK_SIGNALS[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col p-5 bg-background border border-border rounded-lg shadow-sm`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 text-accent opacity-90">
            {signal.severity === 'high' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 22 22 2 22"/></svg>
            ) : signal.severity === 'medium' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/></svg>
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-white text-[15px] font-medium tracking-wide">{signal.title}</h4>
            <span className={`${typography.textTertiary} text-[11px] mt-1`}>{signal.timestamp}</span>
          </div>
        </div>
        
        <div className="w-16 h-8 shrink-0 opacity-70">
           <svg viewBox="0 0 100 30" className="w-full h-full stroke-accent fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={signal.sparkline} />
           </svg>
        </div>
      </div>
      
      <p className={`${typography.textSecondary} text-[13px] leading-relaxed mb-5 italic`}>
        "{signal.dariaVoice}"
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-border/60">
         <button className="px-4 py-1.5 border border-accent/40 text-accent hover:bg-accent/10 rounded-md text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {signal.cta}
         </button>
         <button onClick={() => setIsOpen(!isOpen)} className={`${typography.textTertiary} hover:text-white text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:text-white`}>
            Technical detail
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
               <polyline points="6 9 12 15 18 9"/>
            </svg>
         </button>
      </div>

      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="mt-4 pt-4 border-t border-border/60 text-[11px] text-gray-400 flex flex-col gap-2 overflow-hidden"
           >
              {signal.technicalDetails.map((detail, i) => (
                 <div key={i} className="flex gap-3">
                   <span className="text-cyan-400/50">&gt;</span>
                   <span>{detail}</span>
                 </div>
              ))}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SignalFeed() {
  return (
    <div className="flex flex-col gap-5 p-6 h-full overflow-y-auto">
      {MOCK_SIGNALS.map(signal => <SignalCard key={signal.id} signal={signal} />)}
    </div>
  );
}

// Minimal placeholder visualizations based on vizType
const renderViz = (type: EngineType) => {
  switch (type) {
    case 'line':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center pb-4 relative overflow-hidden">
          <p className="absolute top-6 left-6 text-sm text-gray-300 z-10">This shows how big we expect this trend to get over the next few days</p>
          {/* Shaded Confidence Band */}
          <svg className="absolute bottom-0 w-full h-[80%]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 80 Q 25 70, 50 40 T 100 20 L 100 100 L 0 100 Z" fill="rgba(34,211,238,0.05)" />
            <path d="M0 60 Q 25 50, 50 20 T 100 10 L 100 100 L 0 100 Z" fill="rgba(34,211,238,0.1)" />
            {/* Minimal Line */}
            <path d="M0 70 Q 25 60, 50 30 T 100 15" fill="none" className="stroke-cyan-400" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      );
    case 'feed':
      return <SignalFeed />;
    case 'gauge':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center relative gap-4">
          <div className="relative">
            <svg className="w-48 h-48" viewBox="0 0 100 50">
              {/* Background Arc */}
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-border)" strokeWidth="8" strokeLinecap="round" />
              {/* Value Arc */}
              <path d="M 10 50 A 40 40 0 0 1 75 15" fill="none" className="stroke-cyan-400" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <span className="text-4xl font-light text-white">8.2<span className="text-lg text-gray-500">/10</span></span>
            </div>
          </div>
          <div className="font-semibold text-white">People are reacting strongly to this</div>
        </div>
      );
    case 'log':
      return (
        <div className="flex flex-col gap-3 p-6 h-full overflow-y-auto">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/20">
            <div className="w-2 h-2 rounded-full bg-gray-500 shrink-0"></div>
            <span className="text-sm text-gray-400">Checking how real this activity looks...</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface/20">
            <div className="w-2 h-2 rounded-full bg-gray-500 shrink-0"></div>
            <span className="text-sm text-gray-400">Comparing against known fake-activity patterns...</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
            <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
            <span className="text-sm text-white">Found some fake-looking activity</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
            <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-sm text-white">Removed 4,200 fake interactions to keep the data clean</span>
          </div>
        </div>
      );
    case 'queue':
      return <HoloBidderQueue />;
  }
};

export default function EngineWorkspace({ config }: { config: EngineConfig }) {
  const navigate = useNavigate();
  const { addAuditLog } = useAppState();
  const [isBlocked, setIsBlocked] = useState(false);
  const isDisinfo = config.title === 'DisinfoDefender';

  const currentMetricColor = isBlocked ? 'text-rose-500' : 'text-white';
  const currentMetric = isBlocked ? 'BLOCKED' : config.heroMetric;
  const currentBg = isBlocked ? 'bg-rose-500/5' : colors.bgPanel;
  const currentBorder = isBlocked ? 'border-rose-500/20' : 'border-border';

  const handleEvidencePack = () => {
    addAuditLog('EVIDENCE_EXPORTED', `Generated evidence pack for ${config.title}.`);
    navigate('/evidence');
  };

  const handleToggleBlock = () => {
    const newState = !isBlocked;
    setIsBlocked(newState);
    addAuditLog('COMPLIANCE_STATE_CHANGED', `DisinfoDefender block state set to ${newState ? 'ACTIVE' : 'INACTIVE'}.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 md:gap-8 h-full max-w-5xl mx-auto pt-4 pb-12 relative"
    >
      {/* Header */}
      <div className="border-b border-border pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`${typography.microLabel} ${typography.textSecondary}`}>Engine Workspace</h2>
            {isBlocked && (
              <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] uppercase tracking-wider">
                Execution Suspended
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">{config.title}</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Toggle for Demo Purposes */}
          {isDisinfo && (
            <button 
              onClick={handleToggleBlock}
              className={`px-3 py-1.5 border rounded text-xs transition-colors ${
                isBlocked ? 'border-rose-500 text-rose-500 bg-rose-500/10' : 'border-border text-gray-500 hover:text-gray-300'
              }`}
            >
              Toggle Block State
            </button>
          )}

          <button 
            onClick={handleEvidencePack}
            className="flex items-center gap-2 px-4 py-2 border border-accent/40 text-accent hover:bg-accent/10 rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Evidence Pack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        
        {/* Left Column: Metric & Explanation */}
        <div className="flex flex-col gap-8">
          <div className={`${currentBg} border ${currentBorder} rounded p-8 flex flex-col justify-center min-h-[220px] transition-colors duration-500`}>
            <span className={`${typography.microLabel} ${isBlocked ? 'text-rose-500/70' : typography.textSecondary} mb-4`}>
              {config.metricLabel}
            </span>
            <h2 className={`${typography.heroMetric} ${currentMetricColor} transition-colors duration-500`}>
              {currentMetric}
            </h2>
          </div>

          <div className={`flex flex-col gap-4 p-6 bg-background border-l-2 ${isBlocked ? 'border-rose-500' : 'border-border'} transition-colors duration-500`}>
            {!isBlocked ? (
              <p className={`${typography.textPrimary} leading-relaxed text-sm`}>
                {config.description}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-rose-500 font-medium text-sm">Compliance Blocked</span>
                <p className="text-gray-300 leading-relaxed text-sm">
                  We paused buying here because too much of the activity looks fake or automated, not real people. We'll resume once it checks out.
                </p>
              </div>
            )}
            <div className={`mt-4 pt-4 border-t ${isBlocked ? 'border-rose-500/20' : 'border-border'}`}>
              <span className={`${typography.microLabel} text-gray-500 block mb-2`}>Honest Science Caveat</span>
              <p className={`${typography.textSecondary} text-xs italic leading-relaxed`}>
                "{config.caveat}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization Canvas */}
        <div className={`${colors.bgPanel} flex flex-col overflow-hidden`}>
          <div className="px-6 py-4 border-b border-border">
            <span className={`${typography.microLabel} ${typography.textTertiary}`}>Live Telemetry</span>
          </div>
          <div className={`flex-1 relative min-h-[250px] md:min-h-[300px] transition-opacity duration-500 ${isBlocked ? 'opacity-30 grayscale' : ''}`}>
            {renderViz(config.vizType)}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

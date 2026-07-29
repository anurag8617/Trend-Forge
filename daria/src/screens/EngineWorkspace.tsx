import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Minimal placeholder visualizations based on vizType
const renderViz = (type: EngineType) => {
  switch (type) {
    case 'line':
      return (
        <div className="w-full h-full flex items-end justify-center pb-4 relative overflow-hidden">
          {/* Shaded Confidence Band */}
          <svg className="absolute bottom-0 w-full h-[80%]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 80 Q 25 70, 50 40 T 100 20 L 100 100 L 0 100 Z" fill="rgb(var(--theme-accent-rgb) / 0.05)" />
            <path d="M0 60 Q 25 50, 50 20 T 100 10 L 100 100 L 0 100 Z" fill="rgb(var(--theme-accent-rgb) / 0.1)" />
            {/* Minimal Line */}
            <path d="M0 70 Q 25 60, 50 30 T 100 15" fill="none" stroke="#3DD6F5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      );
    case 'feed':
      return (
        <div className="flex flex-col gap-3 p-4 h-full overflow-hidden opacity-80">
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className={`${typography.textSecondary} text-sm`}>Node X42: Anomalous velocity detected</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-[#4b5563]"></div>
            <span className={`${typography.textTertiary} text-sm`}>Node Y17: Baseline stable</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className={`${typography.textSecondary} text-sm`}>Node Z99: Wide-bridge crossing confirmed</span>
          </div>
        </div>
      );
    case 'gauge':
      return (
        <div className="w-full h-full flex items-center justify-center relative">
          <svg className="w-48 h-48" viewBox="0 0 100 50">
            {/* Background Arc */}
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1A1B41" strokeWidth="8" strokeLinecap="round" />
            {/* Value Arc */}
            <path d="M 10 50 A 40 40 0 0 1 75 15" fill="none" stroke="#3DD6F5" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-6 font-semibold text-white">High Arousal</div>
        </div>
      );
    case 'log':
      return (
        <div className="flex flex-col gap-2 p-4 h-full overflow-hidden font-mono text-[11px]">
          <div className="text-gray-500">[04:22:10] Scanning baseline engagement vectors...</div>
          <div className="text-gray-500">[04:22:11] Comparing heuristics against local DB...</div>
          <div className="text-accent">[04:22:14] Synthetic botnet footprint isolated</div>
          <div className="text-white">[04:22:15] Action: Scrubbed 4,200 engagements</div>
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

  const currentMetricColor = isBlocked ? 'text-[#F43F5E]' : 'text-white';
  const currentMetric = isBlocked ? 'BLOCKED' : config.heroMetric;
  const currentBg = isBlocked ? 'bg-[#F43F5E]/5' : colors.bgPanel;
  const currentBorder = isBlocked ? 'border-[#F43F5E]/20' : 'border-[#1A1B41]';

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
      className="flex flex-col gap-8 h-full max-w-5xl mx-auto pt-4 pb-12 relative"
    >
      {/* Header */}
      <div className="border-b border-[#1A1B41] pb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`${typography.microLabel} ${typography.textSecondary}`}>Engine Workspace</h2>
            {isBlocked && (
              <span className="px-2 py-0.5 rounded bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] text-[10px] font-mono uppercase tracking-wider">
                Execution Suspended
              </span>
            )}
          </div>
          <h1 className="text-4xl font-light tracking-tight text-white">{config.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Toggle for Demo Purposes */}
          {isDisinfo && (
            <button 
              onClick={handleToggleBlock}
              className={`px-3 py-1.5 border rounded text-xs font-mono transition-colors ${
                isBlocked ? 'border-[#F43F5E] text-[#F43F5E] bg-[#F43F5E]/10' : 'border-[#1A1B41] text-gray-500 hover:text-gray-300'
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
            <span className={`${typography.microLabel} ${isBlocked ? 'text-[#F43F5E]/70' : typography.textSecondary} mb-4`}>
              {config.metricLabel}
            </span>
            <h2 className={`${typography.heroMetric} ${currentMetricColor} transition-colors duration-500`}>
              {currentMetric}
            </h2>
          </div>

          <div className={`flex flex-col gap-4 p-6 bg-[#0A0F1C] border-l-2 ${isBlocked ? 'border-[#F43F5E]' : 'border-[#1A1B41]'} transition-colors duration-500`}>
            {!isBlocked ? (
              <p className={`${typography.textPrimary} leading-relaxed text-sm`}>
                {config.description}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-[#F43F5E] font-medium text-sm">Compliance Blocked</span>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Synthetic engagement footprint exceeds maximum allowable threshold for execution. Automated bidding suspended until network purity is restored.
                </p>
              </div>
            )}
            <div className={`mt-4 pt-4 border-t ${isBlocked ? 'border-[#F43F5E]/20' : 'border-[#1A1B41]'}`}>
              <span className={`${typography.microLabel} text-gray-500 block mb-2`}>Honest Science Caveat</span>
              <p className={`${typography.textSecondary} text-xs italic leading-relaxed`}>
                "{config.caveat}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization Canvas */}
        <div className={`${colors.bgPanel} flex flex-col overflow-hidden`}>
          <div className="px-6 py-4 border-b border-[#1A1B41]">
            <span className={`${typography.microLabel} ${typography.textTertiary}`}>Live Telemetry</span>
          </div>
          <div className={`flex-1 relative min-h-[300px] transition-opacity duration-500 ${isBlocked ? 'opacity-30 grayscale' : ''}`}>
            {renderViz(config.vizType)}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { EngineGlyphs } from '../components/EngineGlyph';

const getEngineId = (engineName: string) => {
  if (engineName.includes('Ghost')) return 'ghost';
  if (engineName.includes('Quantum')) return 'quantum';
  if (engineName.includes('Bio')) return 'bio';
  if (engineName.includes('Disinfo')) return 'disinfo';
  if (engineName.includes('Holo')) return 'holo';
  return 'ghost';
};
import { useAppState } from '../state/AppContext';
import { useLocation } from 'react-router-dom';

export default function EvidenceLibrary() {
  const { evidencePacks } = useAppState();
  const location = useLocation();
  const [selectedPack, setSelectedPack] = useState<typeof evidencePacks[0] | null>(null);

  useEffect(() => {
    if (location.state?.openId) {
      const pack = evidencePacks.find(p => p.id === location.state.openId);
      if (pack) {
        setSelectedPack(pack);
      }
    }
  }, [location.state, evidencePacks]);

  const allPassed = selectedPack ? selectedPack.compliance.every(log => log.startsWith('✓')) : true;
  const summarySentence = selectedPack ? `DARIA is ${selectedPack.confidence}% sure about this, and ${allPassed ? 'all privacy checks passed.' : 'some privacy checks failed.'}` : '';

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto pt-4 pb-12 relative">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Compliance & Auditing</h2>
        <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">Evidence Library</h1>
        <p className={`${typography.textTertiary} mt-2 text-sm`}>
          Immutable records of signal triggers, confidence calibrations, and compliance clearances.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* LIST VIEW */}
        {!selectedPack && (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <div className="w-full flex flex-col gap-4">
              {evidencePacks.map(pack => (
                <div 
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 border border-border rounded-xl cursor-pointer group hover:bg-surface/30 transition-colors bg-background gap-4"
                >
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-medium">{pack.id.toUpperCase()}</span>
                    <span className="text-cyan-400 text-sm mt-1">
                      {pack.confidence >= 90 ? "TrendForge was highly confident and it turned out to be right." : "TrendForge caught this early and monitored the progression."}
                    </span>
                    <span className={`${typography.textSecondary} text-sm mt-3`}>
                      {new Date(pack.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-6">
                    <div className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-full border border-border">
                      <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24">
                        {EngineGlyphs[getEngineId(pack.engine)]}
                      </svg>
                      <span className="text-white text-sm">{pack.engine}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-6 text-right">
                      <div className="flex flex-col">
                        <span className={`${typography.textTertiary} text-[10px] uppercase tracking-wider`}>Trend Score</span>
                        <span className="text-white text-base">{pack.trendScore}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className={`${typography.textTertiary} text-[10px] uppercase tracking-wider`}>Confidence</span>
                        <span className="text-white text-base">{pack.confidence}%</span>
                      </div>
                      <div className="ml-2 md:ml-4">
                        <span className="text-cyan-400 group-hover:text-white transition-colors text-sm font-medium">View Detail &rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DETAIL VIEW */}
        {selectedPack && (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col gap-10"
          >
            {/* Back Button & Title */}
            <div className="flex items-start gap-3 md:gap-6 border-b border-border pb-6">
              <button 
                onClick={() => setSelectedPack(null)}
                className={`mt-1 p-2 rounded hover:bg-surface/50 ${typography.textSecondary} hover:text-white transition-colors`}
                aria-label="Back to Library"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              
              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                <div>
                  <h2 className="text-2xl font-light text-white">{selectedPack.id.toUpperCase()}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`${typography.textSecondary} text-sm`}>
                      {new Date(selectedPack.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24">
                        {EngineGlyphs[getEngineId(selectedPack.engine)]}
                      </svg>
                      <span className="text-cyan-400 text-sm font-medium">{selectedPack.engine}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-border text-white rounded text-sm font-medium hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                    Export JSON
                  </button>
                  <button className="px-4 py-2 bg-cyan-400 text-background rounded text-sm font-semibold hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Left Column */}
              <div className="flex flex-col gap-10">
                
                {/* Summary Sentence */}
                <div className="text-white text-lg leading-relaxed">
                  {summarySentence}
                </div>

                {/* Confidence & Score */}
                <div>
                  <h3 className={`${typography.microLabel} ${typography.textSecondary} mb-4`}>Calibration Metrics</h3>
                  <div className="flex gap-8 md:gap-12">
                    <div className="flex flex-col gap-1">
                      <span className={`${typography.textTertiary} text-sm`}>Trend Score</span>
                      <span className="text-3xl font-light text-white">{selectedPack.trendScore}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`${typography.textTertiary} text-sm`}>Confidence</span>
                      <span className="text-3xl font-light text-white">{selectedPack.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Backtest Citation */}
                <div>
                  <h3 className={`${typography.microLabel} ${typography.textSecondary} mb-4`}>Backtest Citation</h3>
                  <div className="p-5 border-l-2 border-border bg-background">
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedPack.backtest}</p>
                  </div>
                </div>
                
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-10">
                
                {/* Source Trust Breakdown */}
                <div>
                  <h3 className={`${typography.microLabel} ${typography.textSecondary} mb-4`}>Source Trust Breakdown</h3>
                  <div className="flex flex-col gap-3">
                    {selectedPack.sources.map((source, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-border/30 gap-2 sm:gap-0">
                        <span className="text-gray-300 text-sm">{source.name}</span>
                        <div className="flex items-center gap-4">
                          <span className={`${typography.textSecondary} text-xs uppercase tracking-wider`}>{source.trust}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-surface rounded overflow-hidden">
                              <div className="h-full bg-cyan-400" style={{ width: `${source.weight}%` }}></div>
                            </div>
                            <span className={`${typography.textSecondary} text-xs`}>{source.weight}% of the decision</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Log */}
                <div>
                  <h3 className={`${typography.microLabel} ${typography.textSecondary} mb-4`}>Compliance Clearance</h3>
                  <div className="p-4 bg-surface/10 border border-border rounded flex flex-col gap-3 text-sm text-gray-300">
                    {selectedPack.compliance.map((log, idx) => (
                      <span key={idx}>{log}</span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, typography } from '../lib/tokens';

// Dummy Data
const EVIDENCE_PACKS = [
  {
    id: 'ev-092',
    timestamp: '2026-07-29T14:22:10Z',
    engine: 'Quantum Guess',
    trendScore: '84.2',
    confidence: 94,
    sources: [
      { name: 'Social Graph Velocity (Nodes 40-82)', weight: 45, trust: 'High' },
      { name: 'Historical Saturation Curve Match', weight: 35, trust: 'Very High' },
      { name: 'Cross-Platform Arousal Delta', weight: 20, trust: 'Medium' },
    ],
    backtest: 'Matched to historical curve event [EV-2024-8A] with 91% correlation. Projected decay in 72 hours.',
    compliance: [
      "✓ Kept everyone's identity private (GDPR rule)",
      "✓ Made sure ads only go to the right people (CCPA rule)",
      "✓ Checked that we aren't spending too much money (FISMA rule)"
    ]
  },
  {
    id: 'ev-091',
    timestamp: '2026-07-29T10:15:44Z',
    engine: 'Ghost Mode',
    trendScore: '61.4',
    confidence: 82,
    sources: [
      { name: 'Fringe Network Anomaly Scans', weight: 60, trust: 'Medium' },
      { name: 'Keyword Emergence Delta', weight: 40, trust: 'High' },
    ],
    backtest: 'Insufficient historical data for direct match. Relies purely on structural velocity metrics.',
    compliance: [
      "✓ Made sure no personal information was shared",
      "✓ Kept data completely anonymous"
    ]
  },
  {
    id: 'ev-090',
    timestamp: '2026-07-28T22:05:12Z',
    engine: 'DARIA Supervisor',
    trendScore: '92.1',
    confidence: 99,
    sources: [
      { name: 'Aggregated Engine Output', weight: 80, trust: 'Very High' },
      { name: 'HoloBidder Liquidity Verification', weight: 20, trust: 'High' },
    ],
    backtest: 'Cross-engine consensus achieved. 100% match with internal execution protocols.',
    compliance: [
      "✓ Got approval from the boss automatically",
      "✓ Turned on rules to stop market manipulation"
    ]
  }
];

export default function EvidenceLibrary() {
  const [selectedPack, setSelectedPack] = useState<typeof EVIDENCE_PACKS[0] | null>(null);

  const allPassed = selectedPack ? selectedPack.compliance.every(log => log.startsWith('✓')) : true;
  const summarySentence = selectedPack ? `DARIA is ${selectedPack.confidence}% sure about this, and ${allPassed ? 'all privacy checks passed.' : 'some privacy checks failed.'}` : '';

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto pt-4 pb-12 relative">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Compliance & Auditing</h2>
        <h1 className="text-4xl font-light tracking-tight text-white">Evidence Library</h1>
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
            <div className="w-full">
              {/* Table Header */}
              <div className="grid grid-cols-5 py-3 border-b border-border mb-2">
                <span className={`${typography.microLabel} ${typography.textSecondary}`}>ID / Timestamp</span>
                <span className={`${typography.microLabel} ${typography.textSecondary}`}>Engine</span>
                <span className={`${typography.microLabel} ${typography.textSecondary}`}>Trend Score</span>
                <span className={`${typography.microLabel} ${typography.textSecondary}`}>Confidence</span>
                <span className={`${typography.microLabel} ${typography.textSecondary} text-right`}>Action</span>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {EVIDENCE_PACKS.map(pack => (
                  <div 
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className="grid grid-cols-5 py-4 border-b border-border/50 cursor-pointer group hover:bg-surface/20 transition-colors items-center"
                  >
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">{pack.id.toUpperCase()}</span>
                      <span className={`${typography.textSecondary} text-[11px] font-mono mt-1`}>{pack.timestamp.replace('T', ' ').slice(0, 16)}</span>
                    </div>
                    <span className="text-white text-sm">{pack.engine}</span>
                    <span className="text-white text-sm font-mono">{pack.trendScore}</span>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 bg-surface rounded overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${pack.confidence}%` }}></div>
                      </div>
                      <span className={`${typography.textSecondary} text-xs font-mono`}>{pack.confidence}%</span>
                    </div>

                    <div className="text-right">
                      <span className={`${typography.textSecondary} group-hover:${colors.accentText} transition-colors text-sm font-medium`}>View Detail &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
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
            <div className="flex items-start gap-6 border-b border-border pb-6">
              <button 
                onClick={() => setSelectedPack(null)}
                className={`mt-1 p-2 rounded hover:bg-surface/50 ${typography.textSecondary} hover:text-white transition-colors`}
                aria-label="Back to Library"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-light text-white">{selectedPack.id.toUpperCase()}</h2>
                  <div className="flex gap-4 mt-2">
                    <span className={`${typography.textSecondary} text-sm font-mono`}>{selectedPack.timestamp.replace('T', ' ').replace('Z', ' UTC')}</span>
                    <span className={`${colors.accentText} text-sm font-medium`}>{selectedPack.engine}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-border text-white rounded text-sm font-medium hover:bg-surface transition-colors">
                    Export JSON
                  </button>
                  <button className="px-4 py-2 bg-accent text-background rounded text-sm font-semibold hover:bg-white transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Left Column */}
              <div className="flex flex-col gap-10">
                
                {/* Summary Sentence */}
                <div className="text-white text-lg leading-relaxed">
                  {summarySentence}
                </div>

                {/* Confidence & Score */}
                <div>
                  <h3 className={`${typography.microLabel} ${typography.textSecondary} mb-4`}>Calibration Metrics</h3>
                  <div className="flex gap-12">
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
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-border/30">
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

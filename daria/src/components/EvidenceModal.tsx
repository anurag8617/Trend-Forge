import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextName?: string;
  confidence?: number;
}

export default function EvidenceModal({ isOpen, onClose, contextName = 'DARIA Supervisor', confidence = 90 }: EvidenceModalProps) {
  const { addAuditLog } = useAppState();

  const handleExport = (type: string) => {
    addAuditLog('EVIDENCE_EXPORTED', `Saved ${type} evidence for ${contextName}.`);
    
    if (type === 'API' || type === 'JSON') {
      // 1. Create dummy payload based on the modal's context
      const payload = {
        id: `ev-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        engine: contextName,
        confidence: confidence,
        status: "CLEARED_FOR_EXECUTION"
      };

      // 2. Create a Blob and trigger a download
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `daria-evidence-${contextName.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
       // For PDF, you could just trigger a browser print window for the prototype
       window.print();
    }
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-4 md:px-8 md:py-6 border-b border-border flex justify-between items-center bg-surface/20">
              <div>
                <h2 className="text-xl font-light text-white tracking-wide">Evidence Pack</h2>
                <p className={`${typography.textSecondary} text-sm mt-1`}>Generated from {contextName}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-8 flex flex-col gap-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <span className={`${typography.microLabel} ${typography.textSecondary} block mb-1`}>Timestamp (UTC)</span>
                  <span className="text-white text-sm">{new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <div>
                  <span className={`${typography.microLabel} ${typography.textSecondary} block mb-1`}>Confidence Calibration</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-surface rounded overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${confidence}%` }}></div>
                    </div>
                    <span className="text-white text-sm">{confidence}%</span>
                  </div>
                </div>
              </div>

              <div>
                <span className={`${typography.microLabel} ${typography.textSecondary} block mb-3`}>Sources Weighted</span>
                <div className="bg-surface/10 border border-border rounded p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Social Graph Velocity (Nodes 40-82)</span>
                    <span className="text-cyan-400">45% weight</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Historical Saturation Curve Match</span>
                    <span className="text-cyan-400">35% weight</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Cross-Platform Arousal Delta</span>
                    <span className="text-cyan-400">20% weight</span>
                  </div>
                </div>
              </div>

              <div>
                <span className={`${typography.microLabel} ${typography.textSecondary} block mb-3`}>Compliance Clearance</span>
                <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 px-4 py-3 rounded">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--theme-accent-rgb) / 0.8)]"></div>
                  <span className="text-white text-sm">Cleared for execution: GDPR, CCPA, FISMA parameters verified.</span>
                </div>
              </div>

            </div>

            {/* Footer / Actions */}
            <div className="px-4 py-4 md:px-8 md:py-6 bg-surface/20 border-t border-border flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button 
                onClick={() => handleExport('API')}
                className="px-5 py-2.5 rounded text-white border border-border hover:bg-surface transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Export via API
              </button>
              <button 
                onClick={() => handleExport('PDF')}
                className="px-5 py-2.5 rounded bg-accent text-background hover:bg-white transition-colors text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Download PDF
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

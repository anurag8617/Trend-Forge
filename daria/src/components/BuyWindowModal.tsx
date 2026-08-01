import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';

interface BuyWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDelegate: () => void;
}

export default function BuyWindowModal({
  isOpen,
  onClose,
  onConfirm,
  onDelegate,
}: BuyWindowModalProps) {
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
            className="relative bg-background border border-accent/40 rounded-xl shadow-[0_0_40px_rgb(var(--theme-accent-rgb) / 0.15)] w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-4 md:px-8 md:py-6 border-b border-border flex justify-between items-center bg-surface/20">
              <div>
                <h2 className="text-xl font-light text-white tracking-wide">Review Buy Window</h2>
                <p className={`${typography.textSecondary} text-sm mt-1`}>
                  DARIA Supervisor has detected an optimal execution window.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-8 flex flex-col gap-6 sm:gap-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Current Plan */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`${typography.microLabel} text-gray-500`}>Current Plan</span>
                    <span className="text-gray-500 text-[10px] uppercase">Baseline</span>
                  </div>
                  <div className="p-5 border border-border bg-surface/20 rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400 text-sm">Execution Date</span>
                      <span className="text-white">Q3 (Standard)</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-border/50 pt-3">
                      <span className="text-gray-400 text-sm">Est. Saturation</span>
                      <span className="text-gray-300">~45%</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-border/50 pt-3">
                      <span className="text-gray-400 text-sm">Capital Allocation</span>
                      <span className="text-gray-300">$1.2M</span>
                    </div>
                  </div>
                </div>

                {/* DARIA Recommendation */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`${typography.microLabel} text-cyan-400`}>
                      DARIA Recommended
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-[10px] uppercase animate-pulse">
                      Optimal
                    </span>
                  </div>
                  <div className="p-5 border border-accent/40 bg-accent/5 rounded-lg flex flex-col gap-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent blur-[50px] opacity-20"></div>
                    <div className="flex justify-between items-end relative z-10">
                      <span className="text-cyan-400 text-sm">Execution Date</span>
                      <span className="text-white">Next 72 Hours</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-cyan-400/20 pt-3 relative z-10">
                      <span className="text-cyan-400 text-sm">Est. Saturation</span>
                      <span className="text-white">+89% (Anomaly)</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-cyan-400/20 pt-3 relative z-10">
                      <span className="text-cyan-400 text-sm">Capital Allocation</span>
                      <span className="text-white">$1.2M</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface/10 border-l-2 border-accent p-4 text-sm text-gray-300 leading-relaxed">
                By accelerating the execution window, the underlying asset will capture the emerging
                velocity spike prior to mainstream plateau. Confidence metric remains high across
                Ghost Mode and Quantum Guess parameters.
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="px-4 py-4 md:px-8 md:py-6 bg-surface/20 border-t border-border flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <button
                onClick={onDelegate}
                className="flex-1 py-3 rounded text-accent border border-accent/40 hover:bg-accent/10 transition-colors text-sm font-semibold flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Delegate to HoloBidder
                <svg
                  className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 rounded bg-cyan-400 text-background cursor-pointer hover:bg-cyan-300 transition-all duration-300 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Confirm (Execute Directly)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

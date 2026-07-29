import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';

interface Bid {
  id: string;
  target: string;
  amount: string;
  timestamp: string;
  status: 'pending' | 'executing' | 'completed';
}

const INITIAL_BIDS: Bid[] = [
  {
    id: 'HB-882',
    target: 'Cross-Network Node A',
    amount: '$420,000',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    status: 'completed',
  },
  {
    id: 'HB-883',
    target: 'Fringe Cohort B',
    amount: '$150,000',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    status: 'completed',
  },
  {
    id: 'HB-884',
    target: 'Emerging Trend Vector C',
    amount: '$850,000',
    timestamp: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'HB-885',
    target: 'Anomalous Velocity Node D',
    amount: '$320,000',
    timestamp: new Date(Date.now() + 5000).toISOString(),
    status: 'pending',
  },
];

export default function HoloBidderQueue() {
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const { setDariaState, addAuditLog } = useAppState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newBid: Bid = {
          id: `HB-${Math.floor(Math.random() * 1000)}`,
          target: `Emerging Vector ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
          amount: `$${Math.floor(Math.random() * 900) + 100},000`,
          timestamp: new Date().toISOString(),
          status: 'pending',
        };
        setBids((prev) => [newBid, ...prev.slice(0, 5)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleExecute = (bidId: string) => {
    // Optimistic UI update
    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: 'executing' } : b)));

    // Trigger global DARIA state
    setDariaState('executing');

    // Audit Log
    const bid = bids.find((b) => b.id === bidId);
    if (bid) {
      addAuditLog('BID_EXECUTING', `Executing ${bid.amount} bid on ${bid.target} via HoloBidder.`);
    }

    // Simulate completion
    setTimeout(() => {
      setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: 'completed' } : b)));
      setDariaState('standby');
      if (bid) {
        addAuditLog('BID_COMPLETED', `Execution confirmed for ${bid.id}.`);
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0F1C] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1A1B41] flex justify-between items-center bg-[#1A1B41]/20">
        <h3 className="text-white font-medium text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--theme-accent)]"></div>
          Live Execution Queue
        </h3>
        <span className="text-accent text-xs font-mono uppercase tracking-wider">
          HoloBidder Protocol
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {bids.map((bid) => {
              const isCompleted = bid.status === 'completed';
              const isExecuting = bid.status === 'executing';
              const isPending = bid.status === 'pending';

              return (
                <motion.div
                  key={bid.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isExecuting
                      ? 'bg-accent/10 border-accent/50 shadow-[0_0_15px_rgb(var(--theme-accent-rgb) / 0.1)]'
                      : isCompleted
                        ? 'bg-[#1A1B41]/10 border-[#1A1B41]/50 opacity-60'
                        : 'bg-[#1A1B41]/30 border-[#1A1B41]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-medium text-sm">{bid.target}</span>
                      <span className={`${typography.textSecondary} text-[10px] font-mono`}>
                        {bid.id} | {bid.timestamp.replace('T', ' ').slice(0, 19)}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-sm ${isExecuting ? 'text-accent' : 'text-gray-300'}`}
                    >
                      {bid.amount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-[#1A1B41]/30">
                    <div className="flex items-center gap-2">
                      {isExecuting && (
                        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                          <polygon points="4,0 8,8 0,8" className="fill-accent animate-pulse" />
                        </svg>
                      )}
                      {isCompleted && (
                        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                          <rect width="8" height="8" rx="2" className="fill-gray-500" />
                        </svg>
                      )}
                      {isPending && (
                        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                          <circle cx="4" cy="4" r="4" className="fill-yellow-500" />
                        </svg>
                      )}
                      <span
                        className={`${typography.textTertiary} text-xs uppercase tracking-wider`}
                      >
                        {bid.status}
                      </span>
                    </div>

                    {isPending && (
                      <button
                        onClick={() => handleExecute(bid.id)}
                        className="px-4 py-1.5 bg-accent/10 hover:bg-accent text-accent hover:text-[#0A0F1C] border border-accent/30 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Force Execute
                      </button>
                    )}
                    {isExecuting && (
                      <span className="text-accent text-xs font-mono animate-pulse">
                        Processing...
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

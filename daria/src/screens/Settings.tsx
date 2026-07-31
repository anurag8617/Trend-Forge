import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';

export default function Settings() {
  const { auditLogs } = useAppState();

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto pt-4 pb-12">
      
      {/* Header */}
      <div className="mb-8 border-b border-border pb-6">
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Administration</h2>
        <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">System Settings & Audit</h1>
        <p className={`${typography.textTertiary} mt-2 text-sm`}>
          Manage workspace configuration and review immutable system execution logs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 h-full">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-x-visible">
          <button className="whitespace-nowrap text-left px-4 py-2 bg-surface/50 border-l-2 border-accent text-white text-sm font-medium">
            Audit Trail
          </button>
          <button className="whitespace-nowrap text-left px-4 py-2 border-l-2 border-transparent text-gray-500 hover:text-white hover:bg-surface/20 text-sm transition-colors">
            Access Control
          </button>
          <button className="whitespace-nowrap text-left px-4 py-2 border-l-2 border-transparent text-gray-500 hover:text-white hover:bg-surface/20 text-sm transition-colors">
            API Keys
          </button>
          <button className="whitespace-nowrap text-left px-4 py-2 border-l-2 border-transparent text-gray-500 hover:text-white hover:bg-surface/20 text-sm transition-colors">
            Engine Config
          </button>
        </div>

        {/* Content: Audit Trail */}
        <div className="flex-1 flex flex-col min-h-0 bg-background border border-border rounded-xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface/20">
            <h3 className="text-white font-medium text-sm">Execution Audit Log</h3>
            <button className="text-cyan-400 hover:text-white text-xs uppercase tracking-wider transition-colors">
              Export CSV
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {auditLogs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                  className="flex flex-col gap-1 p-3 bg-surface/20 border border-border/50 rounded"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 text-xs">{log.action}</span>
                    <span className="text-gray-500 text-[10px]">{new Date(log.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {log.detail}
                  </p>
                </motion.div>
              ))}
              {auditLogs.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No audit logs generated yet.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
}

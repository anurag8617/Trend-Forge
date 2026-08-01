import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { typography } from '../lib/tokens';
import { useAppState } from '../state/AppContext';

export default function Settings() {
  const { auditLogs } = useAppState();
  const [activeTab, setActiveTab] = useState<'audit' | 'access' | 'apikeys' | 'engine'>('audit');

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto pt-4 pb-12">
      
      {/* Header */}
      <div className="mb-8 border-b border-border pb-6">
        <h2 className={`${typography.microLabel} ${typography.textSecondary} mb-2`}>Administration</h2>
        <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">System Settings & Configuration</h1>
        <p className={`${typography.textTertiary} mt-2 text-sm`}>
          Manage workspace configuration, API access, and review immutable system execution logs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 h-full">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-x-visible">
          {[
            { id: 'audit', label: 'Audit Trail' },
            { id: 'access', label: 'Access Control' },
            { id: 'apikeys', label: 'API Keys' },
            { id: 'engine', label: 'Engine Config' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap text-left px-4 py-2 border-l-2 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-surface/50 border-cyan-400 text-white'
                  : 'border-transparent text-gray-500 hover:text-white hover:bg-surface/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-background border border-border rounded-xl overflow-hidden shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {activeTab === 'audit' && (
              <motion.div 
                key="audit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full"
              >
                <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface/20">
                  <h3 className="text-white font-medium text-sm">Execution Audit Log</h3>
                  <button className="text-cyan-400 hover:text-cyan-300 text-xs uppercase tracking-wider transition-colors cursor-pointer">
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
              </motion.div>
            )}

            {activeTab === 'access' && (
              <motion.div 
                key="access"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">Role-Based Access</h3>
                  <button className="bg-accent text-white px-6 py-1.5 rounded text-sm font-semibold border border-accent/20 hover:text-cyan-400 hover:bg-border transition-all cursor-pointer">
                    + INVITATION
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'SysAdmin Alpha', role: 'Superadmin', status: 'Active' },
                    { name: 'Analyst Zeta', role: 'Read-Only', status: 'Pending' },
                    { name: 'Execution Bot', role: 'Write-Access', status: 'Active' }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border/50 rounded bg-surface/30">
                      <div>
                        <p className="text-white text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs px-2 py-0.5 rounded ${user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                          {user.status}
                        </span>
                        <button className="text-gray-500 hover:text-danger text-xs transition-colors cursor-pointer">Revoke</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'apikeys' && (
              <motion.div 
                key="apikeys"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-sm">API Integration Keys</h3>
                  <button className="bg-accent text-white px-6 py-1.5 rounded text-sm font-semibold border border-accent/20 hover:text-cyan-400 hover:bg-border transition-all cursor-pointer">
                    GENERATE KEY
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-6">Use these keys to authenticate external bidding platforms or data ingestion hooks.</p>

                <div className="flex flex-col gap-4">
                  {[
                    { name: 'HoloBidder Production', key: 'trdf_live_*******************892x', created: '2 days ago' },
                    { name: 'Local Test Hook', key: 'trdf_test_*******************abc1', created: '1 week ago' }
                  ].map((apikey, i) => (
                    <div key={i} className="p-4 border border-border/50 rounded bg-surface/30">
                      <div className="flex justify-between mb-2">
                        <p className="text-white text-sm">{apikey.name}</p>
                        <span className="text-xs text-gray-500">{apikey.created}</span>
                      </div>
                      <div className="flex justify-between items-center bg-background p-2 rounded border border-border/50">
                        <code className="text-cyan-300 text-xs font-mono">{apikey.key}</code>
                        <div className="flex gap-2">
                          <button className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">Copy</button>
                          <button className="text-xs text-gray-400 hover:text-danger cursor-pointer transition-colors">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'engine' && (
              <motion.div 
                key="engine"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full p-6 overflow-y-auto"
              >
                <h3 className="text-white font-medium text-sm mb-6">Core Engine Parameters</h3>
                
                <div className="space-y-8">
                  {/* Setting 1 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-200">Ghost Mode Sensitivity</label>
                      <span className="text-xs text-accent">0.85</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Adjust the threshold for anomaly detection. Higher values flag smaller deviations.</p>
                    <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer" />
                  </div>

                  {/* Setting 2 */} 
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-200">Execution Bidding Cap</label>
                      <span className="text-xs text-accent">10,000 Credits</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Maximum automated spend per trend cycle before requiring manual approval.</p>
                    <select className="w-full bg-surface/50 border border-border text-white text-sm rounded p-2 focus:border-accent outline-none cursor-pointer">
                      <option>1,000 Credits</option>
                      <option>5,000 Credits</option>
                      <option selected>10,000 Credits</option>
                      <option>Unlimited (Requires Admin)</option>
                    </select>
                  </div>

                  {/* Setting 3 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-200">DisinfoDefender Auto-Reject</label>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Automatically reject networks scoring below the purity threshold.</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-background rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </div>
                      <span className="text-xs text-white">Enabled</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-8 flex justify-end">
                  <button className="bg-accent text-white px-6 py-2 rounded text-sm font-semibold border border-accent/20 hover:text-cyan-400 hover:bg-border transition-all cursor-pointer">
                    SAVE CONFIGURATION
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>
    </div>
  );
}

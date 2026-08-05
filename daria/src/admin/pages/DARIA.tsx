import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SecondaryNavigation, SplitButton,
  SeverityPill, JSONViewer
} from '../components/ui';

export default function Daria() {
  const [activeView, setActiveView] = useState('Overview');
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>('cnv-8a9f2bc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'id', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navItems = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Conversation Monitor', label: 'Conversations' },
    { id: 'Prompt Management', label: 'Prompt Management' },
    { id: 'Memory Center', label: 'Memory Center' },
    { id: 'Knowledge Sources', label: 'Knowledge Sources' },
    { id: 'Voice Operations', label: 'Voice Operations' },
    { id: 'Model Configuration', label: 'Model Configuration' },
    { id: 'Safety Center', label: 'Safety Center' },
    { id: 'Guardrails', label: 'Guardrails' },
    { id: 'Model Evaluations', label: 'Model Evaluations' },
    { id: 'Deployments', label: 'Deployments' },
    { id: 'Experiments', label: 'Experiments' },
  ];

  const conversations = [
    { id: 'cnv-8a9f2bc', tenant: 'Acme Corp', user: 'j.smith', duration: '14m', messages: 24, engine: 'Ghost Mode', status: 'Active', created: '10m ago' },
    { id: 'cnv-9b2c1de', tenant: 'Nexus Trading', user: 's.chen', duration: '2m', messages: 4, engine: 'Quantum Guess', status: 'Ended', created: '1h ago' },
    { id: 'cnv-3f4g5hj', tenant: 'Global Media', user: 'm.cole', duration: '45m', messages: 112, engine: 'Standard', status: 'Flagged', created: '2h ago' },
    { id: 'cnv-7k8l9z0', tenant: 'Acme Corp', user: 'e.vance', duration: '1m', messages: 2, engine: 'Standard', status: 'Ended', created: '5h ago' },
  ];

  const activityEvents = [
    { time: '10:45 AM', user: 'system', action: 'SAFETY', detail: 'Blocked prompt due to PII detection in cnv-3f4g5hj' },
    { time: '10:12 AM', user: 'a.turing', action: 'DEPLOY', detail: 'Deployed DARIA Persona v4.2.1 to Production' },
    { time: '09:30 AM', user: 'system', action: 'MEMORY', detail: 'Garbage collection completed. 1.2M short-term memories archived.' },
  ];

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedConversations = useMemo(() => {
    // 1. Search Filter
    let result = conversations.filter(cnv => 
      cnv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cnv.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cnv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cnv.engine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cnv.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [conversations, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedConversations.length / itemsPerPage);
  const paginatedConversations = processedConversations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedConversation = conversations.find(c => c.id === selectedConvoId) || conversations[0];

  // --- HANDLERS ---
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === paginatedConversations.length ? [] : paginatedConversations.map(c => c.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT SIDEBAR - Secondary Navigation */}
      <SecondaryNavigation items={navItems} activeItem={activeView} onChange={setActiveView} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col min-w-0">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'DARIA Operations' }, { label: activeView }]} />
          <div className="flex justify-between items-end mt-4 mb-6 pb-4 border-b border-border">
            <div>
              <h1 className="text-2xl font-bold text-text mb-2">{activeView}</h1>
              {activeView !== 'Overview' && (
                <div className="flex space-x-3 items-center">
                  <StatusBadge status="Running" />
                  <span className="text-xs font-mono text-muted">Model: GPT-4o-TrendForge-Custom</span>
                  <span className="text-xs font-mono text-muted">Env: Production</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <SecondaryButton disabled>Sync</SecondaryButton>
              <SplitButton mainAction="Lockdown DARIA" secondaryAction={null} />
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex-1">
          
          {activeView === 'Overview' && (
            <div className="space-y-6">
              <AdminCard className="p-6 bg-[#0a0f1c] border-primary/20 shadow-[0_0_20px_rgba(38,231,255,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-text mb-1">DARIA AI Core Operational</h2>
                    <p className="text-sm text-primary font-mono">GPT-4o-TrendForge-Custom (v4.2.1)</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Availability</div>
                    <div className="text-2xl font-bold text-success">99.995%</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 border-t border-border pt-6">
                  <KPIBlock label="Environment" value="Production" />
                  <KPIBlock label="Status" value="Active" />
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Response</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Memory</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Knowledge</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Voice</span><HealthIndicator status="Healthy" /></div>
                </div>
              </AdminCard>

              <StatGrid>
                <MetricCard title="Avg Response Time" value="840ms" />
                <MetricCard title="Token Usage (24h)" value="142.4M" />
                <MetricCard title="Memory Usage" value="12.4 TB" />
                <MetricCard title="Active Sessions" value="4,821" />
              </StatGrid>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <AdminCard className="p-6 bg-card">
                   <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Linked Services</h4>
                   <ul className="text-sm text-primary space-y-2">
                     <li className="cursor-pointer hover:underline">Tool: Ghost Mode Executor</li>
                     <li className="cursor-pointer hover:underline">Tool: Quantum Query</li>
                     <li className="cursor-pointer hover:underline">API: Knowledge Retrieval</li>
                   </ul>
                 </AdminCard>
                 <AdminCard className="p-6 bg-warning/5 border-warning/30">
                   <h4 className="text-sm font-bold text-warning uppercase mb-4">System Warnings</h4>
                   <p className="text-sm text-textSecondary">High token usage detected in tenant tnt_gms44 over the last 10 minutes. Throttle engaged.</p>
                 </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Conversation Monitor' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Conversation Queue</h3>
                  </div>

                  {/* REAL SEARCH & TOOLBAR */}
                  <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
                    <div className="relative w-full sm:w-72">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search conversations, tenants, users..." 
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to page 1 on search
                        }}
                        className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded text-sm text-text focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <select className="bg-background border border-border text-text text-sm rounded px-3 py-2 focus:outline-none focus:border-primary">
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="flagged">Flagged</option>
                        <option value="ended">Ended</option>
                      </select>
                      <SecondaryButton>Export</SecondaryButton>
                    </div>
                  </div>

                  {selectedRows.length > 0 && (
                    <BulkActionBar 
                      selectedCount={selectedRows.length} 
                      actions={<><DangerButton className="py-1">Kill Selected Sessions</DangerButton><SecondaryButton className="py-1">Export Logs</SecondaryButton></>} 
                    />
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                        <tr>
                          <th className="px-4 py-3 w-10">
                            <RowSelectionCheckbox 
                              checked={selectedRows.length === paginatedConversations.length && paginatedConversations.length > 0} 
                              onChange={handleSelectAll} 
                            />
                          </th>
                          {/* REAL SORT HEADERS */}
                          {[
                            { key: 'id', label: 'Conversation ID' },
                            { key: 'tenant', label: 'Tenant / User' },
                            { key: 'engine', label: 'Engine' },
                            { key: 'status', label: 'Status' },
                            { key: 'messages', label: 'Messages' }
                          ].map(col => (
                            <th key={col.key} className="px-4 py-3 cursor-pointer hover:text-text transition-colors select-none" onClick={() => handleSort(col.key)}>
                              <div className="flex items-center space-x-1">
                                <span>{col.label}</span>
                                {sortConfig.key === col.key && (
                                  <span className="text-primary">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm bg-background">
                        {paginatedConversations.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-textSecondary">No conversations found matching your search.</td>
                          </tr>
                        ) : (
                          paginatedConversations.map(cnv => (
                            <tr 
                              key={cnv.id} 
                              className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedConvoId === cnv.id ? 'bg-primary/5' : ''}`}
                              onClick={() => setSelectedConvoId(cnv.id)}
                            >
                              <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                                <RowSelectionCheckbox checked={selectedRows.includes(cnv.id)} onChange={() => handleSelectRow(cnv.id)} />
                              </td>
                              <td className="px-4 py-3 font-mono text-primary font-medium">{cnv.id}</td>
                              <td className="px-4 py-3"><span className="font-medium text-text">{cnv.tenant}</span><span className="block text-xs text-muted">{cnv.user}</span></td>
                              <td className="px-4 py-3 text-textSecondary">{cnv.engine}</td>
                              <td className="px-4 py-3">
                                <StatusBadge 
                                  status={cnv.status === 'Active' ? 'Success' : cnv.status === 'Flagged' ? 'Critical' : 'Pending'} 
                                  label={cnv.status} 
                                />
                              </td>
                              <td className="px-4 py-3 text-muted">{cnv.messages}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* REAL PAGINATION */}
                  <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
                    <span className="text-textSecondary">
                      Showing <span className="font-medium text-text">{paginatedConversations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedConversations.length)}</span> of <span className="font-medium text-text">{processedConversations.length}</span> results
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-border rounded bg-background text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                      >
                        Previous
                      </button>
                      <div className="flex items-center px-2 space-x-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-7 h-7 flex items-center justify-center rounded ${currentPage === i + 1 ? 'bg-primary text-background font-medium' : 'text-text hover:bg-surface'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1 border border-border rounded bg-background text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </AdminCard>
              </div>

              {/* Conversation Detail Inspector */}
              <div className="w-full lg:w-[400px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <div className="flex justify-between items-start border-b border-border pb-3 mb-4">
                     <div>
                       <h4 className="text-sm font-semibold text-text">Session Inspector</h4>
                       <span className="text-xs font-mono text-primary">{selectedConversation.id}</span>
                     </div>
                     <DangerButton className="text-xs py-1 px-2" disabled>Kill Session</DangerButton>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Duration:</span><span>{selectedConversation.duration}</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Memory Access:</span><span className="text-success">Enabled</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Knowledge Retrieval:</span><span className="text-success">2 Docs</span></div>
                     
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[10:00:01] User: "Analyze market shift"</div>
                          <div>[10:00:02] ToolCall: get_forecast(vix)</div>
                          <div>[10:00:04] ToolResponse: 200 OK</div>
                          <div className="text-primary">[10:00:05] DARIA: "Based on the recent..."</div>
                       </div>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Prompt Management' && (
            <div className="space-y-6">
              {[
                { name: 'System Prompt', version: 'v4.2.1', updated: '10m ago', status: 'Active' },
                { name: 'Persona Prompt', version: 'v4.2.1', updated: '10m ago', status: 'Active' },
                { name: 'Tool Prompt (Ghost Mode)', version: 'v2.1.0', updated: '3d ago', status: 'Active' },
                { name: 'Evaluation Prompt', version: 'v1.4.0', updated: '1w ago', status: 'Active' },
              ].map(prompt => (
                <AdminCard key={prompt.name} className="p-4 bg-card border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-bold text-text text-lg">{prompt.name}</h3>
                       <div className="flex space-x-3 text-xs font-mono text-muted mt-1">
                          <span>{prompt.version}</span>
                          <span>Updated {prompt.updated}</span>
                       </div>
                    </div>
                    <div className="flex space-x-2">
                       <SecondaryButton className="text-xs" disabled>Rollback</SecondaryButton>
                       <SecondaryButton className="text-xs" disabled>Publish</SecondaryButton>
                    </div>
                  </div>
                  <div className="bg-surface border border-border rounded p-3 text-xs font-mono text-textSecondary opacity-70">
                    Prompt content editor placeholder. System instructions dictate DARIA's core behavior, ethical constraints, and operational guidelines.
                  </div>
                </AdminCard>
              ))}
            </div>
          )}

          {activeView === 'Memory Center' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'Short Term Memory', type: 'Session', usage: '4.2 GB', status: 'Active' },
                 { name: 'Long Term Memory', type: 'Tenant', usage: '8.4 TB', status: 'Active' },
                 { name: 'Shared Knowledge Cache', type: 'Global', usage: '1.2 TB', status: 'Active' },
                 { name: 'Entity Resolution Index', type: 'Graph', usage: '412 GB', status: 'Building' },
               ].map(mem => (
                 <AdminCard key={mem.name} className="p-4">
                    <h4 className="font-bold text-text mb-2">{mem.name}</h4>
                    <div className="flex justify-between text-xs text-textSecondary mb-4">
                      <span>Type: <span className="font-mono text-text">{mem.type}</span></span>
                      <span>Usage: <span className="font-mono text-text">{mem.usage}</span></span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                       <StatusBadge status={mem.status === 'Active' ? 'Success' : 'Warning'} label={mem.status} />
                       <SecondaryButton className="text-xs py-1" disabled>Flush Cache</SecondaryButton>
                    </div>
                 </AdminCard>
               ))}
            </div>
          )}

          {activeView === 'Knowledge Sources' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Indexed Documents" value="14.2M" />
                <MetricCard title="Evidence Packs" value="4,241" />
                <MetricCard title="External Integrations" value="12 Active" />
              </StatGrid>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Signals Knowledgebase', 'Forecast Models', 'Internal Guidelines', 'Tenant Data Isolation Layer'].map(src => (
                  <AdminCard key={src} className="p-4 flex justify-between items-center bg-card">
                    <div>
                      <h4 className="font-semibold text-text">{src}</h4>
                      <p className="text-xs text-muted">Vector Database Synced</p>
                    </div>
                    <div className="text-right">
                       <StatusBadge status="Success" label="Healthy" />
                       <div className="text-xs text-muted mt-1">Last Sync: Just now</div>
                    </div>
                  </AdminCard>
                ))}
              </div>
            </div>
          )}

          {activeView === 'Model Configuration' && (
            <AdminCard className="p-6">
               <SectionHeader title="LLM Hyperparameters" />
               <div className="grid grid-cols-2 gap-6 mt-4 opacity-70">
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Model Provider</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="OpenAI / Azure" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Model Name</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="gpt-4o-2024-05-13" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Temperature</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.2" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Max Tokens</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="4096" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Top P</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.95" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Frequency Penalty</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.0" /></div>
               </div>
            </AdminCard>
          )}

          {activeView === 'Safety Center' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Moderation Blocks" value="412" isPositive={false} change="High" />
                <MetricCard title="Sensitive Requests" value="1,241" />
                <MetricCard title="Escalations" value="12" />
                <MetricCard title="Policy Version" value="v2.4 (Strict)" />
              </StatGrid>
              <AdminCard className="p-4 border-danger/30 bg-danger/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="Critical" />
                  <span className="text-xs font-mono text-muted">SEC-EVT-104</span>
                </div>
                <h4 className="font-bold text-danger mb-1">PII Leak Prevention Triggered</h4>
                <p className="text-xs text-textSecondary mb-4">Output filter blocked DARIA from emitting internal tenant UUIDs to a low-privileged session.</p>
              </AdminCard>
            </div>
          )}

          {activeView === 'Voice Operations' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <StatGrid>
                  <MetricCard title="Active Voice Sessions" value="24" />
                  <MetricCard title="Avg Latency" value="142ms" />
                  <MetricCard title="ASR Accuracy" value="98.5%" />
                  <MetricCard title="TTS Requests/min" value="1,204" />
                </StatGrid>
                
                <AdminCard className="p-4">
                  <SectionHeader title="Voice Models & Pipeline" />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-surface p-3 border border-border rounded flex justify-between items-center">
                      <div>
                        <div className="text-sm font-semibold text-text">Speech Recognition (ASR)</div>
                        <div className="text-xs text-muted font-mono">Whisper-v3-Turbo</div>
                      </div>
                      <HealthIndicator status="Healthy" />
                    </div>
                    <div className="bg-surface p-3 border border-border rounded flex justify-between items-center">
                      <div>
                        <div className="text-sm font-semibold text-text">Text-to-Speech (TTS)</div>
                        <div className="text-xs text-muted font-mono">ElevenLabs / Nova</div>
                      </div>
                      <HealthIndicator status="Healthy" />
                    </div>
                  </div>
                </AdminCard>

                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Active Streaming Sessions</h3>
                    <SecondaryButton className="text-xs py-1">View Audio Logs</SecondaryButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                        <tr>
                          <th className="px-4 py-3">Session ID</th>
                          <th className="px-4 py-3">Language</th>
                          <th className="px-4 py-3">Provider</th>
                          <th className="px-4 py-3">Quality/MOS</th>
                          <th className="px-4 py-3">Latency</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">vs-1a2b3c</td>
                          <td className="px-4 py-3">en-US</td>
                          <td className="px-4 py-3">OpenAI</td>
                          <td className="px-4 py-3">4.8</td>
                          <td className="px-4 py-3">120ms</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Streaming" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">vs-4d5e6f</td>
                          <td className="px-4 py-3">es-ES</td>
                          <td className="px-4 py-3">ElevenLabs</td>
                          <td className="px-4 py-3">4.5</td>
                          <td className="px-4 py-3">160ms</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Streaming" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AdminCard>
              </div>

              {/* Voice Inspector */}
              <div className="w-full lg:w-[300px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold text-text border-b border-border pb-3 mb-4">Voice Inspector</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Model:</span><span>Whisper-v3</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Provider:</span><span>Azure</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Rate Limit:</span><span className="text-success">25% Used</span></div>
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Voice Events Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[10:12:01] Auth: vs-1a2b3c</div>
                          <div>[10:12:02] VAD: Speech Detected</div>
                          <div>[10:12:03] ASR: "How's the market?"</div>
                          <div className="text-primary">[10:12:04] TTS: Generating...</div>
                       </div>
                     </div>
                     <div className="mt-4 flex gap-2">
                        <DangerButton className="flex-1 text-xs py-1">Kill Stream</DangerButton>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Guardrails' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <StatGrid>
                  <MetricCard title="Policy Violations (24h)" value="12" isPositive={false} change="+2" />
                  <MetricCard title="Blocked Prompts" value="45" />
                  <MetricCard title="Tenant Restrictions" value="124" />
                  <MetricCard title="Active Rules" value="86" />
                </StatGrid>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminCard className="p-4 border-l-4 border-l-warning">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-text">Prompt Guardrails</h4>
                      <StatusBadge status="Warning" label="Strict Mode" />
                    </div>
                    <p className="text-xs text-textSecondary mb-4">Filters incoming prompts for PII, injection attempts, and restricted topics.</p>
                    <div className="flex justify-between text-xs font-mono text-muted border-t border-border pt-2">
                      <span>Triggered: 45 times</span>
                      <span className="text-primary cursor-pointer hover:underline">Configure</span>
                    </div>
                  </AdminCard>
                  
                  <AdminCard className="p-4 border-l-4 border-l-primary">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-text">Output Guardrails</h4>
                      <StatusBadge status="Success" label="Active" />
                    </div>
                    <p className="text-xs text-textSecondary mb-4">Scans generation for hallucinations, unauthorized commitments, and formatting.</p>
                    <div className="flex justify-between text-xs font-mono text-muted border-t border-border pt-2">
                      <span>Triggered: 12 times</span>
                      <span className="text-primary cursor-pointer hover:underline">Configure</span>
                    </div>
                  </AdminCard>

                  <AdminCard className="p-4 border-l-4 border-l-success">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-text">Memory & Knowledge Restrictions</h4>
                      <StatusBadge status="Success" label="Active" />
                    </div>
                    <p className="text-xs text-textSecondary mb-4">Enforces tenant boundaries and access control on RAG data and session memory.</p>
                    <div className="flex justify-between text-xs font-mono text-muted border-t border-border pt-2">
                      <span>0 Violations</span>
                      <span className="text-primary cursor-pointer hover:underline">Configure</span>
                    </div>
                  </AdminCard>

                  <AdminCard className="p-4 border-l-4 border-l-success">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-text">Tool Restrictions</h4>
                      <StatusBadge status="Success" label="Active" />
                    </div>
                    <p className="text-xs text-textSecondary mb-4">Validates arguments and limits permissions for external API and DB tools.</p>
                    <div className="flex justify-between text-xs font-mono text-muted border-t border-border pt-2">
                      <span>0 Violations</span>
                      <span className="text-primary cursor-pointer hover:underline">Configure</span>
                    </div>
                  </AdminCard>
                </div>
              </div>

              {/* Guardrail Inspector */}
              <div className="w-full lg:w-[300px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold text-text border-b border-border pb-3 mb-4">Guardrail Inspector</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-xs text-textSecondary"><span className="font-bold">Recent Trigger:</span><SeverityPill level="Critical" /></div>
                     <div className="text-xs text-muted mb-2">Policy: <span className="text-text font-mono">Anti-Injection</span></div>
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Guardrail Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[10:14] Tenant: Acme</div>
                          <div>[10:14] Prompt: "Ignore previous instructions..."</div>
                          <div className="text-danger">[10:14] BLOCK: Injection Score 0.98</div>
                          <div>[10:14] Action: Session Terminated</div>
                       </div>
                     </div>
                     <div className="mt-4">
                        <SecondaryButton className="w-full text-xs py-1">View Safety Rules</SecondaryButton>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Model Evaluations' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <StatGrid>
                  <MetricCard title="Avg Accuracy" value="94.2%" />
                  <MetricCard title="Regression Tests" value="100% Pass" />
                  <MetricCard title="Tool Success Rate" value="99.1%" />
                  <MetricCard title="Failed Evaluations" value="2" isPositive={false} />
                </StatGrid>
                
                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Evaluation Runs & Benchmarks</h3>
                    <PrimaryButton className="text-xs py-1">Run New Eval</PrimaryButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                        <tr>
                          <th className="px-4 py-3">Run ID</th>
                          <th className="px-4 py-3">Dataset</th>
                          <th className="px-4 py-3">Accuracy</th>
                          <th className="px-4 py-3">Latency</th>
                          <th className="px-4 py-3">Prompt Quality</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">eval-8x92</td>
                          <td className="px-4 py-3">Finance-Q3</td>
                          <td className="px-4 py-3 text-success">96.5%</td>
                          <td className="px-4 py-3">820ms</td>
                          <td className="px-4 py-3">High</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Passed" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">eval-7y11</td>
                          <td className="px-4 py-3">Knowledge-Base-V2</td>
                          <td className="px-4 py-3 text-warning">88.2%</td>
                          <td className="px-4 py-3">1100ms</td>
                          <td className="px-4 py-3">Medium</td>
                          <td className="px-4 py-3"><StatusBadge status="Warning" label="Degraded" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">eval-6z44</td>
                          <td className="px-4 py-3">Tool-Execution-Core</td>
                          <td className="px-4 py-3 text-danger">75.0%</td>
                          <td className="px-4 py-3">950ms</td>
                          <td className="px-4 py-3">Low</td>
                          <td className="px-4 py-3"><StatusBadge status="Critical" label="Failed" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AdminCard>
              </div>

              {/* Evaluation Inspector */}
              <div className="w-full lg:w-[300px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold text-text border-b border-border pb-3 mb-4">Evaluation Inspector</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Selected:</span><span className="font-mono text-primary">eval-6z44</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Dataset Size:</span><span>5,000 queries</span></div>
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Evaluation History</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[09:00] Started run</div>
                          <div>[09:15] Tool execution check</div>
                          <div className="text-danger">[09:20] Regression in get_weather()</div>
                          <div>[09:30] Completed (75%)</div>
                       </div>
                     </div>
                     <div className="mt-4">
                        <SecondaryButton className="w-full text-xs py-1">View Detailed Report</SecondaryButton>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Deployments' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <StatGrid>
                  <MetricCard title="Current Deployment" value="v4.2.1" />
                  <MetricCard title="Uptime" value="14d 6h" />
                  <MetricCard title="Canary Traffic" value="5%" />
                  <MetricCard title="Rollbacks (30d)" value="0" />
                </StatGrid>

                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Version History & Environments</h3>
                    <PrimaryButton className="text-xs py-1">Deploy New Version</PrimaryButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                        <tr>
                          <th className="px-4 py-3">Version</th>
                          <th className="px-4 py-3">Environment</th>
                          <th className="px-4 py-3">Traffic</th>
                          <th className="px-4 py-3">Deployed By</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary font-bold">v4.2.1</td>
                          <td className="px-4 py-3">Production</td>
                          <td className="px-4 py-3">95%</td>
                          <td className="px-4 py-3 text-muted">system/auto</td>
                          <td className="px-4 py-3 text-muted">2 days ago</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Active" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors bg-primary/5">
                          <td className="px-4 py-3 font-mono text-primary font-bold">v4.3.0-rc1</td>
                          <td className="px-4 py-3">Canary</td>
                          <td className="px-4 py-3">5%</td>
                          <td className="px-4 py-3 text-muted">a.turing</td>
                          <td className="px-4 py-3 text-muted">4 hours ago</td>
                          <td className="px-4 py-3"><StatusBadge status="Pending" label="Evaluating" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-muted">v4.2.0</td>
                          <td className="px-4 py-3">Staging</td>
                          <td className="px-4 py-3">0%</td>
                          <td className="px-4 py-3 text-muted">m.curie</td>
                          <td className="px-4 py-3 text-muted">15 days ago</td>
                          <td className="px-4 py-3"><StatusBadge status="Warning" label="Inactive" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AdminCard>
              </div>

              {/* Deployment Inspector */}
              <div className="w-full lg:w-[300px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold text-text border-b border-border pb-3 mb-4">Deployment Inspector</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Version:</span><span className="font-mono text-primary">v4.3.0-rc1</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Approval Status:</span><span className="text-success">Approved</span></div>
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Deployment Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[14:00] Build triggered</div>
                          <div>[14:05] Tests passed</div>
                          <div>[14:15] Deployed to Canary</div>
                          <div className="text-primary">[14:20] Monitoring metrics...</div>
                       </div>
                     </div>
                     <div className="mt-4 flex gap-2">
                        <SecondaryButton className="flex-1 text-xs py-1">Rollback</SecondaryButton>
                        <PrimaryButton className="flex-1 text-xs py-1">Promote</PrimaryButton>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Experiments' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <StatGrid>
                  <MetricCard title="Active Experiments" value="3" />
                  <MetricCard title="Total Variants" value="8" />
                  <MetricCard title="Traffic Allocated" value="20%" />
                  <MetricCard title="Recent Results" value="1 Winner" />
                </StatGrid>

                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">A/B Tests & Prompt Experiments</h3>
                    <PrimaryButton className="text-xs py-1">Create Experiment</PrimaryButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                        <tr>
                          <th className="px-4 py-3">Experiment ID</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Traffic</th>
                          <th className="px-4 py-3">Success Metrics</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">exp-prompt-tone</td>
                          <td className="px-4 py-3">Prompt</td>
                          <td className="px-4 py-3">10%</td>
                          <td className="px-4 py-3">+4% User Retention</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Running" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-primary">exp-model-temp</td>
                          <td className="px-4 py-3">Model Config</td>
                          <td className="px-4 py-3">5%</td>
                          <td className="px-4 py-3">TBD</td>
                          <td className="px-4 py-3"><StatusBadge status="Pending" label="Gathering Data" /></td>
                        </tr>
                        <tr className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-muted">exp-rag-weights</td>
                          <td className="px-4 py-3">Algorithm</td>
                          <td className="px-4 py-3">100%</td>
                          <td className="px-4 py-3 text-success">+15% Accuracy</td>
                          <td className="px-4 py-3"><StatusBadge status="Success" label="Concluded" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AdminCard>
              </div>

              {/* Experiment Inspector */}
              <div className="w-full lg:w-[300px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold text-text border-b border-border pb-3 mb-4">Experiment Inspector</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Experiment:</span><span className="font-mono text-primary">exp-prompt-tone</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Variants:</span><span>A (Control), B (Polite)</span></div>
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Experiment Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[Oct 12] Experiment started</div>
                          <div>[Oct 13] Variant B +2% CTR</div>
                          <div>[Oct 14] Variant B +4% Ret.</div>
                          <div className="text-success">[Oct 15] Statistically Significant</div>
                       </div>
                     </div>
                     <div className="mt-4 flex gap-2">
                        <SecondaryButton className="flex-1 text-xs py-1">Stop</SecondaryButton>
                        <PrimaryButton className="flex-1 text-xs py-1">Apply Winner</PrimaryButton>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="DARIA Global Audit Timeline" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="System Prompt Updates" value="1 (Last 24h)" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Safety Events" value="142" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
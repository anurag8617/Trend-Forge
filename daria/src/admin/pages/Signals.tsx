import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, SeverityPill,
  PrimaryButton, SecondaryButton, DangerButton, SplitButton, KPIBlock,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid
} from '../components/ui';

export default function Signals() {
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>('sig-9021');
  const [activeTab, setActiveTab] = useState('Metadata');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'id', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set to 3 to demonstrate pagination with mock data

  const signals = [
    { id: 'sig-9021', source: 'Telegram Feed (RU)', category: 'Geopolitics', priority: 'High', velocity: '4.2k/hr', confidence: '84%', status: 'Pending Review', created: '10m ago', analyst: 'e.vance' },
    { id: 'sig-9022', source: 'X / Twitter Core', category: 'Finance', priority: 'Critical', velocity: '12.1k/hr', confidence: '92%', status: 'Escalated', created: '32m ago', analyst: 'm.cole' },
    { id: 'sig-9023', source: 'Reddit Sub-tier', category: 'Tech', priority: 'Medium', velocity: '800/hr', confidence: '45%', status: 'Validated', created: '2h ago', analyst: 's.chen' },
    { id: 'sig-9024', source: 'Darkweb Forum B', category: 'Security', priority: 'High', velocity: '120/hr', confidence: '71%', status: 'Processing', created: '4h ago', analyst: 'Auto' },
  ];

  const tabs = [
    { id: 'Metadata', label: 'Signal Details' },
    { id: 'Evidence', label: 'Evidence Viewer' },
    { id: 'Pipeline', label: 'Processing Pipeline' },
  ];

  const activityEvents = [
    { time: '10:45 AM', user: 'e.vance', action: 'APPROVE', detail: 'Signal sig-9023 marked as Validated' },
    { time: '10:12 AM', user: 'm.cole', action: 'ESCALATE', detail: 'Signal sig-9022 flagged for ML review' },
    { time: '09:30 AM', user: 'system', action: 'MERGE', detail: 'Merged sig-9018 into sig-9019' },
  ];

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedSignals = useMemo(() => {
    // 1. Search Filter
    let result = signals.filter(sig => 
      sig.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.analyst.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [signals, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedSignals.length / itemsPerPage);
  const paginatedSignals = processedSignals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedSignal = signals.find(s => s.id === selectedSignalId) || signals[0];

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
    setSelectedRows(selectedRows.length === paginatedSignals.length ? [] : paginatedSignals.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Intelligence Operations' }, { label: 'Signals Queue' }]} />
          <PageHeader 
            title="Signal Review Center" 
            subtitle="Analyze, validate, and orchestrate raw intelligence signals before publishing to tenant streams." 
            action={<PrimaryButton>Force Sync Pipeline</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6 flex-1">
          {/* Signal Queue */}
          <AdminCard>
            <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Incoming Signal Queue</h3>
            </div>
            
            {/* REAL SEARCH & TOOLBAR */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search signals, sources, analysts..." 
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
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
                <SecondaryButton>Export</SecondaryButton>
              </div>
            </div>
            
            {selectedRows.length > 0 && (
              <BulkActionBar 
                selectedCount={selectedRows.length} 
                actions={<><SecondaryButton className="py-1">Bulk Approve</SecondaryButton><DangerButton className="py-1">Reject Selected</DangerButton></>} 
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <RowSelectionCheckbox 
                        checked={selectedRows.length === paginatedSignals.length && paginatedSignals.length > 0} 
                        onChange={handleSelectAll} 
                      />
                    </th>
                    {/* REAL SORT HEADERS */}
                    {[
                      { key: 'id', label: 'Signal ID' },
                      { key: 'source', label: 'Source' },
                      { key: 'category', label: 'Category' },
                      { key: 'priority', label: 'Priority' },
                      { key: 'velocity', label: 'Velocity' },
                      { key: 'confidence', label: 'Confidence' },
                      { key: 'status', label: 'Status' },
                      { key: 'analyst', label: 'Analyst' }
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
                  {paginatedSignals.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-textSecondary">No signals found matching your search.</td>
                    </tr>
                  ) : (
                    paginatedSignals.map(sig => (
                      <tr 
                        key={sig.id} 
                        className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedSignalId === sig.id ? 'bg-primary/5' : ''}`}
                        onClick={() => setSelectedSignalId(sig.id)}
                      >
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <RowSelectionCheckbox checked={selectedRows.includes(sig.id)} onChange={() => handleSelectRow(sig.id)} />
                        </td>
                        <td className="px-4 py-3 font-mono text-primary font-medium">{sig.id}</td>
                        <td className="px-4 py-3 text-text">{sig.source}</td>
                        <td className="px-4 py-3 text-textSecondary">{sig.category}</td>
                        <td className="px-4 py-3"><SeverityPill level={sig.priority as any} /></td>
                        <td className="px-4 py-3 font-mono text-muted">{sig.velocity}</td>
                        <td className="px-4 py-3 font-mono text-muted">{sig.confidence}</td>
                        <td className="px-4 py-3"><StatusBadge status={sig.status === 'Validated' ? 'Success' : sig.status === 'Escalated' ? 'Warning' : 'Pending'} label={sig.status} /></td>
                        <td className="px-4 py-3 text-textSecondary">{sig.analyst}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* REAL PAGINATION */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
              <span className="text-textSecondary">
                Showing <span className="font-medium text-text">{paginatedSignals.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedSignals.length)}</span> of <span className="font-medium text-text">{processedSignals.length}</span> results
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

          {/* Detailed Workspace */}
          {selectedSignal && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                    Signal Review: <span className="ml-2 font-mono text-primary">{selectedSignal.id}</span>
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Origin: {selectedSignal.source}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Created: {selectedSignal.created}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Split</SecondaryButton>
                  <SecondaryButton disabled>Merge</SecondaryButton>
                  <SecondaryButton disabled>Escalate</SecondaryButton>
                  <SplitButton mainAction="Approve Signal" secondaryAction={null} />
                  <DangerButton disabled>Reject</DangerButton>
                </div>
              </div>

              <div className="px-6 pt-2 bg-surface">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                
                {activeTab === 'Metadata' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Signal Category" value={selectedSignal.category} /></AdminCard>
                    <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Calculated Confidence" value={selectedSignal.confidence} /></AdminCard>
                    <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Ingestion Velocity" value={selectedSignal.velocity} /></AdminCard>
                    <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Assigned Analyst" value={selectedSignal.analyst} /></AdminCard>
                    <div className="col-span-full mt-4">
                       <h4 className="text-sm font-semibold text-text mb-2">Raw Metadata Summary</h4>
                       <pre className="bg-[#0A0F1C] border border-border p-4 rounded text-xs font-mono text-textSecondary overflow-x-auto">
{`{
  "signal_hash": "a8f93...2bc",
  "topic_cluster": "macro_economic_shift",
  "geo_origin": "EMEA",
  "language_distribution": {"en": 0.6, "ru": 0.3, "fr": 0.1},
  "anomaly_score": 0.942
}`}
                       </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'Evidence' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AdminCard className="p-4 border-primary/30">
                         <h4 className="text-sm font-semibold text-text mb-3">Supporting Evidence</h4>
                         <ul className="text-xs text-textSecondary space-y-2">
                           <li className="flex justify-between items-center bg-surface p-2 rounded border border-border"><span>Financial Times Article Mention</span> <span className="text-success font-medium">High Reliability</span></li>
                           <li className="flex justify-between items-center bg-surface p-2 rounded border border-border"><span>Correlated Twitter Volume Spike</span> <span className="text-warning font-medium">Medium Reliability</span></li>
                         </ul>
                       </AdminCard>
                       <AdminCard className="p-4 border-danger/30">
                         <h4 className="text-sm font-semibold text-text mb-3">Contradicting Evidence</h4>
                         <ul className="text-xs text-textSecondary space-y-2">
                           <li className="flex justify-between items-center bg-surface p-2 rounded border border-border"><span>Official Government Press Release</span> <span className="text-danger font-medium">Direct Contradiction</span></li>
                         </ul>
                       </AdminCard>
                    </div>
                    <div className="text-sm text-textSecondary text-center py-8 border border-dashed border-border rounded bg-surface/30">
                      Attached Media and Documents Viewer Placeholder
                    </div>
                  </div>
                )}

                {activeTab === 'Pipeline' && (
                  <AdminCard className="p-6 border border-border">
                    <div className="flex flex-col space-y-8 font-mono text-xs">
                      {[
                        { stage: 'Collected', status: 'Success', time: '10:00 AM', owner: 'System' },
                        { stage: 'Normalized', status: 'Success', time: '10:01 AM', owner: 'System' },
                        { stage: 'Clustered', status: 'Success', time: '10:03 AM', owner: 'Ghost Mode Engine' },
                        { stage: 'Scored', status: 'Success', time: '10:05 AM', owner: 'Bio-Feel Engine' },
                        { stage: 'Validated', status: 'Pending', time: '-', owner: 'm.cole' },
                        { stage: 'Ready for Publication', status: 'Offline', time: '-', owner: '-' },
                      ].map((step, idx, arr) => (
                        <div key={step.stage} className="flex relative">
                          <div className="w-24 font-bold text-textSecondary pt-1">{step.stage}</div>
                          <div className="relative mx-4 flex-shrink-0 flex items-start justify-center">
                            <div className={`w-3 h-3 rounded-full mt-1 ${step.status === 'Success' ? 'bg-success' : step.status === 'Pending' ? 'bg-warning animate-pulse' : 'bg-muted'}`} />
                            {idx !== arr.length - 1 && <div className={`absolute top-4 w-px h-12 ${step.status === 'Success' ? 'bg-success/50' : 'bg-border'}`} />}
                          </div>
                          <div className="flex-1 pb-4 pt-0.5">
                            <div className="flex space-x-4">
                              <span className={step.status === 'Success' ? 'text-text' : 'text-textSecondary'}>{step.status}</span>
                              <span className="text-muted">{step.time}</span>
                              <span className="text-primary">{step.owner}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AdminCard>
                )}

              </div>
            </AdminCard>
          )}
          
        </div>

        {/* BOTTOM PANEL - Recent Intelligence Activity */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Recent Intelligence Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Signals Approved (24h)" value="1,402" /></AdminCard>
              <AdminCard className="p-4 bg-card border border-border"><KPIBlock label="Signals Rejected (24h)" value="89" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface border-l border-border p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Intelligence Inspector</h3>
        
        {selectedSignal ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card border border-border">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Signal</h4>
              <p className="font-mono text-primary font-medium mb-2">{selectedSignal.id}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedSignal.status === 'Validated' ? 'Success' : selectedSignal.status === 'Escalated' ? 'Warning' : 'Pending'} label={selectedSignal.status} /></div>
                <div className="flex justify-between"><span className="text-muted">Risk Profile</span><SeverityPill level={selectedSignal.priority as any} /></div>
                <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text">{selectedSignal.analyst}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card border border-border">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Linked Evidence</h4>
              <ul className="text-xs text-textSecondary space-y-1 list-disc list-inside">
                <li>2 Supporting Documents</li>
                <li>1 Contradicting Source</li>
                <li>0 Media Files</li>
              </ul>
            </AdminCard>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a signal to inspect.</div>
        )}
      </div>

    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard,
  DataTable, Tabs, Breadcrumb, KPIBlock, SeverityPill, StatGrid, JSONViewer,
  RowSelectionCheckbox, BulkActionBar, SortHeader
} from '../components/ui';

export default function Compliance() {
  const [activeTab, setActiveTab] = useState('Audit Center');
  const [selectedLogId, setSelectedLogId] = useState<string | null>('log-101');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'time', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const tabs = [
    { id: 'Audit Center', label: 'Audit Logs' },
    { id: 'Compliance Frameworks', label: 'Frameworks' },
    { id: 'Data Retention', label: 'Data Lifecycle' },
    { id: 'Incident Management', label: 'Incidents' },
  ];

  const auditLogs = [
    { id: 'log-101', time: '2026-08-04T00:15:22Z', actor: 'e.vance', org: 'TrendForge', action: 'UPDATE', target: 'Config:BioFeel', module: 'Engine Ops', severity: 'Low', status: 'Success' },
    { id: 'log-102', time: '2026-08-04T00:12:05Z', actor: 'm.cole', org: 'Acme Corp', action: 'EXPORT', target: 'Report:Monthly', module: 'Billing', severity: 'Low', status: 'Success' },
    { id: 'log-103', time: '2026-08-04T00:08:41Z', actor: 'system', org: 'TrendForge', action: 'SUSPEND', target: 'User:s.chen', module: 'Identity', severity: 'High', status: 'Success' },
    { id: 'log-104', time: '2026-08-04T00:01:10Z', actor: 'unknown', org: 'N/A', action: 'DELETE', target: 'API_KEY:tnt_1', module: 'Security', severity: 'Critical', status: 'Denied' },
  ];

  const sampleJson = {
    request: {
      action: "UPDATE",
      target: "Config:BioFeel",
      fields: { noise_floor: 0.15 }
    },
    response: { status: 200, applied: true },
    signature_hash: "sha256:8f43b...9a12c"
  };

  const frameworks = [
    { name: 'SOC2 Type II', status: 'Compliant', coverage: '100%', review: '2026-01-15', owner: 'Compliance Team', issues: 0, evidence: 142 },
    { name: 'GDPR', status: 'Compliant', coverage: '100%', review: '2026-03-01', owner: 'Legal', issues: 0, evidence: 89 },
    { name: 'CCPA', status: 'Compliant', coverage: '100%', review: '2026-03-01', owner: 'Legal', issues: 0, evidence: 45 },
    { name: 'ISO 27001', status: 'Pending', coverage: '92%', review: 'N/A', owner: 'Security Team', issues: 3, evidence: 312 },
  ];

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedLogs = useMemo(() => {
    // 1. Search Filter
    let result = auditLogs.filter(log => 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [auditLogs, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedLogs.length / itemsPerPage);
  const paginatedLogs = processedLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    setSelectedRows(selectedRows.length === paginatedLogs.length ? [] : paginatedLogs.map(l => l.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col min-w-0">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance & Audit' }]} />
          <PageHeader 
            title="Compliance & Audit Center" 
            subtitle="Immutable audit logs, regulatory compliance, and incident forensics." 
            action={<PrimaryButton>Export Audit Log</PrimaryButton>} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <AdminCard className="p-6 bg-card">
              <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Overall Posture</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center"><span className="text-muted">Compliance Status</span><StatusBadge status="Success" label="Audit Ready" /></div>
                <div className="flex justify-between items-center"><span className="text-muted">Legal Holds</span><span className="text-text font-mono font-bold">2 Active</span></div>
              </div>
            </AdminCard>
            <AdminCard className="p-6 bg-card">
              <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Recommendations</h4>
              <ul className="text-sm text-textSecondary space-y-2">
                <li className="flex items-start gap-2"><span className="text-warning">⚠</span> ISO 27001 readiness review is pending 3 remediation items.</li>
                <li className="flex items-start gap-2"><span className="text-primary">ℹ</span> Data retention purge scheduled in 48 hours for 2 tenants.</li>
              </ul>
            </AdminCard>
          </div>
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 space-y-6">
          
          {activeTab === 'Audit Center' && (
            <div className="flex flex-col gap-6">
              <div className="flex-1 space-y-4">
                <AdminCard>
                  <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Audit Log Directory</h3>
                  </div>

                  {/* REAL SEARCH & TOOLBAR */}
                  <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
                    <div className="relative w-full sm:w-72">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search actors, actions, targets..." 
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
                        <option value="all">All Severities</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                      <SecondaryButton className="py-1.5 px-3">Export CSV</SecondaryButton>
                    </div>
                  </div>
                  
                  {selectedRows.length > 0 && (
                    <BulkActionBar 
                      selectedCount={selectedRows.length} 
                      actions={<><SecondaryButton className="py-1">Export Selected</SecondaryButton></>} 
                    />
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-surface border-b border-border text-xs text-textSecondary uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 w-10">
                            <RowSelectionCheckbox 
                              checked={selectedRows.length === paginatedLogs.length && paginatedLogs.length > 0} 
                              onChange={handleSelectAll} 
                            />
                          </th>
                          {/* REAL SORT HEADERS */}
                          {[
                            { key: 'time', label: 'Timestamp' },
                            { key: 'actor', label: 'Actor' },
                            { key: 'action', label: 'Action' },
                            { key: 'target', label: 'Target' },
                            { key: 'module', label: 'Module' },
                            { key: 'severity', label: 'Severity' }
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
                        {paginatedLogs.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-textSecondary">No logs found matching your search.</td>
                          </tr>
                        ) : (
                          paginatedLogs.map(log => (
                            <tr 
                              key={log.id} 
                              className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedLogId === log.id ? 'bg-primary/5' : ''}`}
                              onClick={() => setSelectedLogId(log.id)}
                            >
                              <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                                <RowSelectionCheckbox checked={selectedRows.includes(log.id)} onChange={() => handleSelectRow(log.id)} />
                              </td>
                              <td className="px-4 py-3 font-mono text-muted text-xs">{log.time}</td>
                              <td className="px-4 py-3">
                                <span className="font-medium text-text">{log.actor}</span>
                                <span className="block text-xs text-muted">{log.org}</span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface border border-border text-textSecondary">{log.action}</span>
                              </td>
                              <td className="px-4 py-3 font-mono text-primary text-xs">{log.target}</td>
                              <td className="px-4 py-3 text-textSecondary">{log.module}</td>
                              <td className="px-4 py-3">
                                <SeverityPill level={log.severity as any} />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* REAL PAGINATION */}
                  <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
                    <span className="text-textSecondary">
                      Showing <span className="font-medium text-text">{paginatedLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedLogs.length)}</span> of <span className="font-medium text-text">{processedLogs.length}</span> results
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

              {/* Audit Detail Panel */}
              <div className="w-full min:w-96 flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <h4 className="text-sm font-semibold mb-4 border-b border-border pb-2">Audit Event Details</h4>
                  
                  {selectedLogId ? (
                    <div className="space-y-4">
                      <KPIBlock label="Event ID" value={selectedLogId.toUpperCase()} />
                      <KPIBlock label="Correlation ID" value={`req-${selectedLogId.split('-')[1]}f2bc`} />
                      <div>
                        <span className="text-xs font-bold text-textSecondary block mb-1">Payload Hash</span>
                        <span className="font-mono text-xs text-muted break-all">{sampleJson.signature_hash}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-textSecondary block mb-2">Request Body</span>
                        <JSONViewer data={sampleJson.request} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-textSecondary py-12 text-center">Select an audit log to view details.</div>
                  )}
                </AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'Compliance Frameworks' && (
            <div className="space-y-6">
              <StatGrid>
                {frameworks.map(fw => (
                  <AdminCard key={fw.name} className={`p-4 border-t-4 ${fw.status === 'Compliant' ? 'border-t-success' : 'border-t-warning'}`}>
                    <h3 className="font-bold text-lg text-text mb-2">{fw.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <StatusBadge status={fw.status === 'Compliant' ? 'Success' : 'Pending'} label={fw.status} />
                      <span className="text-xs font-mono text-muted">{fw.coverage} Covered</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-textSecondary">Owner:</span><span className="text-text">{fw.owner}</span></div>
                      <div className="flex justify-between"><span className="text-textSecondary">Last Review:</span><span className="text-text">{fw.review}</span></div>
                      <div className="flex justify-between"><span className="text-textSecondary">Evidence Count:</span><span className="text-text">{fw.evidence}</span></div>
                      <div className="flex justify-between mt-2 pt-2 border-t border-border"><span className="text-textSecondary">Pending Issues:</span><span className={fw.issues > 0 ? 'text-warning font-bold' : 'text-success'}>{fw.issues}</span></div>
                    </div>
                  </AdminCard>
                ))}
              </StatGrid>
            </div>
          )}

          {activeTab === 'Data Retention' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Data Lifecycle Management placeholder (Retention Policies, Archive Status, Deletion Queue, Legal Holds).
            </div>
          )}

          {activeTab === 'Incident Management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminCard className="p-4 border-danger/30 bg-danger/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="Critical" />
                  <span className="text-xs font-mono text-muted">INC-104</span>
                </div>
                <h4 className="font-bold text-danger mb-1">DDoS Mitigation Triggered</h4>
                <p className="text-xs text-textSecondary mb-4">API Gateway experiencing volumetric attack. WAF rules engaged.</p>
                <div className="flex justify-between text-xs text-muted border-t border-danger/10 pt-2">
                  <span>Owner: SecOps</span>
                  <span>Active (12m)</span>
                </div>
              </AdminCard>
              
              <AdminCard className="p-4 border-warning/30 bg-warning/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="High" />
                  <span className="text-xs font-mono text-muted">INC-103</span>
                </div>
                <h4 className="font-bold text-warning mb-1">Database Replication Lag</h4>
                <p className="text-xs text-textSecondary mb-4">Read replica in eu-west-1 lagging by 14 seconds.</p>
                <div className="flex justify-between text-xs text-muted border-t border-warning/10 pt-2">
                  <span>Owner: DB SRE</span>
                  <span>Investigating</span>
                </div>
              </AdminCard>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard,
  DataTable, Tabs, Breadcrumb, KPIBlock, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, SeverityPill, StatGrid, ActivityFeed
} from '../components/ui';

export default function Security() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'user', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const tabs = [
    { id: 'Overview', label: 'Security Overview' },
    { id: 'Active Sessions', label: 'Global Sessions' },
    { id: 'Login Events', label: 'Auth Events' },
    { id: 'Access Review', label: 'Access Review' },
    { id: 'API Tokens', label: 'Token Management' },
  ];

  const sessions = [
    { id: 'ses-01', user: 'e.vance', org: 'TrendForge', browser: 'Chrome 124', os: 'macOS', device: 'MBP 16"', ip: '192.168.1.1', region: 'US East', risk: 'Low', login: '10m ago', activity: 'Just now', status: 'Active' },
    { id: 'ses-02', user: 'm.cole', org: 'Acme Corp', browser: 'Safari Mobile', os: 'iOS 17', device: 'iPhone 15', ip: '10.0.0.4', region: 'US East', risk: 'Low', login: '3h ago', activity: '1h ago', status: 'Active' },
    { id: 'ses-03', user: 's.chen', org: 'Nexus Trading', browser: 'Firefox 115', os: 'Windows 11', device: 'ThinkPad', ip: '203.0.113.42', region: 'EU West', risk: 'High', login: '12h ago', activity: '2h ago', status: 'Suspicious' },
  ];

  const loginEvents = [
    { time: '10:45 AM', user: 'j.doe', action: 'SUCCESS', detail: 'MFA authenticated via WebAuthn' },
    { time: '10:30 AM', user: 'admin_api', action: 'API_AUTH', detail: 'Service token authenticated (TrendForge Core)' },
    { time: '09:15 AM', user: 'unknown', action: 'FAILED', detail: 'Invalid password attempt from IP 198.51.100.2' },
    { time: '08:00 AM', user: 's.chen', action: 'LOCKED', detail: 'Account locked after 5 failed attempts' },
  ];

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedSessions = useMemo(() => {
    // 1. Search Filter
    let result = sessions.filter(s => 
      s.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ip.includes(searchQuery) ||
      s.region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [sessions, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedSessions.length / itemsPerPage);
  const paginatedSessions = processedSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- HANDLERS ---
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id: string) => {
    setSelectedSessions(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedSessions(selectedSessions.length === paginatedSessions.length ? [] : paginatedSessions.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col min-w-0">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Security Center' }]} />
          <PageHeader 
            title="Security Command Center" 
            subtitle="Global security health, identity governance, and access monitoring." 
            action={<DangerButton>Lockdown Platform</DangerButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 space-y-6">
          
          {activeTab === 'Overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <AdminCard className="p-6 bg-card">
                  <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Threat Intelligence</h4>
                  <div className="space-y-4 text-sm mt-4">
                    <div className="flex justify-between items-center"><span className="text-muted">Global Risk</span><StatusBadge status="Success" label="Low" /></div>
                    <div className="flex justify-between items-center"><span className="text-muted">Active Threats</span><span className="text-text font-mono text-lg font-bold">0</span></div>
                  </div>
                </AdminCard>
                <AdminCard className="p-6 bg-warning/5 border-warning/30">
                  <h4 className="text-xs font-bold text-warning uppercase mb-3">Warnings</h4>
                  <ul className="text-sm text-text space-y-2 list-disc list-inside">
                    <li>3 active sessions from anomalous IPs (EU West).</li>
                    <li>14 users lacking MFA enforcement.</li>
                  </ul>
                </AdminCard>
                <AdminCard className="p-6 bg-card">
                  <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Linked Incidents</h4>
                  <div className="text-sm text-muted italic flex h-full items-center justify-center pb-4">No active security incidents.</div>
                </AdminCard>
              </div>

              <AdminCard className="p-6 bg-card border-l-4 border-l-success">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-text mb-1">Global Security Status</h2>
                    <p className="text-sm text-muted">All primary security controls are currently operational.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Risk Score</div>
                    <div className="text-2xl font-bold text-success">8/100 (LOW)</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border pt-4">
                  <KPIBlock label="Identity Health" value="Healthy" />
                  <KPIBlock label="MFA Adoption" value="98.4%" />
                  <KPIBlock label="Secret Rotation" value="Compliant" />
                  <KPIBlock label="Active Sessions" value="1,402" />
                </div>
              </AdminCard>

              <StatGrid>
                <MetricCard title="Suspicious Logins" value="12" isPositive={false} change="4" />
                <MetricCard title="Locked Accounts" value="3" />
                <MetricCard title="Failed Auth (24h)" value="142" />
                <MetricCard title="Active API Tokens" value="48" />
              </StatGrid>
            </>
          )}

          {activeTab === 'Active Sessions' && (
            <AdminCard>
              <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Active Sessions</h3>
              </div>

              {/* REAL SEARCH & TOOLBAR */}
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
                <div className="relative w-full sm:w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search identities, IPs, regions..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded text-sm text-text focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <select className="bg-background border border-border text-text text-sm rounded px-3 py-2 focus:outline-none focus:border-primary">
                    <option value="all">All Risks</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                  <SecondaryButton className="py-1.5 px-3">Force Terminate All</SecondaryButton>
                </div>
              </div>
              
              {selectedSessions.length > 0 && (
                <BulkActionBar 
                  selectedCount={selectedSessions.length} 
                  actions={<DangerButton className="py-1">Terminate Selected</DangerButton>} 
                />
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <RowSelectionCheckbox 
                          checked={selectedSessions.length === paginatedSessions.length && paginatedSessions.length > 0} 
                          onChange={handleSelectAll} 
                        />
                      </th>
                      {/* REAL SORT HEADERS */}
                      {[
                        { key: 'user', label: 'Identity' },
                        { key: 'device', label: 'Environment' },
                        { key: 'ip', label: 'Network' },
                        { key: 'login', label: 'Timeline' },
                        { key: 'risk', label: 'Risk' }
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
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm bg-background">
                    {paginatedSessions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-textSecondary">No sessions found matching your search.</td>
                      </tr>
                    ) : (
                      paginatedSessions.map(s => (
                        <tr key={s.id} className={`hover:bg-surface/50 transition-colors ${selectedSessions.includes(s.id) ? 'bg-primary/5' : ''}`}>
                          <td className="px-4 py-3"><RowSelectionCheckbox checked={selectedSessions.includes(s.id)} onChange={() => handleSelectRow(s.id)} /></td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-text">{s.user}</div>
                            <div className="text-xs text-muted">{s.org}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-text">{s.device}</div>
                            <div className="text-xs text-muted">{s.browser} • {s.os}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-mono text-text">{s.ip}</div>
                            <div className="text-xs text-muted">{s.region}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-text">Login: {s.login}</div>
                            <div className="text-xs text-muted">Last: {s.activity}</div>
                          </td>
                          <td className="px-4 py-3">
                            <SeverityPill level={s.risk as any} />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DangerButton className="text-xs py-1" disabled>Terminate</DangerButton>
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
                  Showing <span className="font-medium text-text">{paginatedSessions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedSessions.length)}</span> of <span className="font-medium text-text">{processedSessions.length}</span> results
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
          )}

          {activeTab === 'Login Events' && (
            <AdminCard className="p-6">
              <SectionHeader title="Authentication Timeline" />
              <div className="border border-border rounded p-4 bg-surface">
                 <AuditTimeline events={loginEvents} />
              </div>
            </AdminCard>
          )}

          {activeTab === 'Access Review' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminCard className="p-4 bg-card border-warning/30">
                <h3 className="font-semibold text-warning mb-4">Pending Reviews</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-surface border border-border rounded">
                    <div><span className="font-medium text-text block">Privileged Accounts</span><span className="text-xs text-muted">12 accounts require quarterly review</span></div>
                    <PrimaryButton className="text-xs py-1">Start Review</PrimaryButton>
                  </div>
                  <div className="flex justify-between p-3 bg-surface border border-border rounded">
                    <div><span className="font-medium text-text block">Permission Drift</span><span className="text-xs text-muted">3 accounts have anomalous access</span></div>
                    <PrimaryButton className="text-xs py-1">Investigate</PrimaryButton>
                  </div>
                </div>
              </AdminCard>
              <AdminCard className="p-4 bg-card">
                <h3 className="font-semibold text-text mb-4">Governance Health</h3>
                <div className="space-y-4">
                  <KPIBlock label="Inactive Accounts (90+ Days)" value="24" />
                  <KPIBlock label="Dormant Super Admins" value="0" />
                  <KPIBlock label="Recent Role Changes" value="8 (Last 7 Days)" />
                </div>
              </AdminCard>
            </div>
          )}

          {activeTab === 'API Tokens' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              API Token Management placeholder (Service & Personal Tokens, Rotation, Revocation)
            </div>
          )}

        </div>
      </div>



    </div>
  );
}
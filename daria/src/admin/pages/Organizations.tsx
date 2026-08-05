import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, IconButton, MetricCard,
  DataTable, Tabs, Breadcrumb, KPIBlock, ActivityFeed, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, SeverityPill
} from '../components/ui';

export default function Organizations() {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>('org-001');
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set to 3 to demonstrate pagination with mock data

  const orgs = [
    { id: 'org-001', name: 'Acme Corp Enterprise', tenant: 'tnt_acme82', plan: 'Enterprise', status: 'Success', health: 'Healthy', region: 'us-east-1', seats: '142 / 200', active: '138', created: '2023-01-15' },
    { id: 'org-002', name: 'Global Media Syndicate', tenant: 'tnt_gms44', plan: 'Scale', status: 'Warning', health: 'Degraded', region: 'eu-west-1', seats: '45 / 50', active: '42', created: '2023-06-22' },
    { id: 'org-003', name: 'Nexus Trading Group', tenant: 'tnt_nxt99', plan: 'Enterprise', status: 'Success', health: 'Healthy', region: 'us-east-1', seats: '890 / 1000', active: '874', created: '2022-11-04' },
    { id: 'org-004', name: 'Vertex Analytics', tenant: 'tnt_vrtx12', plan: 'Pro', status: 'Offline', health: 'Down', region: 'ap-south-1', seats: '12 / 12', active: '0', created: '2024-02-18' },
  ];

  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Members', label: 'Members' },
    { id: 'Roles', label: 'Roles' },
    { id: 'Teams', label: 'Teams' },
    { id: 'API Keys', label: 'API Keys' },
    { id: 'Usage', label: 'Usage' },
    { id: 'Audit', label: 'Audit Log' },
    { id: 'Feature Access', label: 'Feature Access' },
  ];

  const auditEvents = [
    { time: '10:42 AM', user: 'admin_sys', action: 'PROVISION', detail: 'Increased seat count to 200' },
    { time: 'Yesterday', user: 'j.smith (Acme)', action: 'INVITE', detail: 'Invited 14 new users to Marketing team' },
    { time: 'Aug 1, 2026', user: 'system', action: 'BILLING', detail: 'Processed monthly enterprise invoice' },
  ];

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedOrgs = useMemo(() => {
    // 1. Search Filter
    let result = orgs.filter(org => 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.region.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [orgs, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedOrgs.length / itemsPerPage);
  const paginatedOrgs = processedOrgs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedOrg = orgs.find(o => o.id === selectedOrgId) || orgs[0];

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
    setSelectedRows(selectedRows.length === paginatedOrgs.length ? [] : paginatedOrgs.map(o => o.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Organizations' }]} />
          <PageHeader 
            title="Organization Management" 
            subtitle="Manage enterprise tenants, workspaces, and organization health." 
            action={<PrimaryButton>Provision Organization</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6">
          {/* Organization Directory */}
          <AdminCard>
            <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Organization Directory</h3>
            </div>

            {/* REAL SEARCH & TOOLBAR */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search organizations, tenants, regions..." 
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
                  <option value="all">All Plans</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="scale">Scale</option>
                  <option value="pro">Pro</option>
                </select>
                <SecondaryButton>Export CSV</SecondaryButton>
              </div>
            </div>
            
            {selectedRows.length > 0 && (
              <BulkActionBar 
                selectedCount={selectedRows.length} 
                actions={<><SecondaryButton className="py-1">Suspend</SecondaryButton><DangerButton className="py-1">Delete</DangerButton></>} 
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <RowSelectionCheckbox 
                        checked={selectedRows.length === paginatedOrgs.length && paginatedOrgs.length > 0} 
                        onChange={handleSelectAll} 
                      />
                    </th>
                    {/* REAL SORT HEADERS */}
                    {[
                      { key: 'name', label: 'Organization' },
                      { key: 'plan', label: 'Plan' },
                      { key: 'status', label: 'Status' },
                      { key: 'health', label: 'Health' },
                      { key: 'seats', label: 'Seats' }
                    ].map(col => (
                      <th 
                        key={col.key} 
                        className={`px-4 py-3 cursor-pointer hover:text-text transition-colors select-none ${col.key === 'seats' ? 'text-right' : ''}`} 
                        onClick={() => handleSort(col.key)}
                      >
                        <div className={`flex items-center space-x-1 ${col.key === 'seats' ? 'justify-end' : ''}`}>
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
                  {paginatedOrgs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-textSecondary">No organizations found matching your search.</td>
                    </tr>
                  ) : (
                    paginatedOrgs.map(org => (
                      <tr 
                        key={org.id} 
                        className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedOrgId === org.id ? 'bg-primary/5' : ''}`}
                        onClick={() => setSelectedOrgId(org.id)}
                      >
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <RowSelectionCheckbox checked={selectedRows.includes(org.id)} onChange={() => handleSelectRow(org.id)} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-text">{org.name}</div>
                          <div className="text-xs font-mono text-muted">{org.tenant}</div>
                        </td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-surface border border-border rounded text-xs">{org.plan}</span></td>
                        <td className="px-4 py-3"><StatusBadge status={org.status as any} /></td>
                        <td className="px-4 py-3"><HealthIndicator status={org.health as any} /></td>
                        <td className="px-4 py-3 text-right font-mono text-muted">{org.seats}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* REAL PAGINATION */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
              <span className="text-textSecondary">
                Showing <span className="font-medium text-text">{paginatedOrgs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedOrgs.length)}</span> of <span className="font-medium text-text">{processedOrgs.length}</span> results
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
          {selectedOrg && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                    {selectedOrg.name} 
                    <span className="ml-3 px-2 py-0.5 bg-card border border-border rounded text-xs font-mono text-muted">{selectedOrg.tenant}</span>
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">Enterprise Active</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">{selectedOrg.region}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Tags: FINTECH, API_HEAVY</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Impersonate</SecondaryButton>
                  <DangerButton disabled>Suspend</DangerButton>
                </div>
              </div>

              <div className="px-6 pt-2">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Total Seats" value={selectedOrg.seats} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Active Users" value={selectedOrg.active} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Created Date" value={selectedOrg.created} /></AdminCard>
                    <AdminCard className="p-4 bg-card">
                      <span className="text-xs text-muted font-medium mb-1 block">Health</span>
                      <HealthIndicator status={selectedOrg.health as any} />
                    </AdminCard>
                  </div>
                )}
                
                {activeTab === 'Members' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    Members list placeholder (Reuses generic Table UI)
                  </div>
                )}

                {activeTab === 'Feature Access' && (
                  <div className="grid grid-cols-2 gap-4">
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">Ghost Mode</h4><p className="text-xs text-muted">Premium signals intelligence</p></div><StatusBadge status="Success" label="Enabled" /></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">HoloBidder</h4><p className="text-xs text-muted">Automated DSP execution</p></div><StatusBadge status="Warning" label="Soft Cap Reached" /></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">DisinfoDefender</h4><p className="text-xs text-muted">Compliance risk scanning</p></div><StatusBadge status="Success" label="Enabled" /></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card opacity-50"><div><h4 className="font-semibold text-text">Quantum Guess</h4><p className="text-xs text-muted">Predictive saturation modeling</p></div><StatusBadge status="Offline" label="Not Included" /></AdminCard>
                  </div>
                )}

                {activeTab === 'API Keys' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    Organization-level API Key management placeholder
                  </div>
                )}
                
                {/* Placeholders for remaining views */}
                {['Roles', 'Teams', 'Usage', 'Audit'].includes(activeTab) && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    {activeTab} detailed view placeholder.
                  </div>
                )}
              </div>
            </AdminCard>
          )}

        </div>
      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface border-l border-border p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Organization Inspector</h3>
        
        {selectedOrg ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Summary</h4>
              <p className="font-medium text-text mb-2">{selectedOrg.name}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Tenant ID</span><span className="text-primary font-mono">{selectedOrg.tenant}</span></div>
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedOrg.status as any} /></div>
                <div className="flex justify-between"><span className="text-muted">Plan</span><span className="text-text">{selectedOrg.plan}</span></div>
              </div>
            </AdminCard>

            {selectedOrg.health === 'Degraded' && (
              <AdminCard className="p-4 bg-warning/5 border-warning/30">
                <h4 className="text-xs font-bold text-warning uppercase mb-2">Warnings</h4>
                <p className="text-xs text-textSecondary">Approaching API rate limits on HoloBidder endpoint (92% consumed).</p>
              </AdminCard>
            )}

            <div className="mt-6">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Recent Activity</h4>
              <AuditTimeline events={auditEvents} />
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select an organization to view details.</div>
        )}
      </div>

    </div>
  );
}
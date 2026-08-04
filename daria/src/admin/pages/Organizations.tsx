import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, IconButton, MetricCard,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, KPIBlock, ActivityFeed, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, SeverityPill
} from '../components/ui';

export default function Organizations() {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>('org-001');
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const orgs = [
    { id: 'org-001', name: 'Acme Corp Enterprise', tenant: 'tnt_acme82', plan: 'Enterprise', status: 'Success', health: 'Healthy', region: 'us-east-1', seats: '142 / 200', active: '138', created: '2023-01-15' },
    { id: 'org-002', name: 'Global Media Syndicate', tenant: 'tnt_gms44', plan: 'Scale', status: 'Warning', health: 'Degraded', region: 'eu-west-1', seats: '45 / 50', active: '42', created: '2023-06-22' },
    { id: 'org-003', name: 'Nexus Trading Group', tenant: 'tnt_nxt99', plan: 'Enterprise', status: 'Success', health: 'Healthy', region: 'us-east-1', seats: '890 / 1000', active: '874', created: '2022-11-04' },
    { id: 'org-004', name: 'Vertex Analytics', tenant: 'tnt_vrtx12', plan: 'Pro', status: 'Offline', health: 'Down', region: 'ap-south-1', seats: '12 / 12', active: '0', created: '2024-02-18' },
  ];

  const selectedOrg = orgs.find(o => o.id === selectedOrgId) || orgs[0];

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

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === orgs.length ? [] : orgs.map(o => o.id));
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
            <TableToolbar>
              <TableSearch />
              <div className="flex space-x-2">
                <TableFilters />
                <SecondaryButton className="py-1.5 px-3">Export CSV</SecondaryButton>
              </div>
            </TableToolbar>
            
            <BulkActionBar 
              selectedCount={selectedRows.length} 
              actions={<><SecondaryButton className="py-1">Suspend</SecondaryButton><DangerButton className="py-1">Delete</DangerButton></>} 
            />

            <DataTable>
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === orgs.length} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Organization" direction="asc" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Plan" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Status" /></th>
                  <th className="px-4 py-3 text-left">Health</th>
                  <th className="px-4 py-3 text-right">Seats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {orgs.map(org => (
                  <tr 
                    key={org.id} 
                    className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedOrgId === org.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedOrgId(org.id)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(org.id)} onChange={() => handleSelectRow(org.id)} /></td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-text">{org.name}</div>
                      <div className="text-xs font-mono text-muted">{org.tenant}</div>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-surface border border-border rounded text-xs">{org.plan}</span></td>
                    <td className="px-4 py-3"><StatusBadge status={org.status as any} /></td>
                    <td className="px-4 py-3"><HealthIndicator status={org.health as any} /></td>
                    <td className="px-4 py-3 text-right font-mono text-muted">{org.seats}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <TablePagination />
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
              </div>
            </AdminCard>
          )}

        </div>
      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
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

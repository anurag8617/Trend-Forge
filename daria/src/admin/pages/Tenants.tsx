import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SplitButton, SeverityPill
} from '../components/ui';

export default function Tenants() {
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>('tnt_acme82');
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const tenants = [
    { id: 'tnt_acme82', name: 'Acme Corp Enterprise', plan: 'Enterprise', status: 'Success', region: 'US East', env: 'Production', industry: 'Fintech', owner: 'e.vance', health: '98/100', seats: '138/200', created: '2023-01-15', renewal: '2027-01-15' },
    { id: 'tnt_gms44', name: 'Global Media Syndicate', plan: 'Scale', status: 'Warning', region: 'EU West', env: 'Production', industry: 'Media', owner: 'm.cole', health: '64/100', seats: '42/50', created: '2023-06-22', renewal: '2027-06-22' },
    { id: 'tnt_nxt99', name: 'Nexus Trading Group', plan: 'Enterprise', status: 'Success', region: 'US East', env: 'Production', industry: 'Finance', owner: 's.chen', health: '94/100', seats: '874/1000', created: '2022-11-04', renewal: '2026-11-04' },
  ];

  const selectedTenant = tenants.find(t => t.id === selectedTenantId) || tenants[0];

  const tabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Engines', label: 'Engine Access' },
    { id: 'API', label: 'API & Integrations' },
    { id: 'Feature Access', label: 'Feature Flags' },
    { id: 'Members', label: 'Members' },
    { id: 'Usage', label: 'Usage' },
    { id: 'Signals', label: 'Signals' },
    { id: 'Forecasts', label: 'Forecasts' },
    { id: 'Support', label: 'Support' },
    { id: 'Billing Summary', label: 'Billing' },
    { id: 'Audit', label: 'Audit Log' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === tenants.length ? [] : tenants.map(t => t.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Tenant Operations' }]} />
          <PageHeader 
            title="Tenant Operations Center" 
            subtitle="Manage onboarded organizations, feature entitlements, and tenant health." 
            action={<PrimaryButton>Provision Tenant</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6">
          {/* Tenant Directory */}
          <AdminCard>
            <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Tenant Directory</h3></div>
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
              <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === tenants.length} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Tenant" direction="asc" /></th>
                  <th className="px-4 py-3 text-left">Plan / Status</th>
                  <th className="px-4 py-3 text-left">Environment</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Health</th>
                  <th className="px-4 py-3 text-right">Seats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {tenants.map(tnt => (
                  <tr 
                    key={tnt.id} 
                    className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedTenantId === tnt.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedTenantId(tnt.id)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(tnt.id)} onChange={() => handleSelectRow(tnt.id)} /></td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-text">{tnt.name}</div>
                      <div className="text-xs font-mono text-muted">{tnt.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-text mb-1">{tnt.plan}</div>
                      <StatusBadge status={tnt.status as any} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-text">{tnt.region}</div>
                      <div className="text-xs text-muted">{tnt.env}</div>
                    </td>
                    <td className="px-4 py-3 text-textSecondary">{tnt.owner}</td>
                    <td className="px-4 py-3 font-mono font-medium text-success">{tnt.health}</td>
                    <td className="px-4 py-3 text-right font-mono text-muted">{tnt.seats}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <TablePagination />
          </AdminCard>

          {/* Detailed Workspace */}
          {selectedTenant && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                    {selectedTenant.name} 
                    <span className="ml-3 px-2 py-0.5 bg-card border border-border rounded text-xs font-mono text-muted">{selectedTenant.id}</span>
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">{selectedTenant.plan}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">{selectedTenant.industry}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Renewal: {selectedTenant.renewal}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Impersonate Admin</SecondaryButton>
                  <SplitButton mainAction="Edit Tenant" secondaryAction={null} />
                </div>
              </div>

              <div className="px-6 pt-2">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                
                {activeTab === 'Overview' && (
                  <div className="space-y-6">
                    <StatGrid>
                      <MetricCard title="Overall Health" value={selectedTenant.health} isPositive={true} change="Stable" />
                      <MetricCard title="Storage Usage" value="412 GB" />
                      <MetricCard title="Prediction Volume" value="1.2M / mo" />
                      <MetricCard title="API Requests" value="14M / mo" />
                    </StatGrid>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AdminCard className="p-4 bg-card"><KPIBlock label="Last Login" value="12m ago (System Admin)" /></AdminCard>
                       <AdminCard className="p-4 bg-danger/5 border-danger/30"><KPIBlock label="Recent Errors (24h)" value="12 Rate Limit Drops" /></AdminCard>
                    </div>
                  </div>
                )}

                {activeTab === 'Engines' && (
                  <div className="grid grid-cols-2 gap-4">
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">Ghost Mode</h4><p className="text-xs text-muted">142 Signals Processed (24h)</p></div><div className="text-right"><StatusBadge status="Success" label="Provisioned" /><div className="text-xs text-muted mt-1">Limit: 1k/day</div></div></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">Quantum Guess</h4><p className="text-xs text-muted">89 Forecasts Generated (24h)</p></div><div className="text-right"><StatusBadge status="Success" label="Provisioned" /><div className="text-xs text-muted mt-1">Limit: 500/day</div></div></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card"><div><h4 className="font-semibold text-text">Bio-Feel</h4><p className="text-xs text-muted">Overage limit reached</p></div><div className="text-right"><StatusBadge status="Warning" label="Soft Cap" /><div className="text-xs text-muted mt-1">Limit: 10k/day</div></div></AdminCard>
                    <AdminCard className="p-4 flex justify-between items-center bg-card opacity-50"><div><h4 className="font-semibold text-text">HoloBidder</h4><p className="text-xs text-muted">Requires Enterprise+ Addon</p></div><div className="text-right"><StatusBadge status="Offline" label="Restricted" /><div className="text-xs text-muted mt-1">Limit: 0</div></div></AdminCard>
                  </div>
                )}

                {activeTab === 'Feature Access' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Support', 'Signals', 'Forecasts', 'Execution', 'Evidence', 'Exports', 'Teams', 'API', 'Enterprise Features', 'Government Features'].map(feature => (
                      <div key={feature} className="flex justify-between items-center p-3 border border-border rounded bg-surface text-sm">
                        <span className="text-text">{feature}</span>
                        <div className="w-8 h-4 bg-primary rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'API' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AdminCard className="p-4 bg-card"><KPIBlock label="API Keys" value="14 Active" /></AdminCard>
                      <AdminCard className="p-4 bg-card"><KPIBlock label="Rate Limits" value="10k / min" /></AdminCard>
                      <AdminCard className="p-4 bg-card"><KPIBlock label="Webhook Status" value="99.9% Delivery" /></AdminCard>
                    </div>
                    <div className="text-sm text-textSecondary text-center py-8 border border-dashed border-border rounded">
                      SDK Usage and Integration Mapping Placeholder
                    </div>
                  </div>
                )}

                {/* Placeholders for other tabs */}
                {['Members', 'Usage', 'Signals', 'Forecasts', 'Support', 'Billing Summary', 'Audit'].includes(activeTab) && (
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
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Tenant Inspector</h3>
        
        {selectedTenant ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Summary</h4>
              <p className="font-medium text-text mb-2">{selectedTenant.name}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Tenant ID</span><span className="text-primary font-mono">{selectedTenant.id}</span></div>
                <div className="flex justify-between"><span className="text-muted">Health</span><span className="text-success font-bold">{selectedTenant.health}</span></div>
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedTenant.status as any} /></div>
              </div>
            </AdminCard>

            {selectedTenant.status === 'Warning' && (
              <AdminCard className="p-4 bg-warning/5 border-warning/30">
                <h4 className="text-xs font-bold text-warning uppercase mb-2">Open Risks</h4>
                <p className="text-xs text-textSecondary">Seat utilization is near maximum capacity. Approaching API rate limits on Bio-Feel endpoints.</p>
              </AdminCard>
            )}

            <div className="mt-6">
               <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Recent Activity</h4>
               <ul className="text-xs text-muted space-y-2 list-disc list-inside">
                 <li>New API Key generated by j.smith</li>
                 <li>Added 4 members to 'Analysts' team</li>
                 <li>Bio-Feel model configuration updated</li>
               </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a tenant to view details.</div>
        )}
      </div>

    </div>
  );
}

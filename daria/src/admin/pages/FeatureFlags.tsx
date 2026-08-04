import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, KPIBlock,
  DataTable, TableToolbar, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SeverityPill
} from '../components/ui';

export default function FeatureFlags() {
  const [activeTab, setActiveTab] = useState('Flags');
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>('ff-holo-trade');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const flags = [
    { id: 'ff-holo-trade', name: 'HoloBidder Execution', type: 'Enterprise', status: 'Rolled Out', traffic: '100%', env: 'Production', owner: 'Exec Team' },
    { id: 'ff-qguess-v2', name: 'Quantum Guess v2 Model', type: 'Experiment', status: 'A/B Test', traffic: '20%', env: 'Production', owner: 'ML Ops' },
    { id: 'ff-gov-mode', name: 'FedRAMP Strict Mode', type: 'Government', status: 'Rolled Out', traffic: 'Targeted', env: 'GovCloud', owner: 'Compliance' },
    { id: 'ff-new-dashboard', name: 'NextGen Buyer UI', type: 'Beta Program', status: 'Canary', traffic: '5%', env: 'Production', owner: 'Frontend' },
    { id: 'ff-kill-api', name: 'API Panic Killswitch', type: 'Kill Switch', status: 'Inactive', traffic: '0%', env: 'Global', owner: 'SecOps' },
  ];

  const selectedFlag = flags.find(f => f.id === selectedFlagId) || flags[0];

  const tabs = [
    { id: 'Flags', label: 'Feature Flags' },
    { id: 'Experiments', label: 'Experiments & A/B' },
    { id: 'Rollouts', label: 'Rollout Status' },
    { id: 'Audiences', label: 'Target Audiences' },
  ];

  const activityEvents = [
    { time: '11:15 AM', user: 'system', action: 'FLAG_CHANGE', detail: 'Increased ff-new-dashboard canary traffic to 5%' },
    { time: '09:00 AM', user: 'e.vance', action: 'CREATE', detail: 'Created ff-qguess-v2 experiment for ML evaluation' },
    { time: 'Yesterday', user: 'SecOps', action: 'TEST', detail: 'Audited API Killswitch functionality in Staging' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === flags.length ? [] : flags.map(f => f.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Platform Engineering' }, { label: 'Feature Flags' }]} />
          <PageHeader 
            title="Feature Flag Management" 
            subtitle="Manage global kill switches, progressive rollouts, A/B experiments, and enterprise entitlements." 
            action={<PrimaryButton>Create Feature Flag</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Flags' && (
            <AdminCard>
              <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                 <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Global Flag Directory</h3>
                 <div className="flex space-x-4 text-xs">
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-success mr-2"></div>Active (142)</span>
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-warning mr-2"></div>Canary (12)</span>
                    <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-muted mr-2"></div>Inactive (84)</span>
                 </div>
              </div>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              
              <BulkActionBar 
                selectedCount={selectedRows.length} 
                actions={<><SecondaryButton className="py-1">Enable</SecondaryButton><DangerButton className="py-1">Disable</DangerButton></>} 
              />

              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === flags.length} onChange={handleSelectAll} /></th>
                    <th className="px-4 py-3 text-left">Flag Name</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Traffic Allocation</th>
                    <th className="px-4 py-3 text-left">Environment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {flags.map(f => (
                    <tr 
                      key={f.id} 
                      className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedFlagId === f.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedFlagId(f.id)}
                    >
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(f.id)} onChange={() => handleSelectRow(f.id)} /></td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-text">{f.name}</div>
                        <div className="text-xs font-mono text-muted">{f.id}</div>
                      </td>
                      <td className="px-4 py-3 text-textSecondary">{f.type}</td>
                      <td className="px-4 py-3"><StatusBadge status={f.status === 'Rolled Out' ? 'Success' : f.status === 'Canary' || f.status === 'A/B Test' ? 'Warning' : 'Offline'} label={f.status} /></td>
                      <td className="px-4 py-3 font-mono text-primary">{f.traffic}</td>
                      <td className="px-4 py-3 text-muted text-xs">{f.env}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </AdminCard>
          )}

          {activeTab === 'Experiments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminCard className="p-6">
                 <h4 className="font-bold text-text mb-2">ff-qguess-v2</h4>
                 <div className="flex justify-between items-center mb-4"><StatusBadge status="Warning" label="A/B Test Running" /><span className="text-xs font-mono text-muted">Traffic: 20% / 80%</span></div>
                 <div className="space-y-4">
                    <div className="w-full h-4 bg-surface rounded overflow-hidden flex">
                       <div className="bg-primary h-full w-[20%] border-r border-background"></div>
                       <div className="bg-muted h-full w-[80%]"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-primary font-bold">Variant (v2)</span>
                       <span className="text-muted">Control (v1.9)</span>
                    </div>
                 </div>
              </AdminCard>
            </div>
          )}

          {['Rollouts', 'Audiences'].includes(activeTab) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeTab} detailed view placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Recent Flag Changes" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Active Killswitches" value="0" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Running Experiments" value="4" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Flag Inspector</h3>
        
        {selectedFlag ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Flag</h4>
              <p className="font-medium text-text mb-2">{selectedFlag.name}</p>
              <div className="font-mono text-xs text-primary mb-4">{selectedFlag.id}</div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedFlag.status === 'Rolled Out' ? 'Success' : selectedFlag.status === 'Canary' || selectedFlag.status === 'A/B Test' ? 'Warning' : 'Offline'} label={selectedFlag.status} /></div>
                <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text font-medium">{selectedFlag.owner}</span></div>
                <div className="flex justify-between"><span className="text-muted">Traffic</span><span className="font-mono text-primary">{selectedFlag.traffic}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card">
               <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-textSecondary uppercase">Killswitch Override</h4>
                  <div className="w-8 h-4 bg-surface rounded-full border border-border"></div>
               </div>
            </AdminCard>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a feature flag to inspect.</div>
        )}
      </div>

    </div>
  );
}

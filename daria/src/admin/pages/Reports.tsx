import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, KPIBlock,
  DataTable, TableToolbar, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar
} from '../components/ui';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Report Library');
  const [selectedReportId, setSelectedReportId] = useState<string | null>('rpt-board-01');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const reports = [
    { id: 'rpt-board-01', name: 'Board Executive Summary', category: 'Executive', schedule: 'Monthly', format: 'PDF', owner: 'Exec Team', status: 'Active' },
    { id: 'rpt-comp-99', name: 'SOC2 Compliance Audit', category: 'Compliance', schedule: 'Quarterly', format: 'PDF', owner: 'Compliance', status: 'Active' },
    { id: 'rpt-sec-12', name: 'Global Threat Intel', category: 'Security', schedule: 'Weekly', format: 'JSON', owner: 'SecOps', status: 'Active' },
    { id: 'rpt-bill-04', name: 'Enterprise Revenue Accrual', category: 'Billing', schedule: 'Monthly', format: 'Excel', owner: 'Finance', status: 'Active' },
    { id: 'rpt-ai-01', name: 'Quantum Guess Drift Analysis', category: 'AI Performance', schedule: 'Weekly', format: 'PDF', owner: 'ML Ops', status: 'Paused' },
  ];

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const tabs = [
    { id: 'Report Library', label: 'Report Library' },
    { id: 'Scheduled Reports', label: 'Scheduled Reports' },
    { id: 'Export Center', label: 'Export Center' },
  ];

  const activityEvents = [
    { time: '10:00 AM', user: 'system', action: 'GENERATE', detail: 'Generated Daily Usage Analytics report' },
    { time: '09:00 AM', user: 'finance-bot', action: 'EXPORT', detail: 'Exported Revenue Accrual to SFTP' },
    { time: 'Yesterday', user: 'a.turing', action: 'SCHEDULE', detail: 'Paused Quantum Guess Drift Analysis' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === reports.length ? [] : reports.map(r => r.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col min-w-0">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Executive Operations' }, { label: 'Reports' }]} />
          <PageHeader 
            title="Enterprise Reporting Center" 
            subtitle="Automate, schedule, and export business intelligence and compliance reports." 
            action={<PrimaryButton>Create Report</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Report Library' && (
            <div className="space-y-6">
              {selectedReport && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdminCard className="p-6 bg-card">
                    <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Report Summary</h4>
                    <p className="font-medium text-text mb-4 text-lg">{selectedReport.name}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted block text-xs mb-1">Status</span><StatusBadge status={selectedReport.status === 'Active' ? 'Success' : 'Warning'} label={selectedReport.status} /></div>
                      <div><span className="text-muted block text-xs mb-1">Owner</span><span className="text-text font-medium">{selectedReport.owner}</span></div>
                      <div><span className="text-muted block text-xs mb-1">Format</span><span className="font-mono text-text bg-surface px-2 py-1 rounded">{selectedReport.format}</span></div>
                    </div>
                  </AdminCard>
                  
                  <AdminCard className="p-6 bg-card">
                    <h4 className="text-xs font-bold text-textSecondary uppercase mb-4">Metadata & Health</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted block text-xs mb-1">Last Gen</span><span className="text-primary font-mono bg-primary/10 px-2 py-1 rounded">10:00 AM</span></div>
                      <div><span className="text-muted block text-xs mb-1">Recipients</span><span className="text-text font-medium bg-surface px-2 py-1 rounded">14 Users</span></div>
                      <div><span className="text-muted block text-xs mb-1">Schedule</span><span className="text-text font-medium">{selectedReport.schedule}</span></div>
                      <div><span className="text-muted block text-xs mb-1">Category</span><span className="text-text">{selectedReport.category}</span></div>
                    </div>
                  </AdminCard>
                </div>
              )}

              <AdminCard>
                <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Report Directory</h3></div>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              
              <BulkActionBar 
                selectedCount={selectedRows.length} 
                actions={<><SecondaryButton className="py-1">Run Now</SecondaryButton><DangerButton className="py-1">Delete</DangerButton></>} 
              />

              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === reports.length} onChange={handleSelectAll} /></th>
                    <th className="px-4 py-3 text-left">Report Name</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Schedule</th>
                    <th className="px-4 py-3 text-left">Format</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {reports.map(rpt => (
                    <tr 
                      key={rpt.id} 
                      className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedReportId === rpt.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedReportId(rpt.id)}
                    >
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(rpt.id)} onChange={() => handleSelectRow(rpt.id)} /></td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-text">{rpt.name}</div>
                        <div className="text-xs font-mono text-muted">{rpt.id}</div>
                      </td>
                      <td className="px-4 py-3 text-textSecondary">{rpt.category}</td>
                      <td className="px-4 py-3 font-mono text-primary text-xs">{rpt.schedule}</td>
                      <td className="px-4 py-3 text-muted">{rpt.format}</td>
                      <td className="px-4 py-3"><StatusBadge status={rpt.status === 'Active' ? 'Success' : 'Warning'} label={rpt.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </AdminCard>
            </div>
          )}

          {activeTab === 'Scheduled Reports' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
               {['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual'].map(sched => (
                 <AdminCard key={sched} className="p-6 text-center bg-card">
                    <h3 className="font-bold text-lg text-text mb-2">{sched}</h3>
                    <p className="text-xs text-textSecondary mb-4">View reports scheduled for {sched.toLowerCase()} distribution.</p>
                    <SecondaryButton className="w-full text-xs">Manage Schedule</SecondaryButton>
                 </AdminCard>
               ))}
            </div>
          )}

          {activeTab === 'Export Center' && (
            <AdminCard className="p-6">
              <SectionHeader title="Data Export Targets" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                 {['PDF', 'Excel', 'CSV', 'JSON', 'REST API'].map(fmt => (
                   <div key={fmt} className="flex justify-between items-center p-3 border border-border rounded bg-surface text-sm">
                     <span className="text-text">{fmt}</span>
                     <div className="w-8 h-4 bg-primary rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                   </div>
                 ))}
              </div>
            </AdminCard>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="Reporting Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Recent Reports (24h)" value="42" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="API Exports (24h)" value="142k" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

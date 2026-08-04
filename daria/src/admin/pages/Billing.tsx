import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SplitButton
} from '../components/ui';

export default function Billing() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSubId, setSelectedSubId] = useState<string | null>('sub-0982');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const subscriptions = [
    { id: 'sub-0982', org: 'Acme Corp', plan: 'Enterprise', status: 'Active', cycle: 'Annual', renewal: 'Jan 15, 2027', seats: '138', usage: 'High', contract: 'CTR-110' },
    { id: 'sub-0983', org: 'Nexus Trading', plan: 'Enterprise', status: 'Active', cycle: 'Annual', renewal: 'Nov 04, 2026', seats: '874', usage: 'Critical', contract: 'CTR-084' },
    { id: 'sub-0984', org: 'Global Media', plan: 'Scale', status: 'Past Due', cycle: 'Monthly', renewal: 'Aug 01, 2026', seats: '42', usage: 'Normal', contract: 'Standard' },
    { id: 'sub-0985', org: 'US Dept of State', plan: 'Government', status: 'Active', cycle: 'Annual', renewal: 'Oct 01, 2026', seats: 'Unlimited', usage: 'High', contract: 'CTR-002-GOV' },
  ];

  const selectedSub = subscriptions.find(s => s.id === selectedSubId) || subscriptions[0];

  const tabs = [
    { id: 'Overview', label: 'Billing Overview' },
    { id: 'Subscriptions', label: 'Subscriptions' },
    { id: 'Invoices', label: 'Invoices' },
    { id: 'Payments', label: 'Payments' },
    { id: 'Usage Billing', label: 'Usage Billing' },
    { id: 'Contracts', label: 'Contracts' },
  ];

  const activityEvents = [
    { time: '11:45 AM', user: 'system', action: 'PAYMENT', detail: 'Received $45,000 ACH transfer from Acme Corp' },
    { time: '10:30 AM', user: 'finance-bot', action: 'INVOICE', detail: 'Generated 412 monthly recurring invoices' },
    { time: 'Yesterday', user: 'c.manager', action: 'CONTRACT', detail: 'Renewed CTR-084 for Nexus Trading' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === subscriptions.length ? [] : subscriptions.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Commercial Operations' }, { label: 'Billing' }]} />
          <PageHeader 
            title="Billing & Revenue Operations" 
            subtitle="Manage subscriptions, enterprise contracts, usage metering, and invoice ledgers." 
            action={<PrimaryButton>Generate Invoice</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Monthly Recurring Revenue (MRR)" value="$4.2M" isPositive={true} change="+12%" />
                <MetricCard title="Annual Recurring Revenue (ARR)" value="$50.4M" isPositive={true} change="+15%" />
                <MetricCard title="Enterprise Accounts" value="142" />
                <MetricCard title="Government Accounts" value="12" />
              </StatGrid>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Outstanding Balance" value="$842,100" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Invoices Due (30d)" value="412" /></AdminCard>
                 <AdminCard className="p-4 bg-card border-warning/30"><KPIBlock label="Renewals This Month" value="24" /></AdminCard>
                 <AdminCard className="p-4 bg-danger/5 border-danger/30"><KPIBlock label="Failed Payments" value="14" /></AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'Subscriptions' && (
            <AdminCard>
              <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Active Subscriptions</h3></div>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              
              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === subscriptions.length} onChange={handleSelectAll} /></th>
                    <th className="px-4 py-3 text-left">Organization</th>
                    <th className="px-4 py-3 text-left">Plan</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Cycle</th>
                    <th className="px-4 py-3 text-left">Renewal</th>
                    <th className="px-4 py-3 text-right">Seats</th>
                    <th className="px-4 py-3 text-right">Contract</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {subscriptions.map(sub => (
                    <tr 
                      key={sub.id} 
                      className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedSubId === sub.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedSubId(sub.id)}
                    >
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(sub.id)} onChange={() => handleSelectRow(sub.id)} /></td>
                      <td className="px-4 py-3 font-semibold text-text">{sub.org}</td>
                      <td className="px-4 py-3 text-textSecondary">{sub.plan}</td>
                      <td className="px-4 py-3"><StatusBadge status={sub.status === 'Active' ? 'Success' : 'Critical'} label={sub.status} /></td>
                      <td className="px-4 py-3 text-muted">{sub.cycle}</td>
                      <td className="px-4 py-3 font-mono text-muted">{sub.renewal}</td>
                      <td className="px-4 py-3 text-right text-text">{sub.seats}</td>
                      <td className="px-4 py-3 text-right font-mono text-primary">{sub.contract}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
              <TablePagination />
            </AdminCard>
          )}

          {activeTab === 'Invoices' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Invoices Ledger Placeholder. Tracks Number, Org, Amount, Currency, Status, Issued, Due, Paid.
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Payments Ledger Placeholder. Tracks Transaction ID, Method, Amount, Status, Gateway, Reference, Failure Reason.
            </div>
          )}

          {activeTab === 'Usage Billing' && (
            <AdminCard className="p-6">
               <SectionHeader title="Metered Usage Aggregation" />
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                 <KPIBlock label="Total Predictions Billed (30d)" value="14.2M" />
                 <KPIBlock label="Total Signals Processed" value="1.8B" />
                 <KPIBlock label="Total API Calls" value="142B" />
                 <KPIBlock label="Storage Overage" value="14.2 TB" />
                 <KPIBlock label="Enterprise Exports" value="842" />
                 <KPIBlock label="Execution Volume (HoloBidder)" value="$14.2B" />
               </div>
            </AdminCard>
          )}

          {activeTab === 'Contracts' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Enterprise Contracts Placeholder. Tracks Contract ID, Start Date, End Date, Account Manager.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Commercial Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Recent Payments (24h)" value="$142,500" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Contract Updates" value="3" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Revenue Inspector</h3>
        
        {selectedSub && activeTab === 'Subscriptions' ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Customer</h4>
              <p className="font-medium text-text mb-2">{selectedSub.org}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedSub.status === 'Active' ? 'Success' : 'Critical'} label={selectedSub.status} /></div>
                <div className="flex justify-between"><span className="text-muted">Health</span><HealthIndicator status="Healthy" /></div>
                <div className="flex justify-between"><span className="text-muted">Plan</span><span className="text-text font-bold">{selectedSub.plan}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Contract Details</h4>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted">ID</span><span className="font-mono text-primary">{selectedSub.contract}</span></div>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted">Revenue</span><span className="font-mono text-text">$142,000 / yr</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted">Renewal</span><span className="font-mono text-text">{selectedSub.renewal}</span></div>
            </AdminCard>

            {selectedSub.status === 'Past Due' && (
              <AdminCard className="p-4 bg-danger/5 border-danger/30">
                 <h4 className="text-xs font-bold text-danger uppercase mb-2">Warnings</h4>
                 <p className="text-xs text-textSecondary">Account is 14 days past due. Services will be suspended in 48 hours.</p>
              </AdminCard>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a subscription to inspect.</div>
        )}
      </div>

    </div>
  );
}

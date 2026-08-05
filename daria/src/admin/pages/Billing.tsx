import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SplitButton
} from '../components/ui';

export default function Billing() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSubId, setSelectedSubId] = useState<string | null>('sub-0982');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'org', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedSubscriptions = useMemo(() => {
    // 1. Search Filter
    let result = subscriptions.filter(sub => 
      sub.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.contract.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [subscriptions, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = processedSubscriptions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    setSelectedRows(selectedRows.length === paginatedSubscriptions.length ? [] : paginatedSubscriptions.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col min-w-0">
        
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
            <div className="space-y-6">
              {selectedSub && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AdminCard className="p-6 bg-card">
                    <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Selected Customer</h4>
                    <p className="text-xl font-bold text-text mb-4">{selectedSub.org}</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedSub.status === 'Active' ? 'Success' : 'Critical'} label={selectedSub.status} /></div>
                      <div className="flex justify-between"><span className="text-muted">Health</span><HealthIndicator status="Healthy" /></div>
                      <div className="flex justify-between"><span className="text-muted">Plan</span><span className="text-text font-bold">{selectedSub.plan}</span></div>
                    </div>
                  </AdminCard>
                  
                  <AdminCard className="p-6 bg-card">
                    <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Contract Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted">ID</span><span className="font-mono text-primary">{selectedSub.contract}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Revenue</span><span className="font-mono text-text">$142,000 / yr</span></div>
                      <div className="flex justify-between"><span className="text-muted">Renewal</span><span className="font-mono text-text">{selectedSub.renewal}</span></div>
                    </div>
                  </AdminCard>
                  
                  {selectedSub.status === 'Past Due' ? (
                    <AdminCard className="p-6 bg-danger/5 border-danger/30">
                       <h4 className="text-sm font-bold text-danger uppercase mb-2">Warnings</h4>
                       <p className="text-sm text-textSecondary mb-4">Account is 14 days past due. Services will be suspended in 48 hours.</p>
                       <DangerButton className="w-full justify-center text-sm py-2">Suspend Now</DangerButton>
                    </AdminCard>
                  ) : (
                    <AdminCard className="p-6 bg-card">
                      <h4 className="text-sm font-bold text-textSecondary uppercase mb-4">Quick Actions</h4>
                      <div className="space-y-2">
                        <SecondaryButton className="w-full justify-start text-sm py-2 text-left">Upgrade Plan</SecondaryButton>
                        <SecondaryButton className="w-full justify-start text-sm py-2 text-left">Generate Invoice</SecondaryButton>
                      </div>
                    </AdminCard>
                  )}
                </div>
              )}
            <AdminCard>
              <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Active Subscriptions</h3>
              </div>

              {/* REAL SEARCH & TOOLBAR */}
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
                <div className="relative w-full sm:w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search organizations, plans, contracts..." 
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
                    <option value="government">Government</option>
                  </select>
                  <SecondaryButton className="py-1.5 px-3">Export CSV</SecondaryButton>
                </div>
              </div>
              
              {selectedRows.length > 0 && (
                <BulkActionBar 
                  selectedCount={selectedRows.length} 
                  actions={<><SecondaryButton className="py-1">Pause Selected</SecondaryButton><DangerButton className="py-1">Cancel Subscriptions</DangerButton></>} 
                />
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <RowSelectionCheckbox 
                          checked={selectedRows.length === paginatedSubscriptions.length && paginatedSubscriptions.length > 0} 
                          onChange={handleSelectAll} 
                        />
                      </th>
                      {/* REAL SORT HEADERS */}
                      {[
                        { key: 'org', label: 'Organization' },
                        { key: 'plan', label: 'Plan' },
                        { key: 'status', label: 'Status' },
                        { key: 'cycle', label: 'Cycle' },
                        { key: 'renewal', label: 'Renewal' },
                        { key: 'seats', label: 'Seats' },
                        { key: 'contract', label: 'Contract' }
                      ].map(col => (
                        <th 
                          key={col.key} 
                          className={`px-4 py-3 cursor-pointer hover:text-text transition-colors select-none ${['seats', 'contract'].includes(col.key) ? 'text-right' : ''}`} 
                          onClick={() => handleSort(col.key)}
                        >
                          <div className={`flex items-center space-x-1 ${['seats', 'contract'].includes(col.key) ? 'justify-end' : ''}`}>
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
                    {paginatedSubscriptions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-textSecondary">No subscriptions found matching your search.</td>
                      </tr>
                    ) : (
                      paginatedSubscriptions.map(sub => (
                        <tr 
                          key={sub.id} 
                          className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedSubId === sub.id ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedSubId(sub.id)}
                        >
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <RowSelectionCheckbox checked={selectedRows.includes(sub.id)} onChange={() => handleSelectRow(sub.id)} />
                          </td>
                          <td className="px-4 py-3 font-semibold text-text">{sub.org}</td>
                          <td className="px-4 py-3 text-textSecondary">{sub.plan}</td>
                          <td className="px-4 py-3"><StatusBadge status={sub.status === 'Active' ? 'Success' : 'Critical'} label={sub.status} /></td>
                          <td className="px-4 py-3 text-muted">{sub.cycle}</td>
                          <td className="px-4 py-3 font-mono text-muted">{sub.renewal}</td>
                          <td className="px-4 py-3 text-right text-text">{sub.seats}</td>
                          <td className="px-4 py-3 text-right font-mono text-primary">{sub.contract}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* REAL PAGINATION */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
                <span className="text-textSecondary">
                  Showing <span className="font-medium text-text">{paginatedSubscriptions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedSubscriptions.length)}</span> of <span className="font-medium text-text">{processedSubscriptions.length}</span> results
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

    </div>
  );
}

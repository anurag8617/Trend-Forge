import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, SeverityPill,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SplitButton
} from '../components/ui';

export default function Support() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>('TKT-9942');
  const [activeTab, setActiveTab] = useState('Conversation');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const tickets = [
    { id: 'TKT-9942', priority: 'High', tenant: 'Acme Corp', reporter: 'j.smith', category: 'API Rate Limits', agent: 'e.vance', status: 'Open', created: '2h ago', updated: '10m ago' },
    { id: 'TKT-9943', priority: 'Critical', tenant: 'Global Media', reporter: 'm.cole', category: 'Data Export Failure', agent: 'Unassigned', status: 'Escalated', created: '3h ago', updated: '3h ago' },
    { id: 'TKT-9941', priority: 'Medium', tenant: 'Nexus Trading', reporter: 's.chen', category: 'Engine Config', agent: 'a.turing', status: 'Pending Reply', created: '1d ago', updated: '4h ago' },
    { id: 'TKT-9940', priority: 'Low', tenant: 'Acme Corp', reporter: 'j.smith', category: 'Billing Question', agent: 'Finance Team', status: 'Resolved', created: '2d ago', updated: '1d ago' },
  ];

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const tabs = [
    { id: 'Conversation', label: 'Conversation' },
    { id: 'Internal Notes', label: 'Internal Notes' },
    { id: 'Linked Assets', label: 'Linked Assets' },
  ];

  const activityEvents = [
    { time: '11:45 AM', user: 'e.vance', action: 'REPLY', detail: 'Sent resolution steps to j.smith for TKT-9942' },
    { time: '10:30 AM', user: 'system', action: 'ESCALATE', detail: 'TKT-9943 escalated to Platform Engineering' },
    { time: '09:15 AM', user: 'a.turing', action: 'RESOLVE', detail: 'Closed TKT-9940 (Billing Inquiry)' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === tickets.length ? [] : tickets.map(t => t.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Tenant Operations' }, { label: 'Support Center' }]} />
          <PageHeader 
            title="Enterprise Support Center" 
            subtitle="Manage enterprise escalations, technical support, and customer success queues." 
            action={<PrimaryButton>Create Internal Ticket</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6 flex-1">
          
          {/* Support Dashboard */}
          <StatGrid>
            <MetricCard title="Open Tickets" value="142" />
            <MetricCard title="Critical Tickets" value="3" isPositive={false} change="1" />
            <MetricCard title="Enterprise Escalations" value="12" />
            <MetricCard title="Pending Replies" value="45" />
            <MetricCard title="Avg Resolution Time" value="4.2h" />
            <MetricCard title="Customer Health" value="92/100" />
          </StatGrid>

          {/* Ticket Queue */}
          <AdminCard>
            <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Ticket Queue</h3></div>
            <TableToolbar>
              <TableSearch />
              <div className="flex space-x-2">
                <TableFilters />
              </div>
            </TableToolbar>
            
            <BulkActionBar 
              selectedCount={selectedRows.length} 
              actions={<><SecondaryButton className="py-1">Assign to Me</SecondaryButton><DangerButton className="py-1">Close Selected</DangerButton></>} 
            />

            <DataTable>
              <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                <tr>
                  <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === tickets.length} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Ticket ID" direction="desc" /></th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Tenant</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Agent</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {tickets.map(tkt => (
                  <tr 
                    key={tkt.id} 
                    className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedTicketId === tkt.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedTicketId(tkt.id)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(tkt.id)} onChange={() => handleSelectRow(tkt.id)} /></td>
                    <td className="px-4 py-3 font-mono text-primary font-medium">{tkt.id}</td>
                    <td className="px-4 py-3"><SeverityPill level={tkt.priority as any} /></td>
                    <td className="px-4 py-3"><span className="font-medium text-text">{tkt.tenant}</span><span className="block text-xs text-muted">{tkt.reporter}</span></td>
                    <td className="px-4 py-3 text-textSecondary">{tkt.category}</td>
                    <td className="px-4 py-3 text-textSecondary">{tkt.agent}</td>
                    <td className="px-4 py-3"><StatusBadge status={tkt.status === 'Resolved' ? 'Success' : tkt.status === 'Escalated' ? 'Critical' : tkt.status === 'Open' ? 'Warning' : 'Pending'} label={tkt.status} /></td>
                    <td className="px-4 py-3 text-right text-muted">{tkt.updated}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <TablePagination />
          </AdminCard>

          {/* Ticket Detail Workspace */}
          {selectedTicket && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                    Ticket: <span className="ml-2 font-mono text-primary">{selectedTicket.id}</span>
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Tenant: {selectedTicket.tenant}</span>
                    <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-textSecondary">Category: {selectedTicket.category}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Transfer</SecondaryButton>
                  <SecondaryButton disabled>Escalate</SecondaryButton>
                  <SplitButton mainAction="Reply to Customer" secondaryAction={null} />
                </div>
              </div>

              <div className="px-6 pt-2">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                
                {activeTab === 'Conversation' && (
                  <div className="space-y-4">
                    <div className="bg-surface border border-border rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-text">{selectedTicket.reporter} <span className="text-xs font-normal text-muted ml-2">{selectedTicket.created}</span></span>
                      </div>
                      <p className="text-sm text-textSecondary">
                        Hello, we are seeing 429 Too Many Requests on the /v1/signals endpoint even though our dashboard shows we haven't hit our daily quota. Can you investigate?
                      </p>
                    </div>
                    
                    <div className="border border-border rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">{selectedTicket.agent} <span className="text-xs font-normal text-muted ml-2">{selectedTicket.updated}</span></span>
                      </div>
                      <p className="text-sm text-textSecondary">
                        Hi, I've checked the logs. While you are under the daily quota, there is a burst limit of 100 req/sec which your system exceeded at 10:14 AM. I recommend implementing a backoff strategy.
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <textarea className="w-full bg-surface border border-border rounded p-3 text-sm focus:outline-none focus:border-primary mb-3" placeholder="Type your reply to the customer..." rows={3} />
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-muted">Attachments placeholder (Drag & drop)</span>
                         <PrimaryButton className="text-xs">Send Reply</PrimaryButton>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Internal Notes' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded bg-warning/5 border-warning/30">
                    Internal Engineering Notes placeholder. Invisible to the customer.
                  </div>
                )}

                {activeTab === 'Linked Assets' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Linked Tenant" value={selectedTicket.tenant} /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Linked User" value={selectedTicket.reporter} /></AdminCard>
                    <AdminCard className="p-4 bg-card opacity-50"><KPIBlock label="Linked Signal" value="None" /></AdminCard>
                    <AdminCard className="p-4 bg-card opacity-50"><KPIBlock label="Related Incident" value="None" /></AdminCard>
                  </div>
                )}

              </div>
            </AdminCard>
          )}

          {/* Escalations Workspace */}
          <AdminCard>
             <div className="p-4 border-b border-border bg-surface"><h3 className="text-sm font-semibold text-text uppercase tracking-wider">Department Escalations</h3></div>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
                {[
                  { dept: 'Platform', status: 'Clear', owner: 'DevOps' },
                  { dept: 'Security', status: 'Clear', owner: 'SecOps' },
                  { dept: 'Compliance', status: 'Clear', owner: 'Legal' },
                  { dept: 'Engineering', status: 'Active (1)', owner: 'Core ML' },
                  { dept: 'Billing', status: 'Clear', owner: 'Finance' },
                  { dept: 'Customer Success', status: 'Clear', owner: 'CSM' },
                ].map(esc => (
                  <div key={esc.dept} className={`border border-border p-3 rounded ${esc.status.includes('Active') ? 'bg-warning/10 border-warning/30' : 'bg-surface'}`}>
                     <h4 className="text-xs font-bold text-text mb-1">{esc.dept}</h4>
                     <div className="flex justify-between text-xs">
                        <span className={esc.status.includes('Active') ? 'text-warning font-bold' : 'text-textSecondary'}>{esc.status}</span>
                        <span className="text-muted">{esc.owner}</span>
                     </div>
                  </div>
                ))}
             </div>
          </AdminCard>

        </div>

        {/* BOTTOM PANEL - Recent Support Activity */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Recent Support Operations" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
               <AdminCard className="p-4 bg-card"><KPIBlock label="Tickets Resolved (24h)" value="89" /></AdminCard>
               <AdminCard className="p-4 bg-card"><KPIBlock label="Active Escalations" value="12" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Ticket Inspector</h3>
        
        {selectedTicket ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Ticket</h4>
              <p className="font-mono text-primary font-medium mb-2">{selectedTicket.id}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedTicket.status === 'Resolved' ? 'Success' : selectedTicket.status === 'Escalated' ? 'Critical' : 'Warning'} label={selectedTicket.status} /></div>
                <div className="flex justify-between"><span className="text-muted">Priority</span><SeverityPill level={selectedTicket.priority as any} /></div>
                <div className="flex justify-between"><span className="text-muted">Agent</span><span className="text-text">{selectedTicket.agent}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Tenant Health</h4>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-sm text-text">{selectedTicket.tenant}</span>
                 <span className="text-sm font-bold text-success">98/100</span>
              </div>
              <p className="text-xs text-textSecondary">Enterprise Plan. Renewal in 6 months. High usage volume.</p>
            </AdminCard>
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a ticket to inspect.</div>
        )}
      </div>

    </div>
  );
}

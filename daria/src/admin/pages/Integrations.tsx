import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, KPIBlock,
  DataTable, TableToolbar, TableSearch, TableFilters,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed, StatGrid
} from '../components/ui';

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('Connected Services');

  const tabs = [
    { id: 'Connected Services', label: 'Connected Services' },
    { id: 'OAuth Apps', label: 'OAuth Applications' },
    { id: 'Third-party Integrations', label: 'Third-party Integrations' },
    { id: 'API Clients', label: 'API Clients' },
    { id: 'Retry Queue', label: 'Sync Retry Queue' },
  ];

  const activityEvents = [
    { time: '10:00 AM', user: 'system', action: 'SYNC', detail: 'Completed daily CRM synchronization.' },
    { time: '09:12 AM', user: 'system', action: 'ERROR', detail: 'OAuth token refresh failed for Slack Integration.' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Platform Engineering' }, { label: 'Integrations' }]} />
          <PageHeader 
            title="Integrations & API Clients" 
            subtitle="Manage external webhooks, OAuth applications, and third-party data synchronization." 
            action={<PrimaryButton>Register Integration</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Connected Services' && (
            <div className="space-y-6">
               <StatGrid>
                  <MetricCard title="Active Integrations" value="14" />
                  <MetricCard title="Total Webhooks Delivered" value="1.2M (24h)" />
                  <MetricCard title="Sync Errors" value="3" isPositive={false} change="Requires Attention" />
               </StatGrid>

               <AdminCard>
                  <TableToolbar>
                    <TableSearch />
                    <TableFilters />
                  </TableToolbar>
                  <DataTable>
                    <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                      <tr>
                        <th className="px-4 py-3 text-left">Service Name</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">Connection Health</th>
                        <th className="px-4 py-3 text-left">Sync Status</th>
                        <th className="px-4 py-3 text-left">Last Sync</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {[
                        { name: 'Salesforce CRM', type: 'OAuth2', health: 'Healthy', sync: 'Success', time: '10m ago' },
                        { name: 'Slack Notifications', type: 'Webhook', health: 'Degraded', sync: 'Failing', time: '45m ago' },
                        { name: 'Stripe Billing', type: 'API Key', health: 'Healthy', sync: 'Success', time: '1m ago' },
                        { name: 'Datadog Telemetry', type: 'Agent', health: 'Healthy', sync: 'Continuous', time: 'Live' },
                      ].map(svc => (
                        <tr key={svc.name} className="hover:bg-surface/50 cursor-pointer">
                          <td className="px-4 py-3 font-semibold text-text">{svc.name}</td>
                          <td className="px-4 py-3 text-textSecondary">{svc.type}</td>
                          <td className="px-4 py-3"><HealthIndicator status={svc.health as any} /></td>
                          <td className="px-4 py-3"><StatusBadge status={svc.sync === 'Success' || svc.sync === 'Continuous' ? 'Success' : 'Critical'} label={svc.sync} /></td>
                          <td className="px-4 py-3 text-muted text-xs font-mono">{svc.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
               </AdminCard>
            </div>
          )}

          {['OAuth Apps', 'Third-party Integrations', 'API Clients', 'Retry Queue'].includes(activeTab) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeTab} detailed management placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="Integration Events" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Webhook Retries (24h)" value="142" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Integration Inspector</h3>
        <div className="text-center text-sm text-textSecondary py-12">Select an integration to inspect connection details and OAuth scopes.</div>
      </div>

    </div>
  );
}

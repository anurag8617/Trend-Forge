import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  DataTable, TableToolbar, TableSearch, TableFilters, SortHeader,
  StatGrid, SplitButton, SeverityPill
} from '../components/ui';

export default function Developer() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { id: 'Dashboard', label: 'Developer Dashboard' },
    { id: 'API Registry', label: 'API & Service Registry' },
    { id: 'Config', label: 'Env & Secrets' },
    { id: 'Webhooks', label: 'Webhooks' },
    { id: 'SDKs', label: 'SDKs & Versions' },
    { id: 'Releases', label: 'Release Channels' },
    { id: 'Packages', label: 'Internal Packages' },
  ];

  const activityEvents = [
    { time: '14:20 PM', user: 'j.smith', action: 'API_UPDATE', detail: 'Deprecated v1/signals endpoint in Production' },
    { time: '12:00 PM', user: 'system', action: 'RELEASE', detail: 'TrendForge Python SDK v4.1.0 published to PyPI' },
    { time: 'Yesterday', user: 'e.vance', action: 'SECRETS', detail: 'Rotated Stripe API keys across all environments' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Platform Engineering' }, { label: 'Developer Platform' }]} />
          <PageHeader 
            title="Developer Operations" 
            subtitle="Manage internal APIs, SDK deployments, webhooks, and global service registries." 
            action={<PrimaryButton>Register New Service</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Dashboard' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Registered APIs" value="142" />
                <MetricCard title="Active SDK Versions" value="12" />
                <MetricCard title="Webhook Delivery" value="99.9%" isPositive={true} change="Healthy" />
                <MetricCard title="Internal Packages" value="84" />
              </StatGrid>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Target Environments" value="Prod, Staging, Dev, GovCloud" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Developer Docs" value="Build Passing (v4.2)" /></AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'API Registry' && (
            <AdminCard>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3 text-left">API Name</th>
                    <th className="px-4 py-3 text-left">Internal Service</th>
                    <th className="px-4 py-3 text-left">Latest Version</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {[
                    { name: 'Core Signals API', svc: 'svc-signals', ver: 'v2', status: 'Active', owner: 'Data Eng' },
                    { name: 'Forecast Generation API', svc: 'svc-quantum', ver: 'v1', status: 'Active', owner: 'ML Ops' },
                    { name: 'Legacy Ingestion', svc: 'svc-ingest-old', ver: 'v0.9', status: 'Deprecated', owner: 'Platform' },
                  ].map(api => (
                    <tr key={api.name} className="hover:bg-surface/50 cursor-pointer">
                      <td className="px-4 py-3 font-semibold text-text">{api.name}</td>
                      <td className="px-4 py-3 font-mono text-muted text-xs">{api.svc}</td>
                      <td className="px-4 py-3 font-mono text-primary text-xs">{api.ver}</td>
                      <td className="px-4 py-3"><StatusBadge status={api.status === 'Active' ? 'Success' : 'Warning'} label={api.status} /></td>
                      <td className="px-4 py-3 text-textSecondary">{api.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </AdminCard>
          )}

          {activeTab === 'Config' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminCard className="p-6">
                 <SectionHeader title="Environment Variables (Read-Only)" />
                 <div className="mt-4 p-4 bg-surface border border-border rounded font-mono text-xs space-y-2 opacity-80">
                    <div className="flex justify-between"><span className="text-primary">NODE_ENV</span><span className="text-text">production</span></div>
                    <div className="flex justify-between"><span className="text-primary">REDIS_URL</span><span className="text-muted">redacted</span></div>
                    <div className="flex justify-between"><span className="text-primary">ML_INFERENCE_ENDPOINT</span><span className="text-text">https://ai.trendforge.internal</span></div>
                 </div>
              </AdminCard>
              <AdminCard className="p-6">
                 <SectionHeader title="Secrets Management" />
                 <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded mt-4">
                   HashiCorp Vault Integration Placeholder
                 </div>
              </AdminCard>
            </div>
          )}

          {activeTab === 'SDKs' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { lang: 'Python', ver: 'v4.1.0', status: 'Stable', pkg: 'trendforge-py' },
                 { lang: 'Node.js', ver: 'v3.8.2', status: 'Stable', pkg: '@trendforge/sdk' },
                 { lang: 'Go', ver: 'v1.0.0-beta', status: 'Beta', pkg: 'trendforge-go' },
               ].map(sdk => (
                 <AdminCard key={sdk.lang} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="font-bold text-text">{sdk.lang} SDK</h4>
                       <StatusBadge status={sdk.status === 'Stable' ? 'Success' : 'Warning'} label={sdk.status} />
                    </div>
                    <div className="text-xs font-mono text-primary mb-1">{sdk.ver}</div>
                    <div className="text-xs text-muted">Registry: {sdk.pkg}</div>
                 </AdminCard>
               ))}
            </div>
          )}

          {['Webhooks', 'Releases', 'Packages'].includes(activeTab) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeTab} detailed view placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Platform Developer Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="API Commits (24h)" value="42" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Active Developers" value="18" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">API Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Core Signals API</h4>
            <p className="font-mono text-primary text-sm mb-2">v2.4.1</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status="Success" label="Active" /></div>
              <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text font-medium">Data Eng</span></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Dependencies</h4>
            <ul className="text-xs text-muted space-y-1">
              <li>• PostgreSQL Cluster</li>
              <li>• Redis Cache layer</li>
              <li>• Auth Gateway</li>
            </ul>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

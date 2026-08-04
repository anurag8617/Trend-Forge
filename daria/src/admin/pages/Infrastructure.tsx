import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  StatGrid, SplitButton
} from '../components/ui';

export default function Infrastructure() {
  const [activeTab, setActiveTab] = useState('Database');

  const tabs = [
    { id: 'Database', label: 'Database Operations' },
    { id: 'Cache', label: 'Redis Cache' },
    { id: 'Object Storage', label: 'Object Storage' },
    { id: 'Network', label: 'Network & CDN' },
    { id: 'Deployments', label: 'Deployments' },
    { id: 'Schedulers', label: 'Schedulers & Cron' },
  ];

  const activityEvents = [
    { time: '02:00 AM', user: 'system', action: 'BACKUP', detail: 'Automated PostgreSQL snapshot completed successfully.' },
    { time: '01:30 AM', user: 'system', action: 'SCALE', detail: 'Autoscaler increased API Gateway pods to 12.' },
    { time: 'Yesterday', user: 'd.miller', action: 'DEPLOY', detail: 'Deployed Infrastructure v4.2.1 Terraform Module.' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Infrastructure' }]} />
          <PageHeader 
            title="Infrastructure Operations" 
            subtitle="Manage databases, caching layers, storage buckets, and core network configurations." 
            action={<PrimaryButton>View Terraform State</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 space-y-6">
          
          {activeTab === 'Database' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Active Connections" value="1,241" />
                <MetricCard title="Queries / Sec" value="4.2k" />
                <MetricCard title="Replication Lag" value="0ms" isPositive={true} change="Healthy" />
                <MetricCard title="Storage Used" value="42%" />
              </StatGrid>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Cluster Health" value="Healthy (3 Nodes)" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Last Backup" value="2 Hours Ago" /></AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'Cache' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Redis Memory" value="14.2 GB" />
                <MetricCard title="Hit Rate" value="98.4%" />
                <MetricCard title="Evictions" value="14" isPositive={false} change="Warning" />
                <MetricCard title="Status" value="Healthy" />
              </StatGrid>
            </div>
          )}

          {activeTab === 'Object Storage' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Total Usage" value="4.2 TB" />
                <MetricCard title="Buckets" value="12" />
                <MetricCard title="Uploads (24h)" value="142k" />
                <MetricCard title="Downloads (24h)" value="8.4M" />
              </StatGrid>
            </div>
          )}

          {activeTab === 'Network' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Active Regions" value="us-east-1, eu-west-1" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="Bandwidth (24h)" value="42.1 TB" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="API Gateway" value="Healthy" /></AdminCard>
                 <AdminCard className="p-4 bg-card"><KPIBlock label="CDN Cache Hit" value="84%" /></AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'Deployments' && (
            <AdminCard className="p-6">
               <SectionHeader title="Deployment History" />
               <div className="space-y-4 mt-4">
                  {[
                    { id: 'dep-102', env: 'Production', version: 'v5.12.4', status: 'Success', time: 'Yesterday' },
                    { id: 'dep-101', env: 'Production', version: 'v5.12.3', status: 'Rolled Back', time: '3 Days Ago' },
                    { id: 'dep-100', env: 'Production', version: 'v5.12.2', status: 'Success', time: 'Last Week' },
                  ].map(dep => (
                    <div key={dep.id} className="flex justify-between items-center p-4 border border-border bg-surface rounded">
                      <div>
                        <div className="flex space-x-3 items-center mb-1">
                          <span className="font-bold text-text">{dep.version}</span>
                          <StatusBadge status={dep.status === 'Success' ? 'Success' : 'Warning'} label={dep.status} />
                        </div>
                        <div className="text-xs text-muted font-mono">{dep.id} • {dep.env} • {dep.time}</div>
                      </div>
                      <SecondaryButton className="text-xs" disabled>Rollback to this version</SecondaryButton>
                    </div>
                  ))}
               </div>
            </AdminCard>
          )}

          {activeTab === 'Schedulers' && (
            <AdminCard className="p-6">
               <SectionHeader title="Cron Jobs & Schedulers" />
               <div className="space-y-3 mt-4">
                  {[
                    { name: 'Data Retention Purge', schedule: '0 0 * * *', last: 'Success', next: 'In 12 hours' },
                    { name: 'Model Weights Sync', schedule: '*/30 * * * *', last: 'Success', next: 'In 14 mins' },
                    { name: 'Billing Aggregation', schedule: '0 1 1 * *', last: 'Success', next: 'Next Month' },
                  ].map(cron => (
                    <div key={cron.name} className="flex justify-between items-center p-3 border border-border bg-surface rounded">
                       <div>
                         <div className="font-semibold text-text text-sm">{cron.name}</div>
                         <div className="font-mono text-xs text-primary mt-1">{cron.schedule}</div>
                       </div>
                       <div className="text-right text-xs space-y-1">
                         <div className="text-muted">Last Run: <span className="text-success">{cron.last}</span></div>
                         <div className="text-textSecondary">Next Run: {cron.next}</div>
                       </div>
                    </div>
                  ))}
               </div>
            </AdminCard>
          )}
          
        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="Infrastructure Events" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="DB CPU Utilization" value="42%" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Cluster Autoscaling" value="Enabled" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Infra Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">System Health</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Database</span><HealthIndicator status="Healthy" /></div>
              <div className="flex justify-between"><span className="text-muted">Cache</span><HealthIndicator status="Healthy" /></div>
              <div className="flex justify-between"><span className="text-muted">Storage</span><HealthIndicator status="Healthy" /></div>
              <div className="flex justify-between"><span className="text-muted">Network</span><HealthIndicator status="Healthy" /></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Active Incidents</h4>
            <div className="text-xs text-muted italic">No active infrastructure incidents.</div>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

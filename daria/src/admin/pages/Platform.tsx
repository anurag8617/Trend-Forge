import { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, KPIBlock,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed } from '../components/ui';

export default function Platform() {
  const [activeTab, setActiveTab] = useState('Platform Status');

  const tabs = [
    { id: 'Platform Status', label: 'Platform Status' },
    { id: 'Global Configuration', label: 'Global Configuration' },
    { id: 'Maintenance Mode', label: 'Maintenance Mode' },
    { id: 'Backup Center', label: 'Backup & Recovery' },
    { id: 'System Configuration', label: 'System Configuration' },
  ];

  const activityEvents = [
    { time: '02:00 AM', user: 'system', action: 'BACKUP', detail: 'Global infrastructure snapshot stored to Glacier.' },
    { time: '01:30 AM', user: 'system', action: 'CONFIG', detail: 'Runtime telemetry aggregation synced.' },
    { time: 'Yesterday', user: 'SecOps', action: 'MAINTENANCE', detail: 'Scheduled emergency patch for cluster B.' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Platform Configuration' }, { label: 'Platform Controls' }]} />
          <PageHeader 
            title="Platform Control Center" 
            subtitle="Manage global runtime states, maintenance windows, and disaster recovery." 
            action={<PrimaryButton>View Status Page</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Platform Status' && (
            <AdminCard className="p-6">
               <SectionHeader title="Global Platform Topology" />
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                 <KPIBlock label="Platform Version" value="v5.12.4 (Stable)" />
                 <KPIBlock label="Release Channel" value="Production" />
                 <KPIBlock label="Environment" value="Production (Isolated)" />
                 <KPIBlock label="Primary Cluster" value="us-east-1-core" />
                 <KPIBlock label="Deployment Ring" value="Ring 0 (Global)" />
                 <KPIBlock label="Edge Network" value="Cloudflare Enterprise" />
               </div>
            </AdminCard>
          )}

          {activeTab === 'Maintenance Mode' && (
            <div className="space-y-6">
               <AdminCard className="p-6 border-warning/30 bg-warning/5">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-warning mb-1">Emergency Maintenance Mode</h3>
                      <p className="text-xs text-textSecondary">Activating maintenance mode forces all traffic to a static fallback page and terminates active connections.</p>
                    </div>
                    <DangerButton disabled>Engage Maintenance Mode</DangerButton>
                 </div>
               </AdminCard>

               <AdminCard className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-text mb-1">Scheduled Maintenance Windows</h3>
                      <p className="text-xs text-textSecondary">Notify tenants of upcoming scheduled downtime.</p>
                    </div>
                    <SecondaryButton disabled>Schedule Window</SecondaryButton>
                 </div>
                 <div className="text-sm text-textSecondary text-center py-6 border border-dashed border-border rounded">
                   No scheduled maintenance.
                 </div>
               </AdminCard>

               <AdminCard className="p-6">
                 <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-text mb-1">Read-Only Mode</h3>
                      <p className="text-xs text-textSecondary">Disables all writes (POST/PUT/DELETE) across the entire platform. Useful for database migrations.</p>
                    </div>
                    <div className="w-12 h-6 bg-surface rounded-full border border-border cursor-not-allowed"></div>
                 </div>
               </AdminCard>
            </div>
          )}

          {activeTab === 'Backup Center' && (
            <AdminCard className="p-6">
               <SectionHeader title="Disaster Recovery & Backups" />
               <div className="grid grid-cols-2 gap-6 mt-4 opacity-70">
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Global Backup Schedule</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Every 4 Hours" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Retention Policy</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="30 Days (Hot) / 7 Years (Cold)" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Recovery Point Objective (RPO)</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="4 Hours" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Recovery Time Objective (RTO)</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="1 Hour" /></div>
               </div>
               <div className="mt-6 text-sm text-textSecondary text-center py-8 border border-dashed border-border rounded">
                 Restore Points Ledger Placeholder
               </div>
            </AdminCard>
          )}

          {['Global Configuration', 'System Configuration'].includes(activeTab) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeTab} detailed view placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="Platform Audits" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Platform Uptime" value="142 Days" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Control Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">System Lock</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Master Switch</span><StatusBadge status="Success" label="Unlocked" /></div>
              <div className="flex justify-between"><span className="text-muted">Write Status</span><StatusBadge status="Success" label="Active" /></div>
            </div>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed, SplitButton
} from '../components/ui';

export default function Licenses() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { id: 'Overview', label: 'License Overview' },
    { id: 'Plan Management', label: 'Plan Management' },
    { id: 'Feature Entitlements', label: 'Feature Entitlements' },
    { id: 'Usage Limits', label: 'Usage Limits' },
    { id: 'Renewals', label: 'Renewals' },
  ];

  const activityEvents = [
    { time: '14:20 PM', user: 'system', action: 'LICENSE', detail: 'Generated new Enterprise key for Nexus Trading' },
    { time: '09:00 AM', user: 'system', action: 'EXPIRE', detail: 'Revoked 12 expired trial licenses' },
    { time: 'Yesterday', user: 'a.turing', action: 'ENTITLEMENT', detail: 'Enabled HoloBidder module for Acme Corp' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Commercial Operations' }, { label: 'Licenses' }]} />
          <PageHeader 
            title="License & Entitlement Management" 
            subtitle="Manage cryptographic license keys, feature flags, and module access limits." 
            action={<PrimaryButton>Generate License Key</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 flex-1 space-y-6">
          
          {activeTab === 'Overview' && (
            <AdminCard className="p-6">
              <SectionHeader title="Cryptographic Licenses" />
              <div className="space-y-4 mt-4">
                 {[
                   { key: 'LIC-ACME-892A-4F', org: 'Acme Corp', env: 'Production', edition: 'Enterprise', seats: '138', modules: 'All', exp: '2027-01-15', status: 'Valid' },
                   { key: 'LIC-NEXUS-11B4-9C', org: 'Nexus Trading', env: 'Production', edition: 'Enterprise', seats: '874', modules: 'All', exp: '2026-11-04', status: 'Valid' },
                   { key: 'LIC-GMS-DEV-99X1', org: 'Global Media', env: 'Development', edition: 'Scale', seats: '42', modules: 'Core', exp: '2026-08-01', status: 'Expiring Soon' },
                 ].map(lic => (
                   <div key={lic.key} className="flex justify-between items-center p-4 border border-border bg-surface rounded">
                     <div>
                       <div className="flex space-x-3 items-center mb-1">
                         <span className="font-mono font-bold text-primary">{lic.key}</span>
                         <StatusBadge status={lic.status === 'Valid' ? 'Success' : 'Warning'} label={lic.status} />
                       </div>
                       <div className="text-xs text-muted">
                         <span className="font-semibold text-text">{lic.org}</span> • {lic.edition} • {lic.env} • {lic.seats} Seats
                       </div>
                     </div>
                     <div className="text-right text-xs">
                        <div className="text-textSecondary mb-1">Expires: <span className="font-mono text-text">{lic.exp}</span></div>
                        <SecondaryButton className="text-xs py-1" disabled>Revoke</SecondaryButton>
                     </div>
                   </div>
                 ))}
              </div>
            </AdminCard>
          )}

          {activeTab === 'Plan Management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {['Starter', 'Professional', 'Scale / Enterprise', 'Government (FedRAMP)'].map(plan => (
                 <AdminCard key={plan} className="p-6 text-center">
                    <h3 className="font-bold text-lg text-text mb-2">{plan}</h3>
                    <p className="text-xs text-textSecondary mb-4">Standard entitlement mapping for {plan} tier.</p>
                    <SecondaryButton className="w-full text-xs">Edit Plan Matrix</SecondaryButton>
                 </AdminCard>
               ))}
            </div>
          )}

          {activeTab === 'Feature Entitlements' && (
            <AdminCard className="p-6">
              <SectionHeader title="Global Feature Flags & Entitlements" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                 {[
                   'Ghost Mode', 'Quantum Guess', 'Bio-Feel', 'DisinfoDefender', 'HoloBidder',
                   'Signals', 'Forecasts', 'Evidence Packs', 'API Access', 'Enterprise Exports',
                   'White Labeling', 'Priority Support', 'Government Features (GovCloud)'
                 ].map(feature => (
                   <div key={feature} className="flex justify-between items-center p-3 border border-border rounded bg-surface text-sm">
                     <span className="text-text">{feature}</span>
                     <div className="w-8 h-4 bg-primary rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                   </div>
                 ))}
              </div>
            </AdminCard>
          )}

          {activeTab === 'Usage Limits' && (
            <div className="space-y-6">
              <AdminCard className="p-6">
                 <h4 className="font-bold text-text mb-4">Global API Rate Limits</h4>
                 <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Current Usage</span><span>8.4k / 10k (Soft Limit)</span></div>
                      <div className="w-full h-2 bg-surface rounded overflow-hidden"><div className="bg-warning h-full w-[84%]"></div></div>
                    </div>
                 </div>
              </AdminCard>
              <div className="text-sm text-textSecondary text-center py-8 border border-dashed border-border rounded">
                Detailed Limits Workspace Placeholder (Soft Limits, Hard Limits, Warning Thresholds)
              </div>
            </div>
          )}

          {activeTab === 'Renewals' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Renewals Operations Placeholder (Upcoming, Expired, Pending, Grace Periods)
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Licensing Activity" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Upcoming Renewals (30d)" value="24" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="License Changes" value="4" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Entitlement Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">System Defaults</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Grace Period</span><span className="text-text font-mono">14 Days</span></div>
              <div className="flex justify-between"><span className="text-muted">Hard Enforcement</span><span className="text-success font-bold">Active</span></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Revenue Impact</h4>
            <p className="text-xs text-textSecondary">12 licenses expiring in the next 30 days. Estimated MRR risk: $142,000.</p>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

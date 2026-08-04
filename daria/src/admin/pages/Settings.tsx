import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, KPIBlock,
  Breadcrumb, AuditTimeline, ActivityFeed, SplitButton,
  SecondaryNavigation
} from '../components/ui';

export default function Settings() {
  const [activeView, setActiveView] = useState('General');

  const navItems = [
    { id: 'General', label: 'General Settings' },
    { id: 'Authentication', label: 'Authentication' },
    { id: 'Security Defaults', label: 'Security Defaults' },
    { id: 'Data Retention', label: 'Data Retention' },
    { id: 'Compliance Defaults', label: 'Compliance' },
    { id: 'DARIA Defaults', label: 'DARIA Defaults' },
    { id: 'Engine Defaults', label: 'Engine Defaults' },
    { id: 'Notifications', label: 'Notifications' },
    { id: 'Integrations', label: 'Global Integrations' },
    { id: 'Feature Defaults', label: 'Feature Defaults' },
  ];

  const activityEvents = [
    { time: '14:20 PM', user: 'admin@trendforge.com', action: 'CONFIG', detail: 'Updated Global Data Retention policy from 90 to 180 days' },
    { time: '09:00 AM', user: 'system', action: 'SECURITY', detail: 'Rotated internal JWT signing keys' },
    { time: 'Yesterday', user: 'e.vance', action: 'DARIA', detail: 'Changed Default Persona to "Enterprise Analyst"' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT SIDEBAR - Secondary Navigation */}
      <SecondaryNavigation items={navItems} activeItem={activeView} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Platform Configuration' }, { label: 'Global Settings' }]} />
          <div className="flex justify-between items-end mt-4 mb-6 pb-4 border-b border-border">
            <div>
              <h1 className="text-2xl font-bold text-text mb-2">Global Settings: {activeView}</h1>
              <p className="text-sm text-textSecondary">Manage organizational defaults, security policies, and platform-wide configurations.</p>
            </div>
            <div className="flex space-x-2">
              <SecondaryButton disabled>Discard Changes</SecondaryButton>
              <SplitButton mainAction="Save Configuration" secondaryAction={null} />
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex-1 space-y-6 opacity-80">
          
          {activeView === 'General' && (
            <AdminCard className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Platform Name</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="TrendForge Enterprise" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Environment</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Production" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Default Timezone</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="UTC (Coordinated Universal Time)" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Default Locale</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="en-US" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Date Format</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="YYYY-MM-DD HH:mm:ss" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Regional Routing</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Global Edge Network" /></div>
              </div>
            </AdminCard>
          )}

          {activeView === 'Authentication' && (
            <AdminCard className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Password Policy</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Strict (12 char, complex)" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Session Idle Timeout</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="15 Minutes" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">MFA Policy</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Enforced (Hardware Key Preferred)" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">SSO Providers</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Okta, Entra ID, Google Workspace" /></div>
                <div className="col-span-2 flex justify-between items-center p-3 border border-border rounded bg-surface text-sm">
                   <span className="text-text">Enable Passkeys (WebAuthn)</span>
                   <div className="w-8 h-4 bg-primary rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                </div>
              </div>
            </AdminCard>
          )}

          {activeView === 'Security Defaults' && (
            <AdminCard className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Global API Rate Limit</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="10000 req / minute" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Token Expiration</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="1 Hour" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Secrets Rotation Policy</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Automated (Every 30 Days)" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">IP Allow Lists</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Tenant Defined" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Blocked Countries (OFAC)</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Strict Enforcement" /></div>
              </div>
            </AdminCard>
          )}

          {activeView === 'Data Retention' && (
            <AdminCard className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Active Data Retention</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="180 Days" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Cold Storage Archiving</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="7 Years" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Evidence Packs Retention</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Indefinite (Legal Hold)" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Audit Log Retention</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="7 Years (WORM Storage)" /></div>
              </div>
            </AdminCard>
          )}

          {activeView === 'DARIA Defaults' && (
            <AdminCard className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Default Base Model</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="GPT-4o-TrendForge-Custom" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Default Persona</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Enterprise Analyst" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Memory Policy</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="Tenant Isolation Strict" /></div>
                <div><label className="block text-xs font-bold text-textSecondary mb-2">Conversation Limits</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="100 Messages / Thread" /></div>
              </div>
            </AdminCard>
          )}

          {/* Placeholders for remaining views */}
          {['Compliance Defaults', 'Engine Defaults', 'Notifications', 'Integrations', 'Feature Defaults'].includes(activeView) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeView} configuration workspace placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="Configuration Audit Trail" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Pending Changes" value="0" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Policy Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Category</h4>
            <p className="font-medium text-text mb-2">{activeView}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text font-medium">Platform Engineering</span></div>
              <div className="flex justify-between"><span className="text-muted">Last Modified</span><span className="text-text font-mono">14:20 PM</span></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Impact Radius</h4>
            <p className="text-xs text-textSecondary">Modifying policies in this category will enforce new limits across all 1,241 active tenant organizations.</p>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

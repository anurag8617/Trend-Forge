import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SecondaryNavigation, SplitButton,
  SeverityPill, JSONViewer
} from '../components/ui';

export default function Daria() {
  const [activeView, setActiveView] = useState('Overview');
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>('cnv-8a9f2bc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const navItems = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Conversation Monitor', label: 'Conversations' },
    { id: 'Prompt Management', label: 'Prompt Management' },
    { id: 'Memory Center', label: 'Memory Center' },
    { id: 'Knowledge Sources', label: 'Knowledge Sources' },
    { id: 'Voice Operations', label: 'Voice Operations' },
    { id: 'Model Configuration', label: 'Model Configuration' },
    { id: 'Safety Center', label: 'Safety Center' },
    { id: 'Guardrails', label: 'Guardrails' },
    { id: 'Model Evaluations', label: 'Model Evaluations' },
    { id: 'Deployments', label: 'Deployments' },
    { id: 'Experiments', label: 'Experiments' },
  ];

  const conversations = [
    { id: 'cnv-8a9f2bc', tenant: 'Acme Corp', user: 'j.smith', duration: '14m', messages: 24, engine: 'Ghost Mode', status: 'Active', created: '10m ago' },
    { id: 'cnv-9b2c1de', tenant: 'Nexus Trading', user: 's.chen', duration: '2m', messages: 4, engine: 'Quantum Guess', status: 'Ended', created: '1h ago' },
    { id: 'cnv-3f4g5hj', tenant: 'Global Media', user: 'm.cole', duration: '45m', messages: 112, engine: 'Standard', status: 'Flagged', created: '2h ago' },
    { id: 'cnv-7k8l9z0', tenant: 'Acme Corp', user: 'e.vance', duration: '1m', messages: 2, engine: 'Standard', status: 'Ended', created: '5h ago' },
  ];

  const selectedConversation = conversations.find(c => c.id === selectedConvoId) || conversations[0];

  const activityEvents = [
    { time: '10:45 AM', user: 'system', action: 'SAFETY', detail: 'Blocked prompt due to PII detection in cnv-3f4g5hj' },
    { time: '10:12 AM', user: 'a.turing', action: 'DEPLOY', detail: 'Deployed DARIA Persona v4.2.1 to Production' },
    { time: '09:30 AM', user: 'system', action: 'MEMORY', detail: 'Garbage collection completed. 1.2M short-term memories archived.' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === conversations.length ? [] : conversations.map(c => c.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT SIDEBAR - Secondary Navigation */}
      <SecondaryNavigation items={navItems} activeItem={activeView} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'DARIA Operations' }, { label: activeView }]} />
          <div className="flex justify-between items-end mt-4 mb-6 pb-4 border-b border-border">
            <div>
              <h1 className="text-2xl font-bold text-text mb-2">{activeView}</h1>
              {activeView !== 'Overview' && (
                <div className="flex space-x-3 items-center">
                  <StatusBadge status="Running" />
                  <span className="text-xs font-mono text-muted">Model: GPT-4o-TrendForge-Custom</span>
                  <span className="text-xs font-mono text-muted">Env: Production</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <SecondaryButton disabled>Sync</SecondaryButton>
              <SplitButton mainAction="Lockdown DARIA" secondaryAction={null} />
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex-1">
          
          {activeView === 'Overview' && (
            <div className="space-y-6">
              <AdminCard className="p-6 bg-[#0a0f1c] border-primary/20 shadow-[0_0_20px_rgba(38,231,255,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-text mb-1">DARIA AI Core Operational</h2>
                    <p className="text-sm text-primary font-mono">GPT-4o-TrendForge-Custom (v4.2.1)</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Availability</div>
                    <div className="text-2xl font-bold text-success">99.995%</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 border-t border-border pt-6">
                  <KPIBlock label="Environment" value="Production" />
                  <KPIBlock label="Status" value="Active" />
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Response</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Memory</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Knowledge</span><HealthIndicator status="Healthy" /></div>
                  <div className="flex flex-col"><span className="text-xs text-muted font-medium mb-1">Voice</span><HealthIndicator status="Healthy" /></div>
                </div>
              </AdminCard>

              <StatGrid>
                <MetricCard title="Avg Response Time" value="840ms" />
                <MetricCard title="Token Usage (24h)" value="142.4M" />
                <MetricCard title="Memory Usage" value="12.4 TB" />
                <MetricCard title="Active Sessions" value="4,821" />
              </StatGrid>
            </div>
          )}

          {activeView === 'Conversation Monitor' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <AdminCard>
                  <TableToolbar>
                    <TableSearch />
                    <TableFilters />
                  </TableToolbar>
                  
                  <DataTable>
                    <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                      <tr>
                        <th className="px-4 py-3"><SortHeader label="Conversation ID" direction="desc" /></th>
                        <th className="px-4 py-3 text-left">Tenant / User</th>
                        <th className="px-4 py-3 text-left">Engine</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-right">Messages</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {conversations.map(cnv => (
                        <tr 
                          key={cnv.id} 
                          className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedConvoId === cnv.id ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedConvoId(cnv.id)}
                        >
                          <td className="px-4 py-3 font-mono text-primary font-medium">{cnv.id}</td>
                          <td className="px-4 py-3"><span className="font-medium text-text">{cnv.tenant}</span><span className="block text-xs text-muted">{cnv.user}</span></td>
                          <td className="px-4 py-3 text-textSecondary">{cnv.engine}</td>
                          <td className="px-4 py-3"><StatusBadge status={cnv.status === 'Active' ? 'Success' : cnv.status === 'Flagged' ? 'Critical' : 'Pending'} label={cnv.status} /></td>
                          <td className="px-4 py-3 text-right text-muted">{cnv.messages}</td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                  <TablePagination />
                </AdminCard>
              </div>

              {/* Conversation Detail Inspector */}
              <div className="w-full lg:w-[400px] flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card h-full">
                  <div className="flex justify-between items-start border-b border-border pb-3 mb-4">
                     <div>
                       <h4 className="text-sm font-semibold text-text">Session Inspector</h4>
                       <span className="text-xs font-mono text-primary">{selectedConversation.id}</span>
                     </div>
                     <PrimaryButton className="text-xs py-1 px-2" disabled>Kill Session</PrimaryButton>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Duration:</span><span>{selectedConversation.duration}</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Memory Access:</span><span className="text-success">Enabled</span></div>
                     <div className="flex justify-between text-xs text-textSecondary"><span className="font-bold">Knowledge Retrieval:</span><span className="text-success">2 Docs</span></div>
                     
                     <div className="border border-border rounded mt-4 overflow-hidden">
                       <div className="bg-surface px-3 py-2 text-xs font-bold text-text uppercase">Timeline</div>
                       <div className="p-3 text-xs space-y-3 font-mono text-muted bg-[#0A0F1C]">
                          <div>[10:00:01] User: "Analyze market shift"</div>
                          <div>[10:00:02] ToolCall: get_forecast(vix)</div>
                          <div>[10:00:04] ToolResponse: 200 OK</div>
                          <div className="text-primary">[10:00:05] DARIA: "Based on the recent..."</div>
                       </div>
                     </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === 'Prompt Management' && (
            <div className="space-y-6">
              {[
                { name: 'System Prompt', version: 'v4.2.1', updated: '10m ago', status: 'Active' },
                { name: 'Persona Prompt', version: 'v4.2.1', updated: '10m ago', status: 'Active' },
                { name: 'Tool Prompt (Ghost Mode)', version: 'v2.1.0', updated: '3d ago', status: 'Active' },
                { name: 'Evaluation Prompt', version: 'v1.4.0', updated: '1w ago', status: 'Active' },
              ].map(prompt => (
                <AdminCard key={prompt.name} className="p-4 bg-card border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-bold text-text text-lg">{prompt.name}</h3>
                       <div className="flex space-x-3 text-xs font-mono text-muted mt-1">
                          <span>{prompt.version}</span>
                          <span>Updated {prompt.updated}</span>
                       </div>
                    </div>
                    <div className="flex space-x-2">
                       <SecondaryButton className="text-xs" disabled>Rollback</SecondaryButton>
                       <SecondaryButton className="text-xs" disabled>Publish</SecondaryButton>
                    </div>
                  </div>
                  <div className="bg-surface border border-border rounded p-3 text-xs font-mono text-textSecondary opacity-70">
                    Prompt content editor placeholder. System instructions dictate DARIA's core behavior, ethical constraints, and operational guidelines.
                  </div>
                </AdminCard>
              ))}
            </div>
          )}

          {activeView === 'Memory Center' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'Short Term Memory', type: 'Session', usage: '4.2 GB', status: 'Active' },
                 { name: 'Long Term Memory', type: 'Tenant', usage: '8.4 TB', status: 'Active' },
                 { name: 'Shared Knowledge Cache', type: 'Global', usage: '1.2 TB', status: 'Active' },
                 { name: 'Entity Resolution Index', type: 'Graph', usage: '412 GB', status: 'Building' },
               ].map(mem => (
                 <AdminCard key={mem.name} className="p-4">
                    <h4 className="font-bold text-text mb-2">{mem.name}</h4>
                    <div className="flex justify-between text-xs text-textSecondary mb-4">
                      <span>Type: <span className="font-mono text-text">{mem.type}</span></span>
                      <span>Usage: <span className="font-mono text-text">{mem.usage}</span></span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                       <StatusBadge status={mem.status === 'Active' ? 'Success' : 'Warning'} label={mem.status} />
                       <SecondaryButton className="text-xs py-1" disabled>Flush Cache</SecondaryButton>
                    </div>
                 </AdminCard>
               ))}
            </div>
          )}

          {activeView === 'Knowledge Sources' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Indexed Documents" value="14.2M" />
                <MetricCard title="Evidence Packs" value="4,241" />
                <MetricCard title="External Integrations" value="12 Active" />
              </StatGrid>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Signals Knowledgebase', 'Forecast Models', 'Internal Guidelines', 'Tenant Data Isolation Layer'].map(src => (
                  <AdminCard key={src} className="p-4 flex justify-between items-center bg-card">
                    <div>
                      <h4 className="font-semibold text-text">{src}</h4>
                      <p className="text-xs text-muted">Vector Database Synced</p>
                    </div>
                    <div className="text-right">
                       <StatusBadge status="Success" label="Healthy" />
                       <div className="text-xs text-muted mt-1">Last Sync: Just now</div>
                    </div>
                  </AdminCard>
                ))}
              </div>
            </div>
          )}

          {activeView === 'Model Configuration' && (
            <AdminCard className="p-6">
               <SectionHeader title="LLM Hyperparameters" />
               <div className="grid grid-cols-2 gap-6 mt-4 opacity-70">
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Model Provider</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="OpenAI / Azure" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Model Name</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm" value="gpt-4o-2024-05-13" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Temperature</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.2" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Max Tokens</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="4096" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Top P</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.95" /></div>
                 <div><label className="block text-xs font-bold text-textSecondary mb-2">Frequency Penalty</label><input type="text" disabled className="w-full bg-surface border border-border rounded p-2 text-sm font-mono" value="0.0" /></div>
               </div>
            </AdminCard>
          )}

          {activeView === 'Safety Center' && (
            <div className="space-y-6">
              <StatGrid>
                <MetricCard title="Moderation Blocks" value="412" isPositive={false} change="High" />
                <MetricCard title="Sensitive Requests" value="1,241" />
                <MetricCard title="Escalations" value="12" />
                <MetricCard title="Policy Version" value="v2.4 (Strict)" />
              </StatGrid>
              <AdminCard className="p-4 border-danger/30 bg-danger/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="Critical" />
                  <span className="text-xs font-mono text-muted">SEC-EVT-104</span>
                </div>
                <h4 className="font-bold text-danger mb-1">PII Leak Prevention Triggered</h4>
                <p className="text-xs text-textSecondary mb-4">Output filter blocked DARIA from emitting internal tenant UUIDs to a low-privileged session.</p>
              </AdminCard>
            </div>
          )}

          {/* Placeholders for remaining views */}
          {['Voice Operations', 'Guardrails', 'Model Evaluations', 'Deployments', 'Experiments'].includes(activeView) && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              {activeView} workspace configuration placeholder.
            </div>
          )}

        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30 mt-auto">
          <SectionHeader title="DARIA Global Audit Timeline" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="System Prompt Updates" value="1 (Last 24h)" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Safety Events" value="142" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">AI Operations Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Model Engine</h4>
            <p className="font-mono text-primary text-sm mb-2">GPT-4o-TrendForge-Custom</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Environment</span><span className="text-text font-mono">Production</span></div>
              <div className="flex justify-between"><span className="text-muted">Health</span><HealthIndicator status="Healthy" /></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Linked Services</h4>
            <ul className="text-xs text-primary space-y-2">
              <li className="cursor-pointer hover:underline">Tool: Ghost Mode Executor</li>
              <li className="cursor-pointer hover:underline">Tool: Quantum Query</li>
              <li className="cursor-pointer hover:underline">API: Knowledge Retrieval</li>
            </ul>
          </AdminCard>

          <AdminCard className="p-4 bg-warning/5 border-warning/30">
            <h4 className="text-xs font-bold text-warning uppercase mb-2">Warnings</h4>
            <p className="text-xs text-textSecondary">High token usage detected in tenant tnt_gms44 over the last 10 minutes.</p>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, HealthIndicator,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard, KPIBlock,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, AuditTimeline, ActivityFeed,
  RowSelectionCheckbox, BulkActionBar, StatGrid, SeverityPill, SplitButton
} from '../components/ui';

export default function Monitoring() {
  const [activeTab, setActiveTab] = useState('Global Health');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('svc-api');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const services = [
    { id: 'svc-api', name: 'API Gateway', status: 'Running', health: 'Healthy', version: 'v5.12.4', latency: '42ms', restarts: 0, owner: 'Platform Eng' },
    { id: 'svc-auth', name: 'Authentication', status: 'Running', health: 'Healthy', version: 'v2.1.0', latency: '18ms', restarts: 0, owner: 'SecOps' },
    { id: 'svc-ghost', name: 'Ghost Mode', status: 'Running', health: 'Healthy', version: 'v2.4.1', latency: '12ms', restarts: 0, owner: 'ML Ops' },
    { id: 'svc-quantum', name: 'Quantum Guess', status: 'Running', health: 'Degraded', version: 'v1.9.8', latency: '145ms', restarts: 1, owner: 'ML Ops' },
    { id: 'svc-bio', name: 'Bio-Feel', status: 'Running', health: 'Healthy', version: 'v3.0.0', latency: '180ms', restarts: 0, owner: 'ML Ops' },
    { id: 'svc-disinfo', name: 'DisinfoDefender', status: 'Running', health: 'Healthy', version: 'v4.1.2', latency: '8ms', restarts: 0, owner: 'ML Ops' },
    { id: 'svc-holo', name: 'HoloBidder', status: 'Paused', health: 'Down', version: 'v1.0.5', latency: 'N/A', restarts: 4, owner: 'Execution Team' },
    { id: 'svc-notify', name: 'Notification Service', status: 'Running', health: 'Healthy', version: 'v1.2.0', latency: '4ms', restarts: 0, owner: 'Platform Eng' },
    { id: 'svc-search', name: 'Search Service', status: 'Running', health: 'Healthy', version: 'v2.0.1', latency: '24ms', restarts: 0, owner: 'Platform Eng' },
    { id: 'svc-evidence', name: 'Evidence Service', status: 'Running', health: 'Healthy', version: 'v1.8.2', latency: '54ms', restarts: 0, owner: 'Platform Eng' },
    { id: 'svc-webhook', name: 'Webhook Service', status: 'Running', health: 'Healthy', version: 'v1.4.0', latency: '12ms', restarts: 0, owner: 'Platform Eng' },
  ];

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const logs = [
    { id: 'log-1', time: '10:45:12.102', svc: 'API Gateway', sev: 'Error', env: 'Prod', msg: 'Rate limit exceeded for tenant tnt_acme82', trace: 'tr-998', req: 'req-12a' },
    { id: 'log-2', time: '10:45:11.004', svc: 'Ghost Mode', sev: 'Info', env: 'Prod', msg: 'Successfully clustered 421 signals', trace: 'tr-997', req: 'req-11b' },
    { id: 'log-3', time: '10:44:59.421', svc: 'HoloBidder', sev: 'Critical', env: 'Prod', msg: 'Exchange connection timeout', trace: 'tr-996', req: 'req-10c' },
    { id: 'log-4', time: '10:44:58.111', svc: 'Authentication', sev: 'Warning', env: 'Prod', msg: 'Invalid token signature detected', trace: 'tr-995', req: 'req-09d' },
  ];

  const activityEvents = [
    { time: '10:45 AM', user: 'system', action: 'RESTART', detail: 'HoloBidder service automatically restarted (Attempt 4)' },
    { time: '10:12 AM', user: 'j.smith', action: 'DEPLOY', detail: 'Shipped API Gateway v5.12.4' },
    { time: '09:30 AM', user: 'e.vance', action: 'CONFIG', detail: 'Updated Quantum Guess latency thresholds' },
  ];

  const tabs = [
    { id: 'Global Health', label: 'Global Health' },
    { id: 'Service Status', label: 'Service Status' },
    { id: 'Performance', label: 'Performance' },
    { id: 'Background Workers', label: 'Workers' },
    { id: 'Queue Management', label: 'Queues' },
    { id: 'Log Explorer', label: 'Log Explorer' },
    { id: 'Request Tracing', label: 'Request Tracing' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === services.length ? [] : services.map(s => s.id));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Monitoring' }]} />
          <PageHeader 
            title="Platform Monitoring" 
            subtitle="Global observability, service mesh telemetry, and log exploration." 
            action={<PrimaryButton>Trigger Diagnostics</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 space-y-6">
          
          {activeTab === 'Global Health' && (
            <div className="space-y-6">
              <AdminCard className="p-6 bg-card border-l-4 border-l-success">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-text mb-1">Platform Status</h2>
                    <p className="text-sm text-muted">All core systems operational.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Availability</div>
                    <div className="text-2xl font-bold text-success">99.998%</div>
                  </div>
                </div>
              </AdminCard>
              <StatGrid>
                <MetricCard title="Error Rate" value="0.04%" isPositive={false} change="Stable" />
                <MetricCard title="Request Rate" value="14.2k / sec" />
                <MetricCard title="Background Jobs" value="4.2M" />
                <MetricCard title="Worker Health" value="100%" />
                <MetricCard title="Current Incidents" value="1" isPositive={false} change="SEV-2" />
              </StatGrid>
            </div>
          )}

          {activeTab === 'Service Status' && (
            <AdminCard>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === services.length} onChange={handleSelectAll} /></th>
                    <th className="px-4 py-3 text-left"><SortHeader label="Service" direction="asc" /></th>
                    <th className="px-4 py-3 text-left">Version</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Health</th>
                    <th className="px-4 py-3 text-left">Latency</th>
                    <th className="px-4 py-3 text-right">Restarts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {services.map(svc => (
                    <tr 
                      key={svc.id} 
                      className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedServiceId === svc.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedServiceId(svc.id)}
                    >
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(svc.id)} onChange={() => handleSelectRow(svc.id)} /></td>
                      <td className="px-4 py-3 font-semibold text-text">{svc.name}</td>
                      <td className="px-4 py-3 font-mono text-muted text-xs">{svc.version}</td>
                      <td className="px-4 py-3"><StatusBadge status={svc.status as any} /></td>
                      <td className="px-4 py-3"><HealthIndicator status={svc.health as any} /></td>
                      <td className="px-4 py-3 font-mono text-primary text-xs">{svc.latency}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted">{svc.restarts}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
              <TablePagination />
            </AdminCard>
          )}

          {activeTab === 'Performance' && (
            <div className="space-y-6">
               <StatGrid>
                 <MetricCard title="Avg API Latency" value="42ms" />
                 <MetricCard title="P95 Response Time" value="142ms" />
                 <MetricCard title="P99 Response Time" value="412ms" />
               </StatGrid>
               <StatGrid>
                 <MetricCard title="Avg Queue Time" value="12ms" />
                 <MetricCard title="Avg Worker Time" value="84ms" />
                 <MetricCard title="Avg ML Processing" value="214ms" />
               </StatGrid>
            </div>
          )}

          {activeTab === 'Background Workers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {[
                 { name: 'Signal Ingestion Pool', status: 'Running', queue: 0, current: 'sig_process_batch', retries: 12, fails: 0, mem: '1.2 GB', cpu: '45%' },
                 { name: 'Forecast Generation', status: 'Running', queue: 142, current: 'model_inference', retries: 0, fails: 0, mem: '14.2 GB', cpu: '88%' },
                 { name: 'Notification Delivery', status: 'Running', queue: 4, current: 'webhook_dispatch', retries: 41, fails: 2, mem: '400 MB', cpu: '12%' },
               ].map(w => (
                 <AdminCard key={w.name} className="p-4 border border-border">
                   <h4 className="font-bold text-text mb-2">{w.name}</h4>
                   <div className="flex justify-between items-center mb-4"><StatusBadge status={w.status as any} /><span className="text-xs font-mono text-muted">CPU: {w.cpu} | MEM: {w.mem}</span></div>
                   <div className="space-y-2 text-xs">
                     <div className="flex justify-between"><span className="text-textSecondary">Queue Depth:</span><span className="font-mono text-text">{w.queue}</span></div>
                     <div className="flex justify-between"><span className="text-textSecondary">Current Job:</span><span className="font-mono text-primary">{w.current}</span></div>
                     <div className="flex justify-between text-muted border-t border-border pt-2"><span>Retries: {w.retries}</span><span>Failures: {w.fails}</span></div>
                   </div>
                 </AdminCard>
               ))}
            </div>
          )}

          {activeTab === 'Queue Management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Signal Queue', 'Forecast Queue', 'Notification Queue', 'Webhook Queue', 'Evidence Queue', 'Dead Letter Queue', 'Retry Queue'].map(q => (
                <AdminCard key={q} className={`p-4 flex justify-between items-center ${q.includes('Dead') ? 'bg-danger/5 border-danger/30' : 'bg-card'}`}>
                   <div><h4 className="font-semibold text-text">{q}</h4><p className="text-xs text-muted">Redis Stream Backed</p></div>
                   <div className="text-right">
                     <div className="text-xl font-bold font-mono text-text">{q.includes('Dead') ? '12' : q.includes('Forecast') ? '142' : '0'}</div>
                     <div className="text-xs text-textSecondary uppercase">Messages</div>
                   </div>
                </AdminCard>
              ))}
            </div>
          )}

          {activeTab === 'Log Explorer' && (
            <AdminCard>
              <TableToolbar>
                <TableSearch />
                <TableFilters />
              </TableToolbar>
              <DataTable>
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-2 text-left">Timestamp</th>
                    <th className="px-4 py-2 text-left">Service</th>
                    <th className="px-4 py-2 text-left">Severity</th>
                    <th className="px-4 py-2 text-left">Message</th>
                    <th className="px-4 py-2 text-left">Trace ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs font-mono">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-surface/50 cursor-pointer">
                      <td className="px-4 py-2 text-muted">{log.time}</td>
                      <td className="px-4 py-2 text-text">{log.svc}</td>
                      <td className="px-4 py-2"><SeverityPill level={log.sev === 'Error' || log.sev === 'Critical' ? 'Critical' : log.sev === 'Warning' ? 'High' : 'Low'} /></td>
                      <td className="px-4 py-2 text-text truncate max-w-md">{log.msg}</td>
                      <td className="px-4 py-2 text-primary">{log.trace}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </AdminCard>
          )}

          {activeTab === 'Request Tracing' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Distributed Request Tracing Timeline Placeholder (OpenTelemetry View)
            </div>
          )}
          
        </div>

        {/* BOTTOM PANEL */}
        <div className="p-6 border-t border-border bg-surface/30">
          <SectionHeader title="Infrastructure Timeline" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed>
                <AuditTimeline events={activityEvents} />
              </ActivityFeed>
            </div>
            <div className="space-y-4">
              <AdminCard className="p-4 bg-card"><KPIBlock label="Recent Deployments (24h)" value="4" /></AdminCard>
              <AdminCard className="p-4 bg-card"><KPIBlock label="Restart Events (24h)" value="12" /></AdminCard>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Service Inspector</h3>
        
        {selectedService && activeTab === 'Service Status' ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Selected Service</h4>
              <p className="font-medium text-text mb-2">{selectedService.name}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedService.status as any} /></div>
                <div className="flex justify-between"><span className="text-muted">Health</span><HealthIndicator status={selectedService.health as any} /></div>
                <div className="flex justify-between"><span className="text-muted">Owner</span><span className="text-text">{selectedService.owner}</span></div>
                <div className="flex justify-between"><span className="text-muted">Version</span><span className="font-mono text-text">{selectedService.version}</span></div>
              </div>
            </AdminCard>

            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Dependencies</h4>
              <ul className="text-xs text-primary space-y-2">
                <li className="cursor-pointer hover:underline">Redis Cache (Healthy)</li>
                <li className="cursor-pointer hover:underline">PostgreSQL (Healthy)</li>
                <li className="cursor-pointer hover:underline text-danger">External Exchange API (Timeout)</li>
              </ul>
            </AdminCard>

            {selectedService.health === 'Down' && (
              <AdminCard className="p-4 bg-danger/5 border-danger/30">
                 <h4 className="text-xs font-bold text-danger uppercase mb-2">Critical Warnings</h4>
                 <p className="text-xs text-textSecondary">Service is currently offline and failing health checks. Linked to Incident INC-091.</p>
              </AdminCard>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a service to inspect.</div>
        )}
      </div>

    </div>
  );
}

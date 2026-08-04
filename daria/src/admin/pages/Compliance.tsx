import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge,
  PrimaryButton, SecondaryButton, DangerButton, MetricCard,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, KPIBlock, SeverityPill, StatGrid, JSONViewer
} from '../components/ui';

export default function Compliance() {
  const [activeTab, setActiveTab] = useState('Audit Center');

  const tabs = [
    { id: 'Audit Center', label: 'Audit Logs' },
    { id: 'Compliance Frameworks', label: 'Frameworks' },
    { id: 'Data Retention', label: 'Data Lifecycle' },
    { id: 'Incident Management', label: 'Incidents' },
  ];

  const auditLogs = [
    { id: 'log-101', time: '2026-08-04T00:15:22Z', actor: 'e.vance', org: 'TrendForge', action: 'UPDATE', target: 'Config:BioFeel', module: 'Engine Ops', severity: 'Low', status: 'Success' },
    { id: 'log-102', time: '2026-08-04T00:12:05Z', actor: 'm.cole', org: 'Acme Corp', action: 'EXPORT', target: 'Report:Monthly', module: 'Billing', severity: 'Low', status: 'Success' },
    { id: 'log-103', time: '2026-08-04T00:08:41Z', actor: 'system', org: 'TrendForge', action: 'SUSPEND', target: 'User:s.chen', module: 'Identity', severity: 'High', status: 'Success' },
    { id: 'log-104', time: '2026-08-04T00:01:10Z', actor: 'unknown', org: 'N/A', action: 'DELETE', target: 'API_KEY:tnt_1', module: 'Security', severity: 'Critical', status: 'Denied' },
  ];

  const sampleJson = {
    request: {
      action: "UPDATE",
      target: "Config:BioFeel",
      fields: { noise_floor: 0.15 }
    },
    response: { status: 200, applied: true },
    signature_hash: "sha256:8f43b...9a12c"
  };

  const frameworks = [
    { name: 'SOC2 Type II', status: 'Compliant', coverage: '100%', review: '2026-01-15', owner: 'Compliance Team', issues: 0, evidence: 142 },
    { name: 'GDPR', status: 'Compliant', coverage: '100%', review: '2026-03-01', owner: 'Legal', issues: 0, evidence: 89 },
    { name: 'CCPA', status: 'Compliant', coverage: '100%', review: '2026-03-01', owner: 'Legal', issues: 0, evidence: 45 },
    { name: 'ISO 27001', status: 'Pending', coverage: '92%', review: 'N/A', owner: 'Security Team', issues: 3, evidence: 312 },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance & Audit' }]} />
          <PageHeader 
            title="Compliance & Audit Center" 
            subtitle="Immutable audit logs, regulatory compliance, and incident forensics." 
            action={<PrimaryButton>Export Audit Log</PrimaryButton>} 
          />
        </div>

        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6 pt-6 space-y-6">
          
          {activeTab === 'Audit Center' && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <AdminCard>
                  <TableToolbar>
                    <TableSearch />
                    <TableFilters />
                  </TableToolbar>
                  <DataTable>
                    <thead className="bg-surface border-b border-border text-xs text-textSecondary uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2"><SortHeader label="Timestamp" direction="desc" /></th>
                        <th className="px-4 py-2 text-left">Actor</th>
                        <th className="px-4 py-2 text-left">Action</th>
                        <th className="px-4 py-2 text-left">Target</th>
                        <th className="px-4 py-2 text-left">Module</th>
                        <th className="px-4 py-2 text-left">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-surface/50 cursor-pointer">
                          <td className="px-4 py-3 font-mono text-muted text-xs">{log.time}</td>
                          <td className="px-4 py-3"><span className="font-medium text-text">{log.actor}</span><span className="block text-xs text-muted">{log.org}</span></td>
                          <td className="px-4 py-3"><span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface border border-border text-textSecondary">{log.action}</span></td>
                          <td className="px-4 py-3 font-mono text-primary text-xs">{log.target}</td>
                          <td className="px-4 py-3 text-textSecondary">{log.module}</td>
                          <td className="px-4 py-3"><SeverityPill level={log.severity as any} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                  <TablePagination />
                </AdminCard>
              </div>

              {/* Audit Detail Panel */}
              <div className="w-full lg:w-96 flex flex-col space-y-4">
                <AdminCard className="p-4 bg-card">
                  <h4 className="text-sm font-semibold mb-4 border-b border-border pb-2">Audit Event Details</h4>
                  <div className="space-y-4">
                    <KPIBlock label="Correlation ID" value="req-8a9f2bc" />
                    <div>
                      <span className="text-xs font-bold text-textSecondary block mb-1">Payload Hash</span>
                      <span className="font-mono text-xs text-muted break-all">{sampleJson.signature_hash}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-textSecondary block mb-2">Request Body</span>
                      <JSONViewer data={sampleJson.request} />
                    </div>
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeTab === 'Compliance Frameworks' && (
            <div className="space-y-6">
              <StatGrid>
                {frameworks.map(fw => (
                  <AdminCard key={fw.name} className={`p-4 border-t-4 ${fw.status === 'Compliant' ? 'border-t-success' : 'border-t-warning'}`}>
                    <h3 className="font-bold text-lg text-text mb-2">{fw.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <StatusBadge status={fw.status === 'Compliant' ? 'Success' : 'Pending'} label={fw.status} />
                      <span className="text-xs font-mono text-muted">{fw.coverage} Covered</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-textSecondary">Owner:</span><span className="text-text">{fw.owner}</span></div>
                      <div className="flex justify-between"><span className="text-textSecondary">Last Review:</span><span className="text-text">{fw.review}</span></div>
                      <div className="flex justify-between"><span className="text-textSecondary">Evidence Count:</span><span className="text-text">{fw.evidence}</span></div>
                      <div className="flex justify-between mt-2 pt-2 border-t border-border"><span className="text-textSecondary">Pending Issues:</span><span className={fw.issues > 0 ? 'text-warning font-bold' : 'text-success'}>{fw.issues}</span></div>
                    </div>
                  </AdminCard>
                ))}
              </StatGrid>
            </div>
          )}

          {activeTab === 'Data Retention' && (
            <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
              Data Lifecycle Management placeholder (Retention Policies, Archive Status, Deletion Queue, Legal Holds).
            </div>
          )}

          {activeTab === 'Incident Management' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminCard className="p-4 border-danger/30 bg-danger/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="Critical" />
                  <span className="text-xs font-mono text-muted">INC-104</span>
                </div>
                <h4 className="font-bold text-danger mb-1">DDoS Mitigation Triggered</h4>
                <p className="text-xs text-textSecondary mb-4">API Gateway experiencing volumetric attack. WAF rules engaged.</p>
                <div className="flex justify-between text-xs text-muted border-t border-danger/10 pt-2">
                  <span>Owner: SecOps</span>
                  <span>Active (12m)</span>
                </div>
              </AdminCard>
              
              <AdminCard className="p-4 border-warning/30 bg-warning/5">
                <div className="flex justify-between items-center mb-2">
                  <SeverityPill level="High" />
                  <span className="text-xs font-mono text-muted">INC-103</span>
                </div>
                <h4 className="font-bold text-warning mb-1">Database Replication Lag</h4>
                <p className="text-xs text-textSecondary mb-4">Read replica in eu-west-1 lagging by 14 seconds.</p>
                <div className="flex justify-between text-xs text-muted border-t border-warning/10 pt-2">
                  <span>Owner: DB SRE</span>
                  <span>Investigating</span>
                </div>
              </AdminCard>
            </div>
          )}

        </div>
      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Compliance Inspector</h3>
        
        <div className="space-y-4">
          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Overall Posture</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Compliance Status</span><StatusBadge status="Success" label="Audit Ready" /></div>
              <div className="flex justify-between"><span className="text-muted">Legal Holds</span><span className="text-text font-mono">2 Active</span></div>
            </div>
          </AdminCard>

          <AdminCard className="p-4 bg-card">
            <h4 className="text-xs font-bold text-textSecondary uppercase mb-2">Recommendations</h4>
            <ul className="text-xs text-textSecondary space-y-2">
              <li>• ISO 27001 readiness review is pending 3 remediation items.</li>
              <li>• Data retention purge scheduled in 48 hours for 2 tenants.</li>
            </ul>
          </AdminCard>
        </div>
      </div>

    </div>
  );
}

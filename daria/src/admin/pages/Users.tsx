import React, { useState } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, RoleBadge, SeverityPill,
  PrimaryButton, SecondaryButton, DangerButton, IconButton, MetricCard,
  DataTable, TableToolbar, TablePagination, TableSearch, TableFilters, SortHeader,
  Tabs, Breadcrumb, KPIBlock, ActivityFeed, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, SplitButton
} from '../components/ui';

export default function Users() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>('usr-101');
  const [activeTab, setActiveTab] = useState('Profile Summary');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const users = [
    { id: 'usr-101', name: 'Eleanor Vance', email: 'e.vance@trendforge.com', role: 'Super Admin', org: 'TrendForge Internal', mfa: 'Enabled', status: 'Success', sessions: 2, lastLogin: '10m ago' },
    { id: 'usr-102', name: 'Marcus Cole', email: 'm.cole@acme.inc', role: 'Org Admin', org: 'Acme Corp', mfa: 'Enabled', status: 'Success', sessions: 1, lastLogin: '1h ago' },
    { id: 'usr-103', name: 'Sarah Chen', email: 's.chen@nexus.io', role: 'Analyst', org: 'Nexus Trading', mfa: 'Disabled', status: 'Warning', sessions: 4, lastLogin: '2d ago' },
    { id: 'usr-104', name: 'David Miller', email: 'd.miller@trendforge.com', role: 'Platform Engineer', org: 'TrendForge Internal', mfa: 'Enabled', status: 'Offline', sessions: 0, lastLogin: '1w ago' },
  ];

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  const tabs = [
    { id: 'Profile Summary', label: 'Summary' },
    { id: 'Roles & Permissions', label: 'Permissions' },
    { id: 'Active Sessions', label: 'Sessions' },
    { id: 'Security & MFA', label: 'Security' },
    { id: 'API Keys', label: 'API Keys' },
    { id: 'Audit Timeline', label: 'Audit Log' },
  ];

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === users.length ? [] : users.map(o => o.id));
  };

  const activeSessions = [
    { device: 'MacBook Pro 16"', browser: 'Chrome 124', os: 'macOS', ip: '192.168.1.1', region: 'US East', login: '10m ago', activity: 'Just now', risk: 'Low' },
    { device: 'iPhone 15 Pro', browser: 'Safari Mobile', os: 'iOS 17', ip: '10.0.0.4', region: 'US East', login: '3h ago', activity: '1h ago', risk: 'Low' },
  ];

  const permissionMatrix = [
    { module: 'User Management', r: true, w: true, d: true, x: true, a: true, o: true, i: true },
    { module: 'Billing', r: true, w: false, d: false, x: true, a: false, o: false, i: false },
    { module: 'Engine Operations', r: true, w: true, d: false, x: true, a: true, o: true, i: false },
    { module: 'Compliance Logs', r: true, w: false, d: false, x: true, a: false, o: false, i: false },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0 border-r border-border">
        
        <div className="p-6 pb-0">
          <Breadcrumb items={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]} />
          <PageHeader 
            title="User & Identity Management" 
            subtitle="Manage user directories, roles, permissions, and active sessions globally." 
            action={<PrimaryButton>Invite User</PrimaryButton>} 
          />
        </div>

        <div className="p-6 pt-0 space-y-6">
          {/* User Directory */}
          <AdminCard>
            <TableToolbar>
              <TableSearch />
              <div className="flex space-x-2">
                <TableFilters />
                <SecondaryButton className="py-1.5 px-3">Export Directory</SecondaryButton>
              </div>
            </TableToolbar>
            
            <BulkActionBar 
              selectedCount={selectedRows.length} 
              actions={<><SecondaryButton className="py-1">Force Logout</SecondaryButton><DangerButton className="py-1">Suspend Users</DangerButton></>} 
            />

            <DataTable>
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-4 py-3"><RowSelectionCheckbox checked={selectedRows.length === users.length} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="User" direction="asc" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Role" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Organization" /></th>
                  <th className="px-4 py-3 text-left"><SortHeader label="Status" /></th>
                  <th className="px-4 py-3 text-right">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {users.map(user => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedUserId === user.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><RowSelectionCheckbox checked={selectedRows.includes(user.id)} onChange={() => handleSelectRow(user.id)} /></td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-text">{user.name}</div>
                      <div className="text-xs text-muted">{user.email}</div>
                    </td>
                    <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                    <td className="px-4 py-3"><span className="text-textSecondary">{user.org}</span></td>
                    <td className="px-4 py-3">
                       <div className="flex items-center space-x-2">
                         <StatusBadge status={user.status as any} label={user.status === 'Success' ? 'Active' : user.status === 'Warning' ? 'At Risk' : 'Offline'} />
                         {user.mfa === 'Disabled' && <span className="text-[10px] text-warning font-bold border border-warning px-1 rounded">NO MFA</span>}
                       </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted text-xs">{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <TablePagination />
          </AdminCard>

          {/* User Detail View */}
          {selectedUser && (
            <AdminCard className="overflow-hidden">
              <div className="bg-surface border-b border-border p-6 flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded bg-card border border-border flex items-center justify-center text-xl font-bold text-primary">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text mb-1 flex items-center">
                      {selectedUser.name}
                      <span className="ml-3 px-2 py-0.5 bg-card border border-border rounded text-xs font-mono text-muted">{selectedUser.id}</span>
                    </h2>
                    <div className="flex space-x-2 mt-1">
                      <span className="text-sm text-textSecondary">{selectedUser.email}</span>
                      <span className="text-sm text-muted">•</span>
                      <span className="text-sm text-textSecondary">{selectedUser.org}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <SecondaryButton disabled>Reset Password</SecondaryButton>
                  <SplitButton mainAction="Edit User" secondaryAction={null} />
                </div>
              </div>

              <div className="px-6 pt-2">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="p-6">
                
                {activeTab === 'Profile Summary' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Department" value="Platform Ops" /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Timezone" value="America/New_York" /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Created Date" value="2022-04-12" /></AdminCard>
                    <AdminCard className="p-4 bg-card"><KPIBlock label="Active Sessions" value={selectedUser.sessions.toString()} /></AdminCard>
                  </div>
                )}

                {activeTab === 'Roles & Permissions' && (
                  <div className="space-y-6">
                    <div className="flex space-x-2 mb-4">
                      <RoleBadge role={selectedUser.role} />
                      <span className="px-2 py-0.5 bg-surface border border-border rounded text-xs font-semibold text-textSecondary">Global Access</span>
                    </div>
                    
                    <AdminCard>
                      <div className="p-4 border-b border-border bg-surface"><h4 className="text-sm font-semibold text-text uppercase tracking-wider">Permission Matrix Viewer</h4></div>
                      <table className="w-full text-left text-sm">
                        <thead className="bg-surface border-b border-border text-xs text-textSecondary">
                          <tr>
                            <th className="px-4 py-2">Module</th>
                            <th className="px-2 py-2 text-center" title="Read">R</th>
                            <th className="px-2 py-2 text-center" title="Write">W</th>
                            <th className="px-2 py-2 text-center" title="Delete">D</th>
                            <th className="px-2 py-2 text-center" title="Export">X</th>
                            <th className="px-2 py-2 text-center" title="Approve">A</th>
                            <th className="px-2 py-2 text-center" title="Override">O</th>
                            <th className="px-2 py-2 text-center" title="Impersonate">I</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {permissionMatrix.map((pm, i) => (
                            <tr key={i} className="hover:bg-surface/50">
                              <td className="px-4 py-2 font-medium text-text">{pm.module}</td>
                              {['r','w','d','x','a','o','i'].map((key) => (
                                <td key={key} className="px-2 py-2 text-center">
                                  {(pm as any)[key] ? <div className="w-2 h-2 rounded-full bg-success mx-auto" /> : <div className="w-2 h-2 rounded-full bg-border mx-auto" />}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </AdminCard>
                  </div>
                )}

                {activeTab === 'Active Sessions' && (
                  <AdminCard>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface border-b border-border text-xs text-textSecondary">
                        <tr><th className="px-4 py-2">Device</th><th className="px-4 py-2">IP / Region</th><th className="px-4 py-2">Activity</th><th className="px-4 py-2">Risk</th><th className="px-4 py-2 text-right">Action</th></tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {activeSessions.map((s, i) => (
                          <tr key={i} className="hover:bg-surface/50">
                            <td className="px-4 py-3"><div className="font-medium text-text">{s.device}</div><div className="text-xs text-muted">{s.browser} • {s.os}</div></td>
                            <td className="px-4 py-3"><div className="font-mono text-text">{s.ip}</div><div className="text-xs text-muted">{s.region}</div></td>
                            <td className="px-4 py-3"><div className="text-text">Login: {s.login}</div><div className="text-xs text-muted">Last: {s.activity}</div></td>
                            <td className="px-4 py-3"><SeverityPill level="Low" /></td>
                            <td className="px-4 py-3 text-right"><DangerButton className="text-xs py-1" disabled>Terminate</DangerButton></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </AdminCard>
                )}

                {activeTab === 'Security & MFA' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    Recovery Methods and MFA configuration placeholder.
                  </div>
                )}

                {activeTab === 'API Keys' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    Personal and Service API Keys placeholder.
                  </div>
                )}

                {activeTab === 'Audit Timeline' && (
                  <div className="text-sm text-textSecondary text-center py-12 border border-dashed border-border rounded">
                    User-specific Audit Timeline placeholder.
                  </div>
                )}

              </div>
            </AdminCard>
          )}

        </div>
      </div>

      {/* RIGHT INSPECTOR PANEL */}
      <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">User Inspector</h3>
        
        {selectedUser ? (
          <div className="space-y-4">
            <AdminCard className="p-4 bg-card">
              <h4 className="text-xs font-bold text-textSecondary uppercase mb-3">Summary</h4>
              <p className="font-medium text-text mb-2">{selectedUser.name}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedUser.status as any} /></div>
                <div className="flex justify-between"><span className="text-muted">MFA</span><span className={selectedUser.mfa === 'Enabled' ? 'text-success' : 'text-danger font-bold'}>{selectedUser.mfa}</span></div>
                <div className="flex justify-between"><span className="text-muted">Sessions</span><span className="text-text">{selectedUser.sessions}</span></div>
              </div>
            </AdminCard>

            {selectedUser.mfa === 'Disabled' && (
              <AdminCard className="p-4 bg-danger/5 border-danger/30">
                <h4 className="text-xs font-bold text-danger uppercase mb-2">Security Warning</h4>
                <p className="text-xs text-textSecondary">This user does not have MFA enabled. Enforce MFA via bulk actions.</p>
                <SecondaryButton className="w-full mt-3 text-xs py-1">Enforce MFA</SecondaryButton>
              </AdminCard>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-textSecondary py-12">Select a user to view details.</div>
        )}
      </div>

    </div>
  );
}

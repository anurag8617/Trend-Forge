import React, { useState, useMemo } from 'react';
import { 
  AdminCard, PageHeader, SectionHeader, StatusBadge, RoleBadge, SeverityPill,
  PrimaryButton, SecondaryButton, DangerButton, IconButton, MetricCard,
  DataTable, Tabs, Breadcrumb, KPIBlock, ActivityFeed, AuditTimeline,
  RowSelectionCheckbox, BulkActionBar, SplitButton
} from '../components/ui';

export default function Users() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>('usr-101');
  const [activeTab, setActiveTab] = useState('Profile Summary');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // --- NEW STATE: Search, Sort, and Pagination ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set to 3 to demonstrate pagination with mock data

  const users = [
    { id: 'usr-101', name: 'Eleanor Vance', email: 'e.vance@trendforge.com', role: 'Super Admin', org: 'TrendForge Internal', mfa: 'Enabled', status: 'Success', sessions: 2, lastLogin: '10m ago' },
    { id: 'usr-102', name: 'Marcus Cole', email: 'm.cole@acme.inc', role: 'Org Admin', org: 'Acme Corp', mfa: 'Enabled', status: 'Success', sessions: 1, lastLogin: '1h ago' },
    { id: 'usr-103', name: 'Sarah Chen', email: 's.chen@nexus.io', role: 'Analyst', org: 'Nexus Trading', mfa: 'Disabled', status: 'Warning', sessions: 4, lastLogin: '2d ago' },
    { id: 'usr-104', name: 'David Miller', email: 'd.miller@trendforge.com', role: 'Platform Engineer', org: 'TrendForge Internal', mfa: 'Enabled', status: 'Offline', sessions: 0, lastLogin: '1w ago' },
  ];

  const tabs = [
    { id: 'Profile Summary', label: 'Summary' },
    { id: 'Roles & Permissions', label: 'Permissions' },
    { id: 'Active Sessions', label: 'Sessions' },
    { id: 'Security & MFA', label: 'Security' },
    { id: 'API Keys', label: 'API Keys' },
    { id: 'Audit Timeline', label: 'Audit Log' },
  ];

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

  // --- LOGIC: Filter, Sort, and Paginate Data ---
  const processedUsers = useMemo(() => {
    // 1. Search Filter
    let result = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.org.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sorting
    result.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, sortConfig]);

  // 3. Pagination limits
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);
  const paginatedUsers = processedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  // --- HANDLERS ---
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === paginatedUsers.length ? [] : paginatedUsers.map(o => o.id));
  };

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
            <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">User Directory</h3>
            </div>

            {/* REAL SEARCH & TOOLBAR */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-border">
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search names, emails, roles..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <select className="bg-background border border-border text-text text-sm rounded px-3 py-2 focus:outline-none focus:border-primary">
                  <option value="all">All Roles</option>
                  <option value="super">Super Admin</option>
                  <option value="org">Org Admin</option>
                  <option value="analyst">Analyst</option>
                </select>
                <SecondaryButton>Export Directory</SecondaryButton>
              </div>
            </div>
            
            {selectedRows.length > 0 && (
              <BulkActionBar 
                selectedCount={selectedRows.length} 
                actions={<><SecondaryButton className="py-1">Force Logout</SecondaryButton><DangerButton className="py-1">Suspend Users</DangerButton></>} 
              />
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface border-b border-border text-xs uppercase text-textSecondary">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <RowSelectionCheckbox 
                        checked={selectedRows.length === paginatedUsers.length && paginatedUsers.length > 0} 
                        onChange={handleSelectAll} 
                      />
                    </th>
                    {/* REAL SORT HEADERS */}
                    {[
                      { key: 'name', label: 'User' },
                      { key: 'role', label: 'Role' },
                      { key: 'org', label: 'Organization' },
                      { key: 'status', label: 'Status' },
                      { key: 'lastLogin', label: 'Last Login' }
                    ].map(col => (
                      <th 
                        key={col.key} 
                        className={`px-4 py-3 cursor-pointer hover:text-text transition-colors select-none ${col.key === 'lastLogin' ? 'text-right' : ''}`} 
                        onClick={() => handleSort(col.key)}
                      >
                        <div className={`flex items-center space-x-1 ${col.key === 'lastLogin' ? 'justify-end' : ''}`}>
                          <span>{col.label}</span>
                          {sortConfig.key === col.key && (
                            <span className="text-primary">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm bg-background">
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-textSecondary">No users found matching your search.</td>
                    </tr>
                  ) : (
                    paginatedUsers.map(user => (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-surface/50 cursor-pointer transition-colors ${selectedUserId === user.id ? 'bg-primary/5' : ''}`}
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <RowSelectionCheckbox checked={selectedRows.includes(user.id)} onChange={() => handleSelectRow(user.id)} />
                        </td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* REAL PAGINATION */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-surface text-sm">
              <span className="text-textSecondary">
                Showing <span className="font-medium text-text">{paginatedUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-text">{Math.min(currentPage * itemsPerPage, processedUsers.length)}</span> of <span className="font-medium text-text">{processedUsers.length}</span> results
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-border rounded bg-background text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center px-2 space-x-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-7 h-7 flex items-center justify-center rounded ${currentPage === i + 1 ? 'bg-primary text-background font-medium' : 'text-text hover:bg-surface'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 border border-border rounded bg-background text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
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
                <div className="flex justify-between"><span className="text-muted">Status</span><StatusBadge status={selectedUser.status as any} label={selectedUser.status === 'Success' ? 'Active' : selectedUser.status === 'Warning' ? 'At Risk' : 'Offline'} /></div>
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
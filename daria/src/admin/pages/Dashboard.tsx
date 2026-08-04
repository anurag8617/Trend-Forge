import React from 'react';

// --- DARIA THEMED UI COMPONENTS ---

const AdminCard = ({ children, className = '' }) => (
  <div
    className={`bg-background border border-border backdrop-blur-md rounded-xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const AdminSection = ({ title, children }) => (
  <div className="space-y-4">
    {title && (
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">{title}</h3>
    )}
    {children}
  </div>
);

const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800/60">
    <div>
      <h1 className="text-xl font-light text-slate-100 tracking-wide">{title}</h1>
      <p className="text-xs font-mono text-slate-500 mt-1">{subtitle}</p>
    </div>
    <div className="mt-4 md:mt-0">{action}</div>
  </div>
);

const PrimaryButton = ({ children, className = '' }) => (
  <button
    className={`px-4 py-2 bg-transparent border border-[#3DD6F5]/50 text-[#3DD6F5] hover:bg-[#3DD6F5]/10 transition-colors text-xs uppercase tracking-wider rounded-xl ${className}`}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, className = '', disabled }) => (
  <button
    disabled={disabled}
    className={`px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors text-[10px] uppercase tracking-wider rounded-xl ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

const KPIBlock = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</span>
    <span className="text-lg font-light text-slate-200">{value}</span>
  </div>
);

const MetricCard = ({ title, value, isPositive, change }) => (
  <AdminCard className="p-4 flex flex-col justify-between">
    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">{title}</span>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-light text-white">{value}</span>
      {change && (
        <span
          className={`text-xs font-mono ${isPositive === false ? 'text-slate-400' : 'text-[#3DD6F5]'}`}
        >
          {isPositive === false ? '▼' : '▲'} {change}
        </span>
      )}
    </div>
  </AdminCard>
);

const StatGrid = ({ children }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{children}</div>
);

const HealthIndicator = ({ status }) => {
  const isHealthy = status === 'Healthy';
  const isDown = status === 'Down';
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-[#3DD6F5] ' : isDown ? 'bg-slate-600' : 'bg-[#3DD6F5]/40 animate-pulse'}`}
      />
      <span
        className={`text-[10px] uppercase tracking-wider ${isHealthy ? 'text-[#3DD6F5]' : 'text-slate-400'}`}
      >
        {status}
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded-xl text-[10px] uppercase tracking-wider border ${status === 'Running' ? 'border-[#3DD6F5]/30 text-[#3DD6F5] bg-[#3DD6F5]/5' : 'border-slate-700 text-slate-400 bg-slate-800/30'}`}
  >
    {status}
  </span>
);

const SeverityPill = ({ level }) => {
  const isCrit = level === 'Critical' || level === 'SEV1';
  return (
    <span
      className={`px-2 py-0.5 rounded-xl text-[10px] uppercase tracking-wider font-medium ${isCrit ? 'bg-slate-200 text-[#060A14]' : 'bg-slate-800 text-slate-300'}`}
    >
      {level}
    </span>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  // Original Data Retained
  const engines = [
    {
      name: 'Ghost Mode',
      status: 'Running',
      health: 'Healthy',
      version: 'v2.4.1',
      latency: '12ms',
      queue: '0',
      lastUpdate: '2s ago',
      glyph: '◇',
    },
    {
      name: 'Quantum Guess',
      status: 'Running',
      health: 'Healthy',
      version: 'v1.9.8',
      latency: '45ms',
      queue: '124',
      lastUpdate: '5s ago',
      glyph: '◯',
    },
    {
      name: 'Bio-Feel',
      status: 'Running',
      health: 'Degraded',
      version: 'v3.0.0',
      latency: '180ms',
      queue: '45',
      lastUpdate: '1s ago',
      glyph: '△',
    },
    {
      name: 'DisinfoDefender',
      status: 'Running',
      health: 'Healthy',
      version: 'v4.1.2',
      latency: '8ms',
      queue: '0',
      lastUpdate: '0s ago',
      glyph: '◻',
    },
    {
      name: 'HoloBidder',
      status: 'Paused',
      health: 'Down',
      version: 'v1.0.5',
      latency: 'N/A',
      queue: '0',
      lastUpdate: '12m ago',
      glyph: '◈',
    },
  ] as const;

  const incidents = [
    {
      id: 'INC-092',
      severity: 'SEV2',
      title: 'Bio-Feel processing latency spike',
      status: 'Investigating',
      assignee: 'Jane Doe',
      time: '14m ago',
    },
    {
      id: 'INC-091',
      severity: 'SEV1',
      title: 'HoloBidder exchange connection timeout',
      status: 'Mitigated',
      assignee: 'John Smith',
      time: '1h ago',
    },
  ] as const;

  const alerts = [
    {
      id: 'ALT-101',
      severity: 'Medium',
      category: 'Queue',
      engine: 'Quantum Guess',
      time: '5m ago',
      status: 'Active',
    },
    {
      id: 'ALT-102',
      severity: 'High',
      category: 'Latency',
      engine: 'Bio-Feel',
      time: '12m ago',
      status: 'Active',
    },
    {
      id: 'ALT-103',
      severity: 'Critical',
      category: 'Connection',
      engine: 'HoloBidder',
      time: '1h ago',
      status: 'Resolved',
    },
  ] as const;

  const adminActivity = [
    { time: '10:45 AM', user: 'admin_sys', action: 'DEPLOY', detail: 'Shipped Bio-Feel v3.0.0' },
    {
      time: '10:12 AM',
      user: 'j.smith',
      action: 'OVERRIDE',
      detail: 'Paused HoloBidder automated execution',
    },
    {
      time: '09:30 AM',
      user: 'j.doe',
      action: 'CONFIG',
      detail: 'Updated DisinfoDefender thresholds',
    },
  ];

  const quickActions = [
    { name: 'Open User Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    {
      name: 'Open Engine Control',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
    {
      name: 'View Audit Logs',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      name: 'Open Compliance',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      name: 'Emergency Kill Switch',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      disabled: true,
    },
    {
      name: 'Feature Flags',
      icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-background text-slate-300 font-sans overflow-y-auto selection:bg-[#3DD6F5] selection:text-[#060A14]">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="System Telemetry"
          subtitle="Global Platform Status & Engine Operations"
          action={<PrimaryButton>Refresh Telemetry</PrimaryButton>}
        />

        <div className="space-y-10">
          {/* 1. GLOBAL PLATFORM STATUS */}
          <AdminSection>
            <AdminCard className="p-8 border-border bg-background">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  {/* Replaced aggressive pulsing green with calm cyan jellyfish-glow */}
                  <div className="w-3 h-3 bg-[#3DD6F5] rounded-full" />
                  <h2 className="text-xl font-bold text-slate-100 tracking-[0.1em]">
                    TRENDFORGE OPERATIONS NORMAL
                  </h2>
                </div>
                <div className="text-xs font-mono text-[#3DD6F5] tracking-widest mt-2 md:mt-0">
                  UPTIME: 99.998%
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 border-t border-slate-800/60 pt-6">
                <KPIBlock label="Env" value="PROD" />
                <KPIBlock label="Version" value="v5.12.4" />
                <KPIBlock label="Deploy" value="Stable" />
                <KPIBlock label="Region" value="us-east-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Database
                  </span>
                  <HealthIndicator status="Healthy" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    API
                  </span>
                  <HealthIndicator status="Healthy" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Queue
                  </span>
                  <HealthIndicator status="Healthy" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Cache
                  </span>
                  <HealthIndicator status="Healthy" />
                </div>
              </div>
            </AdminCard>
          </AdminSection>

          {/* 2. LIVE ENGINE STATUS GRID */}
          <AdminSection title="Live Engine Status">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {engines.map((engine) => (
                <AdminCard
                  key={engine.name}
                  className={`p-5 flex flex-col hover:border-[#3DD6F5]/30 transition-colors ${engine.health === 'Down' ? 'opacity-60 border-slate-700' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#3DD6F5] text-lg">{engine.glyph}</span>
                      <span className="font-medium text-slate-200 text-sm tracking-wide">
                        {engine.name}
                      </span>
                    </div>
                    <HealthIndicator status={engine.health} />
                  </div>

                  <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-800/60">
                    <StatusBadge status={engine.status} />
                    <span className="text-[10px] font-mono text-slate-500">{engine.version}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div className="flex flex-col">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">
                        Latency
                      </span>
                      <span className="font-mono text-slate-200">{engine.latency}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">
                        Queue
                      </span>
                      <span className="font-mono text-slate-200">{engine.queue}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="text-[10px] text-slate-500 font-mono mb-4 flex items-center uppercase">
                      Update {engine.lastUpdate}
                    </div>
                    <SecondaryButton className="w-full">Open Workspace</SecondaryButton>
                  </div>
                </AdminCard>
              ))}
            </div>
          </AdminSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Data heavy sections */}
            <div className="lg:col-span-2 space-y-10">
              {/* 3. SYSTEM HEALTH (StatGrid) */}
              <AdminSection title="System Infrastructure">
                <StatGrid>
                  <MetricCard title="CPU Utilization" value="42%" />
                  <MetricCard title="Memory Usage" value="68%" />
                  <MetricCard title="Storage IOPS" value="12.4k" />
                  <MetricCard title="Redis Memory" value="14.2 GB" />
                  <MetricCard title="Active Workers" value="480" />
                  <MetricCard title="Jobs / Sec" value="3,294" />
                  <MetricCard title="API Req / Sec" value="18,402" />
                  <MetricCard title="Background Tasks" value="142" />
                </StatGrid>
              </AdminSection>

              {/* 8. SYSTEM OVERVIEW MAP */}
              <AdminSection title="Architecture Overview">
                <AdminCard className="p-8 border border-border bg-background">
                  <div className="flex flex-col items-center space-y-4 font-mono text-xs">
                    <div className="w-64 py-3 border border-border rounded-xl bg-background text-center tracking-[0.2em] text-[#3DD6F5]">
                      TRENDFORGE CLIENT
                    </div>
                    <div className="text-slate-600">↓</div>
                    <div className="w-80 py-3 border border-border rounded-xl bg-background text-center tracking-[0.2em] text-slate-300">
                      GLOBAL ENGINE CLUSTER
                    </div>
                    <div className="text-slate-600">↓</div>
                    <div className="w-64 py-3 border border-border rounded-xl bg-background text-center tracking-[0.2em] text-slate-400">
                      CORE API GATEWAY
                    </div>
                    <div className="flex space-x-10 w-full justify-center pt-2 text-slate-600">
                      <div className="flex flex-col items-center">
                        <span className="mb-3">↓</span>
                        <div className="w-32 py-2 border border-slate-800 rounded-xl bg-background text-slate-500 text-center">
                          TENANTS
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="mb-3">↓</span>
                        <div className="w-32 py-2 border border-slate-800 rounded-xl bg-background text-slate-500 text-center">
                          DSPs
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="mb-3">↓</span>
                        <div className="w-32 py-2 border border-slate-800 rounded-xl bg-background text-slate-500 text-center">
                          EVIDENCE
                        </div>
                      </div>
                    </div>
                  </div>
                </AdminCard>
              </AdminSection>

              {/* 9. TODAY'S OPERATIONS */}
              <AdminSection title="Today's Operations">
                <StatGrid>
                  <MetricCard title="Users Online" value="14,291" isPositive={true} change="4%" />
                  <MetricCard title="Organizations" value="342" />
                  <MetricCard title="Running Jobs" value="42M" />
                  <MetricCard title="Predictions" value="1.2B" />
                  <MetricCard title="Signals Processed" value="8.4T" />
                  <MetricCard title="Forecasts Generated" value="842K" />
                  <MetricCard title="Queued Tasks" value="1,241" />
                  <MetricCard title="Open Incidents" value="1" isPositive={false} change="1" />
                </StatGrid>
              </AdminSection>
            </div>

            {/* RIGHT COLUMN: Incidents, Alerts, Actions */}
            <div className="space-y-10">
              {/* 4. LIVE INCIDENT PANEL */}
              <AdminSection title="Active Incidents">
                <AdminCard className="flex flex-col">
                  <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      Severity Rollup
                    </span>
                    <div className="flex space-x-2">
                      <span className="px-2 py-0.5 bg-slate-200 text-[#060A14] rounded-xl text-[10px] font-bold">
                        1 SEV1
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-xl text-[10px] font-bold">
                        1 SEV2
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {incidents.map((inc) => (
                      <div
                        key={inc.id}
                        className="border border-border rounded-xl p-4 bg-background"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <SeverityPill level={inc.severity} />
                            <span className="text-[10px] font-mono text-slate-500">{inc.id}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase">{inc.time}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-200 mb-4">{inc.title}</p>
                        <div className="flex items-center justify-between text-xs mb-5">
                          <span className="text-slate-500">
                            Assigned: <span className="text-slate-300">{inc.assignee}</span>
                          </span>
                          <span className="text-[#3DD6F5] uppercase tracking-wider text-[10px]">
                            {inc.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <SecondaryButton className="flex-1">Acknowledge</SecondaryButton>
                          <SecondaryButton className="flex-1" disabled>
                            Resolve
                          </SecondaryButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </AdminCard>
              </AdminSection>

              {/* 5. ACTIVE ALERTS */}
              <AdminSection title="System Alerts">
                <AdminCard>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-background border-b border-border text-[10px] uppercase tracking-widest text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-normal">Sev</th>
                        <th className="px-4 py-3 font-normal">Engine</th>
                        <th className="px-4 py-3 font-normal">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {alerts.map((alt) => (
                        <tr key={alt.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3">
                            <SeverityPill level={alt.severity} />
                          </td>
                          <td className="px-4 py-3 font-light text-slate-300">{alt.engine}</td>
                          <td className="px-4 py-3 text-slate-500 text-[10px] uppercase">
                            {alt.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AdminCard>
              </AdminSection>

              {/* 7. QUICK ACTIONS */}
              <AdminSection title="Quick Actions">
                <AdminCard className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((act) => (
                      <button
                        key={act.name}
                        disabled={act.disabled}
                        className={`flex flex-col items-center justify-center p-4 border border-border? rounded-xl text-center transition-colors ${act.disabled ? 'opacity-30 cursor-not-allowed bg-slate-900/10' : 'bg-background hover:bg-slate-800/60 hover:border-[#3DD6F5]/50 text-slate-400 hover:text-[#3DD6F5]'}`}
                      >
                        <svg
                          className="w-5 h-5 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={act.icon}
                          />
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider">{act.name}</span>
                      </button>
                    ))}
                  </div>
                </AdminCard>
              </AdminSection>

              {/* 6. RECENT ADMIN ACTIVITY */}
              <AdminSection title="Audit Log">
                <AdminCard className="p-5">
                  <div className="space-y-5">
                    {adminActivity.map((log, i) => (
                      <div
                        key={i}
                        className="flex flex-col relative pl-4 border-l border-slate-800"
                      >
                        <div className="absolute w-2 h-2 rounded-full bg-slate-700 -left-[4.5px] top-1.5" />
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-[10px] font-mono text-slate-500">{log.time}</span>
                          <span className="text-[10px] uppercase tracking-widest text-[#3DD6F5]">
                            {log.action}
                          </span>
                          <span className="text-[10px] text-slate-400">{log.user}</span>
                        </div>
                        <span className="text-sm text-slate-300 font-light">{log.detail}</span>
                      </div>
                    ))}
                  </div>
                </AdminCard>
              </AdminSection>
            </div>
          </div>

          {/* 10. MISSION FOOTER */}
          <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <div className="flex space-x-8">
              <span>
                ENV: <span className="text-slate-300">PRODUCTION</span>
              </span>
              <span>
                VER: <span className="text-slate-300">v5.12.4</span>
              </span>
              <span>
                GIT: <span className="text-slate-300">a8f93bc</span>
              </span>
            </div>
            <div>LAST SYNC: {new Date().toISOString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

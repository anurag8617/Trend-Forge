import React from 'react';

type StatusType = 'Success' | 'Warning' | 'Critical' | 'Offline' | 'Paused' | 'Running' | 'Pending' | 'Unknown';

const statusConfig: Record<StatusType, { bg: string, text: string, dot: string }> = {
  Success: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  Warning: { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
  Critical: { bg: 'bg-danger/10', text: 'text-danger', dot: 'bg-danger' },
  Offline: { bg: 'bg-muted/10', text: 'text-muted', dot: 'bg-muted' },
  Paused: { bg: 'bg-execute/10', text: 'text-execute', dot: 'bg-execute' },
  Running: { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  Pending: { bg: 'bg-forecast/10', text: 'text-forecast', dot: 'bg-forecast' },
  Unknown: { bg: 'bg-surface', text: 'text-textSecondary', dot: 'bg-textSecondary' },
};

export const StatusBadge = ({ status, label }: { status: StatusType, label?: string }) => {
  const conf = statusConfig[status] || statusConfig.Unknown;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-transparent ${conf.bg} ${conf.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${conf.dot}`} />
      {label || status}
    </span>
  );
};

export const HealthIndicator = ({ status }: { status: 'Healthy' | 'Degraded' | 'Down' }) => {
  const colors = { Healthy: 'bg-success', Degraded: 'bg-warning', Down: 'bg-danger' };
  return (
    <div className="flex items-center space-x-2">
      <span className="relative flex h-3 w-3">
        {status === 'Healthy' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-success" />}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colors[status]}`} />
      </span>
      <span className="text-sm font-medium text-text">{status}</span>
    </div>
  );
};

export const EngineStatus = ({ name, active }: { name: string, active: boolean }) => (
  <div className="flex items-center space-x-2 px-3 py-1.5 rounded bg-surface border border-border">
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-primary shadow-[0_0_8px_rgba(38,231,255,0.8)]' : 'bg-muted'}`} />
    <span className="text-sm text-text font-medium">{name}</span>
  </div>
);

export const SeverityPill = ({ level }: { level: 'Low' | 'Medium' | 'High' | 'Critical' }) => {
  const map = { Low: 'bg-success/20 text-success border-success/30', Medium: 'bg-warning/20 text-warning border-warning/30', High: 'bg-execute/20 text-execute border-execute/30', Critical: 'bg-danger/20 text-danger border-danger/30' };
  return <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${map[level]}`}>{level}</span>;
};

export const RoleBadge = ({ role }: { role: string }) => (
  <span className="px-2 py-0.5 bg-dariaIndigo text-primary border border-primary/30 rounded text-xs font-semibold uppercase tracking-wide">
    {role}
  </span>
);

export const ComplianceBadge = ({ compliant }: { compliant: boolean }) => (
  compliant ? 
    <span className="flex items-center text-xs font-medium text-success"><svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Compliant</span> :
    <span className="flex items-center text-xs font-medium text-danger"><svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Violation</span>
);

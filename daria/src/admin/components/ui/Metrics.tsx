import React from 'react';

export const MetricCard = ({ title, value, change, isPositive }: { title: string, value: string, change?: string, isPositive?: boolean }) => (
  <div className="bg-card border border-border p-5 rounded-lg shadow-sm">
    <h4 className="text-sm font-medium text-textSecondary mb-2">{title}</h4>
    <div className="flex items-baseline space-x-3">
      <span className="text-2xl font-semibold text-text">{value}</span>
      {change && (
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {isPositive ? '+' : '-'}{change}
        </span>
      )}
    </div>
  </div>
);

export const TrendCard = ({ title, value, trendIcon }: { title: string, value: string, trendIcon?: React.ReactNode }) => (
  <div className="bg-surface border border-border p-4 rounded flex items-center justify-between">
    <div>
      <p className="text-xs text-textSecondary uppercase tracking-wider">{title}</p>
      <p className="text-xl font-bold text-text mt-1">{value}</p>
    </div>
    {trendIcon && <div className="text-primary">{trendIcon}</div>}
  </div>
);

export const KPIBlock = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-muted font-medium mb-1">{label}</span>
    <span className="text-lg text-text font-semibold">{value}</span>
  </div>
);

export const StatGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {children}
  </div>
);

export const MiniChart = () => (
  <div className="h-16 w-full bg-surface border border-border rounded flex items-end justify-between p-2 space-x-1">
    {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85].map((h, i) => (
      <div key={i} className="w-full bg-primary/40 rounded-t" style={{ height: `${h}%` }} />
    ))}
  </div>
);

export const Sparkline = () => (
  <svg className="w-full h-8 text-forecast" fill="none" viewBox="0 0 100 20" preserveAspectRatio="none">
    <path d="M0 15 Q 10 5, 20 10 T 40 12 T 60 5 T 80 18 T 100 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

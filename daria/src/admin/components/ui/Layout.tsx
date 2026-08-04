import React from 'react';

export const AdminCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

export const AdminSection = ({ title, children, className = '' }: { title?: string, children: React.ReactNode, className?: string }) => (
  <section className={`mb-8 ${className}`}>
    {title && <SectionHeader title={title} />}
    {children}
  </section>
);

export const PageHeader = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
    <div>
      <h1 className="text-2xl font-semibold text-text">{title}</h1>
      {subtitle && <p className="text-sm text-textSecondary mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const SectionHeader = ({ title, action }: { title: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-medium text-text">{title}</h2>
    {action && <div>{action}</div>}
  </div>
);

export const EmptyState = ({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-lg bg-surface text-center">
    <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-muted">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
    </div>
    <h3 className="text-text font-medium mb-1">{title}</h3>
    <p className="text-textSecondary text-sm mb-4 max-w-sm">{description}</p>
    {action}
  </div>
);

export const LoadingState = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-textSecondary text-sm">{message}</p>
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string, onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-danger/10 border border-danger/20 rounded-lg text-center">
    <svg className="w-8 h-8 text-danger mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <p className="text-danger font-medium mb-3">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="px-4 py-2 bg-danger/20 hover:bg-danger/30 text-danger text-sm font-medium rounded transition-colors">
        Retry
      </button>
    )}
  </div>
);

export const SkeletonLoader = ({ type = 'line', className = '' }: { type?: 'line' | 'card' | 'circle', className?: string }) => {
  const base = "animate-pulse bg-border rounded";
  const types = {
    line: "h-4 w-full",
    card: "h-32 w-full",
    circle: "h-12 w-12 rounded-full"
  };
  return <div className={`${base} ${types[type]} ${className}`} />;
};

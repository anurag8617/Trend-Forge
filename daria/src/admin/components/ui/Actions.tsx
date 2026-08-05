import React from 'react';

const BaseButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed ${className}`} {...props}>
    {children}
  </button>
);

export const PrimaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BaseButton className="bg-primary text-dariaNavy hover:bg-primarySoft focus:ring-primary font-semibold " {...props} />
);

export const SecondaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BaseButton className="bg-surface border border-border text-text hover:bg-card hover:border-textSecondary focus:ring-muted" {...props} />
);

export const DangerButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BaseButton className="bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 hover:border-danger/50 focus:ring-danger" {...props} />
);

export const IconButton = ({ icon, className = '', ...props }: { icon: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`p-2 rounded text-textSecondary hover:text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${className}`} {...props}>
    {icon}
  </button>
);

export const SplitButton = ({ mainAction, secondaryAction }: { mainAction: React.ReactNode, secondaryAction: React.ReactNode }) => (
  <div className="inline-flex rounded shadow-sm">
    <button className="px-4 py-2 bg-primary text-dariaNavy text-sm font-semibold rounded-l hover:bg-primarySoft focus:outline-none">{mainAction}</button>
    <button className="px-2 py-2 bg-primary text-dariaNavy border-l border-dariaNavy/20 rounded-r hover:bg-primarySoft focus:outline-none">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
);

export const DropdownMenu = ({ trigger, items }: { trigger: React.ReactNode, items: React.ReactNode[] }) => (
  <div className="relative inline-block text-left group">
    {trigger}
    <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden">
      <div className="py-1">
        {items.map((item, idx) => (
          <div key={idx} className="px-4 py-2 text-sm text-text hover:bg-surface cursor-pointer">{item}</div>
        ))}
      </div>
    </div>
  </div>
);

export const ContextMenu = () => <div className="hidden" />; // Placeholder for actual context menu hook

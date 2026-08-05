import React from 'react';

export const Breadcrumb = ({ items }: { items: { label: string, href?: string }[] }) => (
  <nav className="flex items-center space-x-2 text-sm text-muted">
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        {item.href ? (
          <a href={item.href} className="hover:text-text transition-colors">{item.label}</a>
        ) : (
          <span className="text-text font-medium">{item.label}</span>
        )}
        {idx < items.length - 1 && <span>/</span>}
      </React.Fragment>
    ))}
  </nav>
);

export const CommandPalette = () => (
  <div className="hidden border border-border bg-surface shadow-xl rounded-lg max-w-lg w-full absolute top-1/4 left-1/2 -translate-x-1/2 flex-col">
    <div className="p-3 border-b border-border flex items-center">
      <svg className="w-5 h-5 text-muted mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input type="text" placeholder="Type a command or search..." className="bg-transparent border-none outline-none text-text w-full placeholder-muted" />
    </div>
    <div className="p-2">
      <div className="px-3 py-1 text-xs text-textSecondary uppercase tracking-wider font-semibold">Suggestions</div>
      <button className="w-full text-left px-3 py-2 text-sm text-text hover:bg-card rounded flex items-center">Go to Dashboard</button>
      <button className="w-full text-left px-3 py-2 text-sm text-text hover:bg-card rounded flex items-center">Manage Users</button>
    </div>
  </div>
);

export const SearchBar = ({ placeholder = "Search...", onChange }: { placeholder?: string, onChange?: (val: string) => void }) => (
  <div className="relative w-full max-w-md">
    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    <input type="text" placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded text-sm text-text placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" />
  </div>
);

export const FilterBar = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-3 bg-surface p-2 border border-border rounded">
    <span className="text-sm text-textSecondary px-2">Filters:</span>
    {children}
  </div>
);

export const Tabs = ({ tabs, activeTab, onChange }: { tabs: { id: string, label: string }[], activeTab: string, onChange: (id: string) => void }) => (
  <div className="flex border-b border-border space-x-1">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-textSecondary hover:text-text'}`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export const SecondaryNavigation = ({ items, activeItem, onChange }: { items: { id: string, label: string }[], activeItem: string, onChange?: (id: string) => void }) => (
  <nav className="flex flex-col space-y-1 w-48 border-r border-border min-h-[calc(100vh-4rem)] p-2 bg-surface">
    {items.map(item => (
      <button key={item.id} onClick={() => onChange?.(item.id)} className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${activeItem === item.id ? 'bg-card text-primary font-medium' : 'text-textSecondary hover:bg-card hover:text-text'}`}>
        {item.label}
      </button>
    ))}
  </nav>
);

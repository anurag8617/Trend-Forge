import React from 'react';

export const TableSearch = () => (
  <div className="relative w-64">
    <svg className="w-4 h-4 absolute left-3 top-2.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    <input type="text" placeholder="Search table..." className="w-full pl-9 pr-3 py-1.5 bg-surface border border-border rounded text-sm text-text focus:border-primary focus:outline-none" />
  </div>
);

export const TableFilters = () => (
  <button className="flex items-center px-3 py-1.5 bg-surface border border-border rounded text-sm text-textSecondary hover:text-text hover:bg-card transition-colors">
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
    Filters
  </button>
);

export const ColumnVisibilityMenu = () => (
  <button className="flex items-center px-3 py-1.5 bg-surface border border-border rounded text-sm text-textSecondary hover:text-text hover:bg-card transition-colors">
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    Columns
  </button>
);

export const TableToolbar = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4 border-b border-border bg-card">
    <div className="flex items-center space-x-3">{children}</div>
  </div>
);

export const SortHeader = ({ label, direction }: { label: string, direction?: 'asc' | 'desc' }) => (
  <button className="flex items-center space-x-1 text-xs font-semibold text-textSecondary uppercase tracking-wider hover:text-text focus:outline-none">
    <span>{label}</span>
    <span className="flex flex-col opacity-50">
      <svg className={`w-3 h-3 -mb-1 ${direction === 'asc' ? 'text-primary opacity-100' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
      <svg className={`w-3 h-3 ${direction === 'desc' ? 'text-primary opacity-100' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
    </span>
  </button>
);

export const RowSelectionCheckbox = ({ checked, onChange }: { checked?: boolean, onChange?: () => void }) => (
  <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 rounded border-border bg-surface text-primary focus:ring-1 focus:ring-primary focus:ring-offset-background" />
);

export const BulkActionBar = ({ selectedCount, actions }: { selectedCount: number, actions: React.ReactNode }) => (
  selectedCount > 0 ? (
    <div className="bg-primary/10 border-b border-primary/20 p-2 flex items-center justify-between px-4">
      <span className="text-sm text-primary font-medium">{selectedCount} row{selectedCount > 1 ? 's' : ''} selected</span>
      <div className="flex items-center space-x-2">{actions}</div>
    </div>
  ) : null
);

export const TablePagination = () => (
  <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
    <span className="text-sm text-textSecondary">Showing 1 to 10 of 97 results</span>
    <div className="flex items-center space-x-1">
      <button className="px-3 py-1 border border-border rounded text-sm text-textSecondary hover:bg-surface disabled:opacity-50" disabled>Prev</button>
      <button className="px-3 py-1 border border-border rounded bg-primary text-background font-medium text-sm">1</button>
      <button className="px-3 py-1 border border-border rounded text-sm text-textSecondary hover:bg-surface">2</button>
      <button className="px-3 py-1 border border-border rounded text-sm text-textSecondary hover:bg-surface">Next</button>
    </div>
  </div>
);

export const DataTable = ({ children, isLoading, isEmpty, emptyState }: { children: React.ReactNode, isLoading?: boolean, isEmpty?: boolean, emptyState?: React.ReactNode }) => (
  <div className="w-full bg-card border border-border rounded-lg shadow overflow-hidden flex flex-col">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {children}
      </table>
      {isLoading && (
        <div className="p-8 flex justify-center border-t border-border"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      )}
      {!isLoading && isEmpty && (
        <div className="p-12 border-t border-border">{emptyState}</div>
      )}
    </div>
  </div>
);

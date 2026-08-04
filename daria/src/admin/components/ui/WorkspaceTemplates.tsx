import React from 'react';
import { Breadcrumb, PageHeader, Tabs, SectionHeader } from './index';

// Reusable Workspace Layout Template
// Handles the standard 3-column / 2-column enterprise structure
export function WorkspaceLayoutTemplate({
  sidebar,
  mainContent,
  inspector,
}: {
  sidebar?: React.ReactNode;
  mainContent: React.ReactNode;
  inspector?: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background text-text">
      {sidebar}
      <div className={`flex-1 overflow-y-auto flex flex-col min-w-0 ${inspector ? 'border-r border-border' : ''}`}>
        {mainContent}
      </div>
      {inspector && (
        <div className="w-80 bg-surface p-4 overflow-y-auto hidden lg:block">
          {inspector}
        </div>
      )}
    </div>
  );
}

// Reusable Page Template
// Standardizes the header area with breadcrumbs, title, actions, and tabs
export function PageTemplate({
  breadcrumbItems,
  title,
  subtitle,
  headerAction,
  tabs,
  activeTab,
  onTabChange,
  children
}: {
  breadcrumbItems: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-6 pb-0">
        <Breadcrumb items={breadcrumbItems} />
        <PageHeader title={title} subtitle={subtitle} action={headerAction} />
      </div>
      {tabs && activeTab && onTabChange && (
        <div className="px-6 pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
        </div>
      )}
      <div className="p-6 pt-6 flex-1 space-y-6 flex flex-col min-h-0">
        {children}
      </div>
    </>
  );
}

// Reusable Inspector Template
// Standardizes the right-hand panel
export function InspectorTemplate({
  title,
  children,
  emptyMessage
}: {
  title: string;
  children?: React.ReactNode;
  emptyMessage?: string;
}) {
  return (
    <>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">
        {title}
      </h3>
      {children ? (
        <div className="space-y-4">{children}</div>
      ) : (
        <div className="text-center text-sm text-textSecondary py-12">
          {emptyMessage || 'Select an item to inspect.'}
        </div>
      )}
    </>
  );
}

// Reusable Activity Panel Template
// Standardizes the bottom event timeline and KPI block
export function ActivityPanelTemplate({
  title,
  timeline,
  kpiBlocks
}: {
  title: string;
  timeline: React.ReactNode;
  kpiBlocks?: React.ReactNode;
}) {
  return (
    <div className="p-6 border-t border-border bg-surface/30 mt-auto">
      <SectionHeader title={title} />
      <div className={`grid grid-cols-1 ${kpiBlocks ? 'lg:grid-cols-3' : ''} gap-6`}>
        <div className={kpiBlocks ? 'lg:col-span-2' : 'col-span-1'}>
          {timeline}
        </div>
        {kpiBlocks && (
          <div className="space-y-4">
            {kpiBlocks}
          </div>
        )}
      </div>
    </div>
  );
}

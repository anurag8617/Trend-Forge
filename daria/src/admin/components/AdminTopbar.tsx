import React from 'react';

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Breadcrumbs or global search can go here */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-textSecondary hidden sm:block">Operator Session Active</div>
        <button className="w-8 h-8 rounded-full bg-border focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Profile menu" />
      </div>
    </header>
  );
}

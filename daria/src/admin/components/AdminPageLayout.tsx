import React from 'react';
import { useLocation } from 'react-router-dom';

export default function AdminPageLayout({ title }: { title: string }) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <div className="p-6 text-text h-full flex flex-col">
      <nav className="mb-6 text-sm text-muted flex items-center space-x-2">
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <span className={index === paths.length - 1 ? 'text-primary font-medium' : ''}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </span>
            {index < paths.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </nav>
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
    </div>
  );
}

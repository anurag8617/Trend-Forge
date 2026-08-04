// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const navItems = [
//   { path: '/admin/dashboard', label: 'Dashboard' },
//   { path: '/admin/users', label: 'Users' },
//   { path: '/admin/organizations', label: 'Organizations' },
//   { path: '/admin/engines', label: 'Engines' },
//   { path: '/admin/signals', label: 'Signals' },
//   { path: '/admin/forecasts', label: 'Forecasts' },
//   { path: '/admin/daria', label: 'DARIA' },
//   { path: '/admin/compliance', label: 'Compliance' },
//   { path: '/admin/security', label: 'Security' },
//   { path: '/admin/billing', label: 'Billing' },
//   { path: '/admin/monitoring', label: 'Monitoring' },
//   { path: '/admin/settings', label: 'Settings' },
// ];

// export default function AdminSidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (val: boolean) => void }) {
//   return (
//     <aside className={`transition-all duration-300 ease-in-out bg-surface border-r border-border h-screen flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
//       <div className="h-16 flex items-center justify-between px-4 border-b border-border">
//         {!collapsed && <span className="font-bold text-lg text-primary tracking-wide uppercase">Admin Plane</span>}
//         <button 
//           onClick={() => setCollapsed(!collapsed)} 
//           className="p-2 rounded hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary text-textSecondary"
//           aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
//         </button>
//       </div>
//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <NavLink 
//                 to={item.path}
//                 className={({ isActive }) => `flex items-center px-4 py-3 mx-2 rounded transition-colors ${isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-textSecondary hover:bg-card hover:text-text border-l-2 border-transparent'}`}
//                 title={collapsed ? item.label : undefined}
//               >
//                 <div className="w-6 h-6 mr-3 flex-shrink-0 bg-border rounded flex items-center justify-center opacity-50" />
//                 {!collapsed && <span>{item.label}</span>}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }






import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { typography, colors } from '../../lib/tokens';
import logo from '../../assets/logo.png';
import { EngineGlyphs } from '../../components/EngineGlyph'; // Imported your client icons!

// Divided into categories exactly as requested
const adminNavGroups = [
  {
    items: [
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: (
          <rect width="10" height="10" x="7" y="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        ),
      },
    ],
  },
  {
    items: [
      { name: 'Engines', path: '/admin/engines', icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /> },
      { name: 'Signals', path: '/admin/signals', icon: EngineGlyphs.ghost },     // Matched to Client Icon
      { name: 'Forecasts', path: '/admin/forecasts', icon: EngineGlyphs.quantum }, // Matched to Client Icon
      { name: 'DARIA', path: '/admin/daria', icon: <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 6h8M8 18h8M12 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
    ],
  },
  {

    items: [
      { name: 'Organizations', path: '/admin/organizations', icon: <path d="M3 21h18M5 21V7l8-4v18M13 3l8 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
      { name: 'Users', path: '/admin/users', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
    ],
  },
  {
    items: [
      { name: 'Security', path: '/admin/security', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
      { name: 'Compliance', path: '/admin/compliance', icon: EngineGlyphs.disinfo }, // Matched to Client Icon
    ],
  },
  {
    items: [
      { name: 'Monitoring', path: '/admin/monitoring', icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
    ],
  },
  {
    items: [
      { name: 'Billing', path: '/admin/billing', icon: <rect width="12" height="12" x="6" y="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /> },
    ],
  },
];

// Bottom items anchored at the bottom just like the Client Sidebar
const bottomNavItems = [
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  }
];

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed md:relative inset-y-0 left-0 flex flex-col h-full bg-background border-r border-border transition-all duration-300 ease-in-out z-50 ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-surface border border-border text-textSecondary hover:text-text hover:border-primary/50 hover:shadow-[0_0_8px_var(--color-primary-soft)] rounded-full p-1.5 z-50 transition-all shadow-lg cursor-pointer hidden md:block"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo & Brand Name */}
        <div
          className={`h-20 flex items-center border-b border-border transition-all duration-300 ${
            isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'
          }`}
        >
          <img src={logo} alt="TrendForge Logo" className="w-10 h-10 object-contain shrink-0" />
          <div
            className={`flex flex-col justify-center overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            <h1 className="text-base font-bold leading-tight tracking-tight flex items-center text-text">
              <span>Trend</span>
              <span className="text-primary ml-0.5">Forge</span>
            </h1>
            <p className="text-[8px] uppercase tracking-[0.1em] text-muted font-semibold mt-0.5">
              System Administration
            </p>

            <div className="flex flex-col justify-center mt-0.5">
              <div className="w-13 h-px bg-[#596272] opacity-60"></div>
              <span className="mt-0.5 text-[8px] tracking-[0.35em] font-bold text-[#6F7888]">
                ADMIN PLANE
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation (Categorized) */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col scrollbar-hide">
          {adminNavGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-1 pl-3">

              {/* Category Links */}
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    title={isCollapsed ? item.name : ''}
                    className={`relative flex items-center py-2.5 rounded group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isCollapsed ? 'justify-center md:pr-3 px-3 md:px-0' : 'gap-4 px-3'
                    } ${
                      isActive
                        ? 'bg-linear-to-r from-[#13383f] to-surface-100 text-white'
                        : `${typography.textSecondary} hover:bg-surface/30 hover:text-white`
                    }`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg
                        className={`w-5 h-5 transition-colors ${
                          isActive ? 'text-cyan-400' : 'text-[#4b5563] group-hover:text-cyan-400'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {item.icon}
                      </svg>
                    </div>

                    {(!isCollapsed || window.innerWidth < 768) && (
                      <div className="flex items-center justify-between flex-1 overflow-hidden">
                        <span className="text-[13px] font-medium tracking-wide whitespace-nowrap overflow-hidden">
                          {item.name}
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto flex flex-col gap-1 pl-3 pb-6">
          <div className="h-px bg-surface mx-3 mb-4"></div>
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.name : ''}
                className={`flex items-center py-2 rounded group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isCollapsed ? 'justify-center md:px-0 px-3' : 'gap-4 px-3'
                } ${
                  isActive
                    ? 'bg-linear-to-r from-[#13383f] to-surface-100 text-white'
                    : `${typography.textSecondary} hover:bg-surface/30 hover:text-white`
                }`}
              >
                <svg
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>

                {(!isCollapsed || window.innerWidth < 768) && (
                  <span className="text-[12px] font-medium tracking-wide whitespace-nowrap overflow-hidden">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
} 
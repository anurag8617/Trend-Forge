import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PageWrapper from './PageWrapper';
import { AnimatePresence } from 'framer-motion';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-[#111113] text-white font-sans overflow-hidden selection:bg-cyan-500/30">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-[#111113]">
        <Header />
        <AnimatePresence mode="wait">
          <PageWrapper key={location.pathname}>
            <Outlet />
          </PageWrapper>
        </AnimatePresence>
      </main>
    </div>
  );
}

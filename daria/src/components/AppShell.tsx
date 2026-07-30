import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppState } from '../state/AppContext';
import { typography } from '../lib/tokens';
import TopLoadBar from './TopLoadBar';

export default function AppShell() {
  const location = useLocation();
  const { toasts, tenant } = useAppState();

  return (
    <div className={`theme-${tenant} flex h-screen w-screen overflow-hidden bg-background text-white`}>
      <TopLoadBar />
      {/* Background glow effects to match the 'deep water' aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none"></div>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        
        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto px-8 py-6 relative">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Global Toasts (Audit Trail Visible UI) */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-surface border border-accent shadow-[0_0_15px_rgb(var(--theme-accent-rgb) / 0.2)] p-4 rounded-lg pointer-events-auto max-w-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--theme-accent)] shrink-0"></div>
                <p className={`${typography.textPrimary} text-sm leading-relaxed`}>
                  {toast.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type DariaState } from '../components/DariaJellyfish';

export type TriggerEngine = 'ghost' | 'quantum' | 'bio' | 'disinfo' | 'holo' | null;
export type Tenant = 'daria' | 'gov' | 'enterprise' | 'marketing' | 'clientA' | 'clientB';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
}

export interface Toast {
  id: string;
  message: string;
}

interface AppContextType {
  isAlertActive: boolean;
  triggerEngine: TriggerEngine;
  setAlertState: (active: boolean, engine?: TriggerEngine) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, detail: string) => void;
  toasts: Toast[];
  removeToast: (id: string) => void;
  dariaState: DariaState;
  setDariaState: React.Dispatch<React.SetStateAction<DariaState>>;
  tenant: Tenant;
  setTenant: (t: Tenant) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const loadInitialLogs = (): AuditLog[] => {
  const saved = localStorage.getItem('daria_audit_logs');
  if (saved) return JSON.parse(saved);
  return [
    { id: 'log-1', timestamp: new Date().toISOString(), action: 'SYSTEM_START', detail: 'DARIA Supervisor initialized.' }
  ];
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [triggerEngine, setTriggerEngine] = useState<TriggerEngine>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(loadInitialLogs);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dariaState, setDariaState] = useState<DariaState>('standby');
  const [tenant, setTenant] = useState<Tenant>('daria');


  const setAlertState = (active: boolean, engine: TriggerEngine = null) => {
    setIsAlertActive(active);
    setTriggerEngine(active ? engine : null);
    if (active && engine) {
      addAuditLog('ALERT_TRIGGERED', `Attention needed in ${engine}.`);
    }
  };

useEffect(() => {
    localStorage.setItem('daria_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (action: string, detail: string) => {
    const newLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      detail
    };
    
    setAuditLogs(prev => [newLog, ...prev]);
    
    // Also show toast
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id: toastId, message: detail }]);
    setTimeout(() => {
      removeToast(toastId);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      isAlertActive, 
      triggerEngine, 
      setAlertState,
      auditLogs,
      addAuditLog,
      toasts,
      removeToast,
      dariaState,
      setDariaState,
      tenant,
      setTenant
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

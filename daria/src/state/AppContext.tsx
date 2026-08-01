import React, { createContext, useContext, useState, useEffect } from 'react';
import { type DariaState } from '../components/DariaJellyfish';

export type TriggerEngine = 'ghost' | 'quantum' | 'bio' | 'disinfo' | 'holo' | null;
export type Tenant = 'daria' | 'gov' | 'enterprise' | 'marketing' | 'clientA' | 'clientB';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
  evidencePackId?: string;
}

export interface EvidenceSource {
  name: string;
  weight: number;
  trust: string;
}

export interface EvidencePack {
  id: string;
  timestamp: string;
  engine: string;
  trendScore: string;
  confidence: number;
  sources: EvidenceSource[];
  backtest: string;
  compliance: string[];
}

export interface Signal {
  id: number;
  title: string;
  severity: string;
  timestamp: string;
  sparkline: string;
  dariaVoice: string;
  cta: string;
  technicalDetails: string[];
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
  addAuditLog: (action: string, detail: string, evidencePackId?: string) => void;
  evidencePacks: EvidencePack[];
  createEvidencePack: (data: Omit<EvidencePack, 'id'>) => string;
  toasts: Toast[];
  removeToast: (id: string) => void;
  dariaState: DariaState;
  setDariaState: React.Dispatch<React.SetStateAction<DariaState>>;
  tenant: Tenant;
  setTenant: (t: Tenant) => void;
  resetDemoData: () => void;
  signals: Signal[];
  hasNewSignals: boolean;
  clearNewSignals: () => void;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  replayTour: () => void;
  presentationMode: boolean;
  togglePresentationMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const loadInitialLogs = (): AuditLog[] => {
  try {
    const saved = localStorage.getItem('trendforge:auditLogs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [
    { id: 'log-1', timestamp: new Date().toISOString(), action: 'SYSTEM_START', detail: 'DARIA Supervisor initialized.' }
  ];
};

const INITIAL_EVIDENCE_PACKS: EvidencePack[] = [
  {
    id: 'ev-092',
    timestamp: '2026-07-29T14:22:10Z',
    engine: 'Quantum Guess',
    trendScore: '84.2',
    confidence: 94,
    sources: [
      { name: 'Social Graph Velocity (Nodes 40-82)', weight: 45, trust: 'High' },
      { name: 'Historical Saturation Curve Match', weight: 35, trust: 'Very High' },
      { name: 'Cross-Platform Arousal Delta', weight: 20, trust: 'Medium' },
    ],
    backtest: 'Matched to historical curve event [EV-2024-8A] with 91% correlation. Projected decay in 72 hours.',
    compliance: [
      "✓ Kept everyone's identity private (GDPR rule)",
      "✓ Made sure ads only go to the right people (CCPA rule)",
      "✓ Checked that we aren't spending too much money (FISMA rule)"
    ]
  },
  {
    id: 'ev-091',
    timestamp: '2026-07-29T10:15:44Z',
    engine: 'Ghost Mode',
    trendScore: '61.4',
    confidence: 82,
    sources: [
      { name: 'Fringe Network Anomaly Scans', weight: 60, trust: 'Medium' },
      { name: 'Keyword Emergence Delta', weight: 40, trust: 'High' },
    ],
    backtest: 'Insufficient historical data for direct match. Relies purely on structural velocity metrics.',
    compliance: [
      "✓ Made sure no personal information was shared",
      "✓ Kept data completely anonymous"
    ]
  },
  {
    id: 'ev-090',
    timestamp: '2026-07-28T22:05:12Z',
    engine: 'DARIA Supervisor',
    trendScore: '92.1',
    confidence: 99,
    sources: [
      { name: 'Aggregated Engine Output', weight: 80, trust: 'Very High' },
      { name: 'HoloBidder Liquidity Verification', weight: 20, trust: 'High' },
    ],
    backtest: 'Cross-engine consensus achieved. 100% match with internal execution protocols.',
    compliance: [
      "✓ Got approval from the boss automatically",
      "✓ Turned on rules to stop market manipulation"
    ]
  }
];

const loadInitialEvidencePacks = (): EvidencePack[] => {
  try {
    const saved = localStorage.getItem('trendforge:evidencePacks');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return INITIAL_EVIDENCE_PACKS;
};

const loadInitialTenant = (): Tenant => {
  try {
    const saved = localStorage.getItem('trendforge:tenant');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed) return parsed as Tenant;
    }
  } catch (e) {}
  return 'daria';
};

const INITIAL_SIGNALS: Signal[] = [
  {
    id: 1,
    title: 'Mob-wife aesthetic — fringe velocity spike',
    severity: 'high',
    timestamp: '12 min ago',
    sparkline: 'M0 25 L20 22 L40 24 L60 15 L80 18 L100 5',
    dariaVoice: 'This is spreading fast and naturally across lots of platforms. It looks like a good time to advertise.',
    cta: 'Review buy window',
    technicalDetails: [
      'Source group: 99B',
      'Cross-community spread: Confirmed',
      'Growth vs normal: +412%',
      'Fake account check: Passed'
    ]
  },
  {
    id: 2,
    title: 'Y2K translucent hardware — steady buildup',
    severity: 'medium',
    timestamp: '45 min ago',
    sparkline: 'M0 25 L20 26 L40 23 L60 20 L80 16 L100 12',
    dariaVoice: 'This is slowly building up in a small group of fans. Not big yet, but growing.',
    cta: 'View evidence',
    technicalDetails: [
      'Source group: 21A',
      'Cross-community spread: Pending',
      'Growth vs normal: +65%',
      'Fake account check: Passed'
    ]
  },
  {
    id: 3,
    title: 'Brutalist web revival — early rumblings',
    severity: 'low',
    timestamp: '2 hrs ago',
    sparkline: 'M0 25 L20 24 L40 25 L60 26 L80 23 L100 20',
    dariaVoice: "A small, steady signal is showing up in design communities. I'm keeping an eye on it.",
    cta: 'View evidence',
    technicalDetails: [
      'Source group: 01C',
      'Cross-community spread: Negative',
      'Growth vs normal: +15%',
      'Fake account check: Pending'
    ]
  }
];

const FILLER_SIGNALS = [
  {
    title: 'Micro-niche hobby overlap — tracing origins',
    severity: 'low',
    sparkline: 'M0 26 L20 25 L40 26 L60 25 L80 24 L100 23',
    dariaVoice: 'Noticing a subtle correlation in niche forums. Just tracking for now.',
    cta: 'View evidence',
    technicalDetails: ['Source group: 08F', 'Cross-community spread: Negative', 'Growth vs normal: +8%', 'Fake account check: Pending']
  },
  {
    title: 'Retro-futurism aesthetic — minor blip',
    severity: 'low',
    sparkline: 'M0 25 L20 27 L40 26 L60 25 L80 26 L100 24',
    dariaVoice: 'A few isolated posts are getting traction, but nothing cohesive yet.',
    cta: 'View evidence',
    technicalDetails: ['Source group: 14D', 'Cross-community spread: Negative', 'Growth vs normal: +11%', 'Fake account check: Passed']
  },
  {
    title: 'Neo-noir fashion — scattered mentions',
    severity: 'low',
    sparkline: 'M0 24 L20 24 L40 23 L60 24 L80 25 L100 23',
    dariaVoice: 'Keeping an eye on some scattered aesthetics popping up. Too early to tell.',
    cta: 'View evidence',
    technicalDetails: ['Source group: 33Z', 'Cross-community spread: Pending', 'Growth vs normal: +14%', 'Fake account check: Passed']
  }
];

const loadInitialOnboarding = (): boolean => {
  try {
    const saved = localStorage.getItem('trendforge:hasSeenOnboarding');
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (e) {}
  return false;
};

const loadInitialPresentationMode = (): boolean => {
  try {
    const saved = localStorage.getItem('trendforge:presentationMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (e) {}
  return false;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [triggerEngine, setTriggerEngine] = useState<TriggerEngine>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(loadInitialLogs);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dariaState, setDariaState] = useState<DariaState>('standby');
  const [tenant, setTenant] = useState<Tenant>(loadInitialTenant);
  const [evidencePacks, setEvidencePacks] = useState<EvidencePack[]>(loadInitialEvidencePacks);
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [hasNewSignals, setHasNewSignals] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(loadInitialOnboarding);
  const [presentationMode, setPresentationMode] = useState<boolean>(loadInitialPresentationMode);

  // Ambient simulation
  useEffect(() => {
    let timeoutId: number;

    const runSimulationTick = () => {
      // Don't interrupt if alert is active or buy modal is likely open (buy modal relies on isAlertActive initially, but we can just use isAlertActive)
      if (!isAlertActive) {
        const rand = Math.random();
        if (rand < 0.25) {
          // Add low-severity mock signal
          const filler = FILLER_SIGNALS[Math.floor(Math.random() * FILLER_SIGNALS.length)];
          setSignals(prev => [{
            ...filler,
            id: Date.now(),
            timestamp: 'Just now'
          }, ...prev]);
          setHasNewSignals(true);
        } else {
          // Nudge scanning state
          setDariaState(prev => {
            if (prev === 'standby') {
              setTimeout(() => {
                setDariaState(current => current === 'scanning' ? 'standby' : current);
              }, 2000 + Math.random() * 1000);
              return 'scanning';
            }
            return prev;
          });
        }
      }
      
      // Schedule next tick (15-25 seconds)
      const nextDelay = 15000 + Math.random() * 10000;
      timeoutId = window.setTimeout(runSimulationTick, nextDelay);
    };

    // Initial scheduling
    const initialDelay = 15000 + Math.random() * 10000;
    timeoutId = window.setTimeout(runSimulationTick, initialDelay);

    return () => window.clearTimeout(timeoutId);
  }, [isAlertActive]);

  const setAlertState = (active: boolean, engine: TriggerEngine = null) => {
    setIsAlertActive(active);
    setTriggerEngine(active ? engine : null);
    if (active && engine) {
      addAuditLog('ALERT_TRIGGERED', `Attention needed in ${engine}.`);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('trendforge:auditLogs', JSON.stringify(auditLogs));
    } catch (e) {}
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('trendforge:evidencePacks', JSON.stringify(evidencePacks));
    } catch (e) {}
  }, [evidencePacks]);

  useEffect(() => {
    try {
      localStorage.setItem('trendforge:tenant', JSON.stringify(tenant));
    } catch (e) {}
  }, [tenant]);

  useEffect(() => {
    try {
      localStorage.setItem('trendforge:hasSeenOnboarding', JSON.stringify(hasSeenOnboarding));
    } catch (e) {}
  }, [hasSeenOnboarding]);

  useEffect(() => {
    try {
      localStorage.setItem('trendforge:presentationMode', JSON.stringify(presentationMode));
    } catch (e) {}
  }, [presentationMode]);

  const addAuditLog = (action: string, detail: string, evidencePackId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      detail,
      ...(evidencePackId ? { evidencePackId } : {})
    };
    
    setAuditLogs(prev => [newLog, ...prev]);
    
    // Also show toast
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id: toastId, message: detail }]);
    setTimeout(() => {
      removeToast(toastId);
    }, 4000);
  };

  const createEvidencePack = (data: Omit<EvidencePack, 'id'>) => {
    let newId = '';
    setEvidencePacks(prev => {
      const maxNum = prev.reduce((max, pack) => {
        const num = parseInt(pack.id.split('-')[1]);
        return num > max ? num : max;
      }, 0);
      newId = `ev-${String(maxNum + 1).padStart(3, '0')}`;
      return [{ ...data, id: newId }, ...prev];
    });
    // Calculate newId synchronously to return it
    const maxNum = evidencePacks.reduce((max, pack) => {
      const num = parseInt(pack.id.split('-')[1]);
      return num > max ? num : max;
    }, 0);
    return `ev-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem('trendforge:auditLogs');
      localStorage.removeItem('trendforge:evidencePacks');
      localStorage.removeItem('trendforge:tenant');
      localStorage.removeItem('trendforge:hasSeenOnboarding');
    } catch (e) {}
    
    setAuditLogs([
      { id: 'log-1', timestamp: new Date().toISOString(), action: 'SYSTEM_START', detail: 'DARIA Supervisor initialized.' }
    ]);
    setEvidencePacks(INITIAL_EVIDENCE_PACKS);
    setTenant('daria');
    setSignals(INITIAL_SIGNALS);
    setHasNewSignals(false);
    setHasSeenOnboarding(false);
  };

  const clearNewSignals = () => setHasNewSignals(false);
  const completeOnboarding = () => setHasSeenOnboarding(true);
  const replayTour = () => setHasSeenOnboarding(false);
  const togglePresentationMode = () => setPresentationMode(prev => !prev);

  return (
    <AppContext.Provider value={{  
      isAlertActive, 
      triggerEngine, 
      setAlertState,
      auditLogs,
      addAuditLog,
      evidencePacks,
      createEvidencePack,
      toasts,
      removeToast,
      dariaState,
      setDariaState,
      tenant,
      setTenant,
      resetDemoData,
      signals,
      hasNewSignals,
      clearNewSignals,
      hasSeenOnboarding,
      completeOnboarding,
      replayTour,
      presentationMode,
      togglePresentationMode
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

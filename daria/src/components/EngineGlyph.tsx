import type { ReactNode } from 'react';

export const EngineGlyphs: Record<string, ReactNode> = {
  ghost: <polygon points="12,4 20,12 12,20 4,12" fill="none" stroke="currentColor" strokeWidth="1.5"/>,
  quantum: <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>,
  bio: <polygon points="12,5 19,12 12,19 5,12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>,
  disinfo: <polygon points="12,6 18,12 12,18 6,12" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>,
  holo: <rect width="12" height="12" x="6" y="6" transform="rotate(45 12 12)" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5"/>
};

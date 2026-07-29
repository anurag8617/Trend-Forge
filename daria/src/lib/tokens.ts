/**
 * DARIA Design System Tokens
 * 
 * Strict Palette Rules:
 * 1. Backgrounds: Deep navy-to-indigo gradients or solid navy.
 * 2. Accents: ONLY Cyan (#3DD6F5) is allowed. It must be used sparingly to indicate state.
 * 3. Text: Strict white/gray hierarchy (100% white, ~60% gray, ~35% gray).
 * 4. Exception: A red-adjacent color is allowed ONLY for compliance-blocked states.
 * 5. NO other secondary accent colors are permitted.
 */

export const colors = {
  // Page & Panel Backgrounds
  bgPage: 'bg-navy-indigo-gradient',
  bgPanel: 'bg-[#0A0F1C]/60 border border-[#1A1B41] backdrop-blur-md rounded-xl',
  
  // Single Accent (State only)
  accentText: 'text-accent',
  accentBg: 'bg-accent',
  accentBorder: 'border-accent',
  accentGlow: 'shadow-[0_0_15px_rgb(var(--theme-accent-rgb) / 0.4)]',
  
  // Exception: Compliance Blocked State
  blockedText: 'text-red-500',
  blockedBg: 'bg-red-500/10',
  blockedBorder: 'border-red-500/50',
};

export const typography = {
  // Strict Text Hierarchy
  textPrimary: 'text-white',
  textSecondary: 'text-[#d1d5db]', // Tailwind gray-300
  textTertiary: 'text-[#9ca3af]', // Tailwind gray-400
  
  // Micro-labels (Section tags, status pills)
  microLabel: 'text-[10px] font-semibold uppercase tracking-[0.15em]',
  
  // Hero Metrics (e.g., "72 HRS", "42ms")
  heroMetric: 'text-5xl md:text-7xl font-light tracking-tight text-white leading-none',
  heroMetricSub: 'text-3xl font-light tracking-tight text-white',
};

export const layout = {
  // Reusable layouts
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
};

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../state/AppContext';

const TOUR_STEPS = [
  {
    target: 'daria-panel',
    text: "This is DARIA — she's always watching for trends worth acting on."
  },
  {
    target: 'trend-score',
    text: "When she finds something, this fills in — otherwise it stays at '—', never a fake number."
  },
  {
    target: 'pipeline',
    text: "These are her five engines, each doing one job — detecting, forecasting, and executing."
  },
  {
    target: 'sidebar-signals',
    text: "Every signal she finds shows up here in plain language, not raw data."
  }
];

interface OnboardingTourProps {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function OnboardingTour({ sidebarOpen, setSidebarOpen }: OnboardingTourProps) {
  const location = useLocation();
  const { hasSeenOnboarding, completeOnboarding } = useAppState();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 480);
  
  // Track if we forced the sidebar open for step 4
  const forcedSidebarRef = useRef(false);

  useEffect(() => {
    if (hasSeenOnboarding || location.pathname !== '/dashboard') {
      setCurrentStep(0);
      setTargetRect(null);
      if (forcedSidebarRef.current) {
        setSidebarOpen(false);
        forcedSidebarRef.current = false;
      }
      return;
    }

    const step = TOUR_STEPS[currentStep];
    const isMobile = window.innerWidth < 768;

    // Force sidebar open on mobile for the signals step
    if (step.target === 'sidebar-signals' && isMobile) {
      if (!sidebarOpen) {
        setSidebarOpen(true);
        forcedSidebarRef.current = true;
      }
    } else if (forcedSidebarRef.current) {
      setSidebarOpen(false);
      forcedSidebarRef.current = false;
    }

    // Attempt to scroll into view
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (!isVisible) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    let resizeTimer: number;

    const updateRect = () => {
      setIsSmallScreen(window.innerWidth < 480);
      const currentEl = document.querySelector(`[data-tour="${step.target}"]`);
      if (currentEl) {
        setTargetRect(currentEl.getBoundingClientRect());
      } else {
        // Fallback or loading state
        setTargetRect(null);
      }
    };

    const debouncedUpdate = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateRect, 100);
    };

    // Initial update needs a slight delay to allow scroll and sidebar transitions to settle
    const initialTimer = window.setTimeout(updateRect, 300);
    const fallbackInterval = setInterval(updateRect, 500); // safety net

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);
    window.addEventListener('scroll', debouncedUpdate, true);
    
    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(resizeTimer);
      clearInterval(fallbackInterval);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate, true);
    };
  }, [hasSeenOnboarding, location.pathname, currentStep, setSidebarOpen, sidebarOpen]);

  if (hasSeenOnboarding || location.pathname !== '/dashboard') return null;

  const stepInfo = TOUR_STEPS[currentStep];

  const finishTour = () => {
    if (forcedSidebarRef.current) {
      setSidebarOpen(false);
      forcedSidebarRef.current = false;
    }
    completeOnboarding();
  };

  const handleNext = () => {
    if (currentStep === TOUR_STEPS.length - 1) {
      finishTour();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Clamp popup position for non-bottom-sheet view
  let top = 0;
  let left = 0;
  
  if (targetRect && !isSmallScreen) {
    const cardWidth = 300; 
    const cardHeight = 160; 
    
    top = targetRect.bottom + 24;
    left = targetRect.left;
    
    // Clamp horizontal
    if (left + cardWidth > window.innerWidth - 16) {
      left = window.innerWidth - cardWidth - 16;
    }
    if (left < 16) left = 16;
    
    // Flip vertical if out of bounds
    if (top + cardHeight > window.innerHeight - 16) {
      top = Math.max(16, targetRect.top - cardHeight - 24);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dim Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 pointer-events-auto"
      />

      {/* Target Highlight */}
      {targetRect && (
        <motion.div
          layout
          className="absolute border-2 border-cyan-400 rounded-xl pointer-events-none z-10 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}

      {/* Tooltip Card */}
      <AnimatePresence mode="wait">
        {targetRect && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: isSmallScreen ? 20 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isSmallScreen ? 20 : -10 }}
            transition={{ duration: 0.3 }}
            className={`
              absolute bg-[#111113] border border-cyan-400/50 rounded-xl p-5 shadow-2xl shadow-cyan-900/20 pointer-events-auto z-20 flex flex-col justify-between
              ${isSmallScreen ? 'bottom-4 left-4 right-4 w-auto max-w-full' : 'w-72 max-w-[90vw]'}
            `}
            style={isSmallScreen ? {} : { top, left }}
          >
            <p className="text-white text-sm leading-relaxed mb-6">
              {stepInfo.text}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <button 
                onClick={finishTour}
                className="text-[#8A8F98] text-sm hover:text-white transition-colors h-[44px] px-2 -ml-2 flex items-center"
              >
                Skip tour
              </button>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#8A8F98]">
                  {currentStep + 1} / {TOUR_STEPS.length}
                </span>
                <button 
                  onClick={handleNext}
                  className="bg-cyan-400 text-background px-5 h-[44px] rounded text-sm font-semibold hover:bg-cyan-300 transition-colors flex items-center justify-center"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? 'Got it' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

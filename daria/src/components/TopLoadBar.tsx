import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopLoadBar() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // When location changes, trigger the loading bar
    setIsLoading(true);
    
    // Simulate the loading time (can be replaced with real loading state if you have one)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 600); 

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: '100%', opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-0 left-0 h-[3px] bg-primary z-[9999]"
          style={{ 
            boxShadow: '0 0 10px var(--color-primary), 0 0 5px var(--color-glow)' 
          }}
        />
      )}
    </AnimatePresence>
  );
}

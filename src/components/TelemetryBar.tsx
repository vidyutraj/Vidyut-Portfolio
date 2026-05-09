import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TelemetryBar — atmospheric meta strip above the navbar.
 * Evokes mission control chrome: coordinates, session time, system status.
 * Pure decoration — no logic hooks in.
 */
export const TelemetryBar = () => {
  const [sessionTime, setSessionTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setSessionTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utc = sessionTime.toISOString().split('T')[1].slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-[60] h-6 bg-background/80 backdrop-blur-xl border-b border-border/40"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="status-ok" />
            <span className="hidden sm:inline">System Online</span>
            <span className="sm:hidden">Live</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-muted-foreground/50">
            <span>NET</span>
            <span className="text-foreground/70">/ ATL.01</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-muted-foreground/50">
            Sig <span className="text-foreground/70">0x00A9</span>
          </span>
          <span className="text-muted-foreground/50">
            UTC <span className="text-foreground/80 tabular-nums">{utc}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

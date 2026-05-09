import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/components/AnimatedSection';

interface SectionHeaderProps {
  /** Kept for backwards compatibility — no longer rendered. */
  command?: string;
  title: string;
  description?: string;
  /** Section index for numbered eyebrow (e.g. "01"). Optional. */
  index?: string;
  /** Short kicker text shown above the title (e.g. "Selected Work"). */
  kicker?: string;
  /** Optional meta line shown on the right (e.g. "12 records"). */
  meta?: string;
}

export const SectionHeader = ({
  title,
  description,
  index,
  kicker,
  meta,
}: SectionHeaderProps) => {
  return (
    <div className="relative">
      {/* Mission-control header strip */}
      <div className="flex items-start justify-between mb-8 gap-6">
        <div className="flex items-center gap-4">
          {/* Numbered block — monospace, bordered */}
          {index && (
            <div className="flex items-center gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 px-2.5 py-1 rounded-md border border-border/60 bg-card/50 backdrop-blur-sm">
                <span className="text-primary/90">§</span>{' '}
                <span className="text-foreground/90">{index}</span>
              </div>
              <div className="h-px w-8 bg-border/60" />
              {kicker && (
                <span className="mono-meta">{kicker}</span>
              )}
            </div>
          )}
        </div>

        {meta && (
          <div className="hidden md:flex items-center gap-2 mono-meta">
            <span className="status-info" />
            <span>{meta}</span>
          </div>
        )}
      </div>

      {/* Title — display weight */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] mb-6 gradient-text"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Hairline accent with end tick — evokes a measurement rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT_EXPO }}
        className="relative mt-10 origin-left"
      >
        <div className="hairline" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_6px_hsl(var(--primary)/0.6)]" />
      </motion.div>
    </div>
  );
};

interface TechBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
}

export const TechBadge = ({ children, icon }: TechBadgeProps) => (
  <span className="chip">
    {icon}
    {children}
  </span>
);

export const GlowOrb = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
    style={{
      background:
        'radial-gradient(circle, hsl(var(--glow-primary) / 0.6) 0%, transparent 65%)',
    }}
  />
);

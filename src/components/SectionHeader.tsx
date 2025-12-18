import { ReactNode } from 'react';

interface SectionHeaderProps {
  command: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({ command, title, description }: SectionHeaderProps) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-accent font-mono text-sm">$</span>
      <span className="text-primary font-mono text-sm">{command}</span>
      <span className="w-2 h-4 bg-primary/80 animate-blink" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

interface TechBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
}

export const TechBadge = ({ children, icon }: TechBadgeProps) => (
  <span className="tech-badge">
    {icon}
    {children}
  </span>
);

export const GlowOrb = ({ className = '' }: { className?: string }) => (
  <div 
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    style={{
      background: 'radial-gradient(circle, hsl(var(--glow-primary)) 0%, transparent 70%)',
    }}
  />
);

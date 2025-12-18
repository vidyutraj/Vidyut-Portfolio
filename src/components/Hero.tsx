import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { GlowOrb } from '@/components/SectionHeader';
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Glow orbs */}
      <GlowOrb className="w-96 h-96 -top-48 -left-48" />
      <GlowOrb className="w-72 h-72 top-1/3 -right-36 opacity-10" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan" />
      </div>

      <div className="container relative z-10 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent font-mono text-sm">$</span>
              <span className="text-muted-foreground font-mono text-sm">whoami</span>
              <span className="w-2 h-4 bg-primary/80 animate-blink" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
              [Your Name]
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-xl md:text-2xl text-primary font-mono mb-6">
              Cybersecurity & Cloud Engineer{' '}
              <span className="text-muted-foreground">|</span>{' '}
              <span className="text-accent">Builder</span>{' '}
              <span className="text-muted-foreground">|</span>{' '}
              <span className="text-foreground/80">Georgia Tech</span>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Building secure, resilient systems at the intersection of{' '}
              <span className="text-foreground">zero-trust infrastructure</span>,{' '}
              <span className="text-foreground">cloud automation</span>, and{' '}
              <span className="text-foreground">detection engineering</span>.
              Passionate about making complex systems observable and secure.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#resume">
                  <FileText className="w-5 h-5" />
                  View Resume
                </a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#projects">
                  Projects
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <AnimatedSection delay={0.8} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a 
            href="#about" 
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="font-mono text-xs">scroll</span>
            <ChevronDown className="w-5 h-5 animate-float" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

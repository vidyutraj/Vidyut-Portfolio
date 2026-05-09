import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ChevronDown, BookOpen, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { personalInfo } from '@/data/personal';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Magnetic portrait — follows cursor subtly
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
    >
      {/* Atmospheric layers */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="aurora" />
        <div className="absolute inset-0 hex-pattern opacity-60 mask-fade-b" />
        <div className="absolute inset-0 grid-pattern opacity-20 mask-fade-b" />
      </motion.div>

      {/* Horizontal telemetry rails — circuit traces across the viewport */}
      <div className="absolute inset-x-0 top-1/4 h-px circuit-pattern opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-1/4 h-px circuit-pattern opacity-30 pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 px-6 md:px-10 max-w-7xl"
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow — telemetry strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-8"
            >
              <div className="telemetry-strip">
                <span className="flex items-center gap-1.5">
                  <span className="status-ok pulse-dot" />
                  <span className="text-foreground/80">Available</span>
                </span>
                <span>{personalInfo.location}</span>
                <span className="hidden sm:inline">Georgia Tech / CMPE</span>
              </div>
            </motion.div>

            {/* Name — big display */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-[clamp(2.75rem,7.5vw,6.25rem)] font-semibold text-foreground leading-[0.92] tracking-[-0.035em] mb-6 break-words"
            >
              <span className="block gradient-text">
                {personalInfo.name.split(' ')[0]}
              </span>
              <span className="block gradient-text">
                {personalInfo.name.split(' ').slice(1).join(' ')}
                <span className="font-display italic text-primary/90 ml-1.5">.</span>
              </span>
            </motion.h1>

            {/* Title strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              className="mb-10"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base md:text-lg text-muted-foreground">
                <span className="text-foreground/90">{personalInfo.title}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span className="text-primary/90 font-medium">{personalInfo.tagline}</span>
              </div>
            </motion.div>

            {/* Long description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-12"
            >
              Building systems, securing infrastructure, and exploring where technology meets impact.
              When I'm not debugging infrastructure or writing about the latest AWS outage, you'll find me
              diving deep into hands-on labs and turning complex problems into elegant solutions.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="flex flex-col sm:flex-row sm:items-center gap-5 mb-12"
            >
              <Button variant="hero" size="lg" asChild className="group">
                <a href="#projects">
                  See what I built
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
            </motion.div>

            {/* Socials — inline minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="flex items-center gap-6"
            >
              {[
                { icon: Github, label: 'GitHub', url: 'https://github.com/vidyutraj' },
                { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/vidyut-rajagopal' },
                { icon: BookOpen, label: 'Medium', url: personalInfo.social.medium },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="tracking-wide">{item.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Portrait column — floating frame with magnetic cursor tracking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div
              ref={portraitRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              {/* Depth rings */}
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative w-[280px] h-[360px] md:w-[340px] md:h-[440px] lg:w-[380px] lg:h-[500px]"
              >
                {/* Glow halo */}
                <div className="absolute inset-0 bg-primary/20 blur-[80px] scale-90" />

                {/* Frame */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/60 bg-card/40 backdrop-blur-sm telemetry-sweep">
                  <img
                    src={`${import.meta.env.BASE_URL}logos/Portrait_Vidyut.jpg`}
                    alt="Vidyut Rajagopal"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 25%' }}
                  />
                  {/* Gradient overlay — deepens corners, adds cinematic feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 mix-blend-overlay" />
                  {/* Top highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                  {/* Bottom telemetry overlay — coordinates & identifier */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 font-mono text-[9px] tracking-[0.22em] uppercase text-foreground/70 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="status-info" />
                      <span>Subject</span>
                    </span>
                    <span className="text-muted-foreground/80">VR · 33.78°N</span>
                  </div>
                </div>

                {/* Corner crosshairs — precision markers */}
                <span className="crosshair top-2 left-2" />
                <span className="crosshair top-2 right-2" />
                <span className="crosshair bottom-2 left-2" />
                <span className="crosshair bottom-2 right-2" />

                {/* Side tick rail — decorative systems chrome */}
                <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 flex-col gap-2 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className={`block h-px bg-border/60 ${i % 2 === 0 ? 'w-4' : 'w-2'}`}
                    />
                  ))}
                </div>

                {/* Floating coordinates badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
                  className="absolute -bottom-4 -right-4 bg-card/85 backdrop-blur-xl border border-border/70 rounded-xl px-3 py-2 shadow-xl font-mono"
                >
                  <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-0.5">
                    Node
                  </div>
                  <div className="text-[11px] text-foreground tracking-wider">
                    01 / ATL-GT
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

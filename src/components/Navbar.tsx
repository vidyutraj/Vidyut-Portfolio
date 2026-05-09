import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-10 left-0 right-0 z-50 px-4"
      >
        <div
          className={`mx-auto max-w-6xl transition-all duration-500 ease-out rounded-2xl ${
            isScrolled
              ? 'bg-background/60 backdrop-blur-2xl border border-border/60 shadow-2xl shadow-background/40'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            {/* Monogram */}
            <a href="#" className="flex items-center gap-2.5 group" aria-label="Home">
              <div className="relative w-8 h-8 rounded-lg border border-border/60 bg-card/40 flex items-center justify-center overflow-hidden">
                <span className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-500">
                  V
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="hidden sm:block font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                Vidyut
              </span>
            </a>

            {/* Desktop nav — magnetic hover with moving indicator */}
            <div
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  className="relative px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {hoveredLink === link.name && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-lg bg-foreground/[0.06] border border-border/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Button variant="hero-outline" size="sm" asChild>
                <a href="#contact">
                  <span className="relative z-10">Get in touch</span>
                </a>
              </Button>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-foreground/[0.06] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-card/80 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl shadow-background/60 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="px-4 py-3 text-foreground hover:bg-foreground/[0.05] rounded-lg transition-colors font-medium flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <span className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </motion.a>
                ))}
                <div className="pt-3 mt-2 border-t border-border/40">
                  <Button variant="hero" className="w-full" asChild>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Get in touch
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

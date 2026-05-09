import { AnimatedSection } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, BookOpen, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient backdrop — a soft pool of light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[600px] bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.12),transparent_60%)]" />
      </div>

      <div className="container relative px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="07"
            kicker="Connect"
            title="Let's Build Something"
            meta="Channel Open"
          />
        </AnimatedSection>

        <div className="mt-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-12 max-w-2xl"
          >
            Open to discussing opportunities, collaborations, or interesting
            security challenges.{' '}
            <span className="font-display italic text-foreground">
              Always happy to chat.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button variant="hero" size="lg" asChild className="group">
              <a href={`mailto:${personalInfo.social.email}`}>
                <Mail className="w-4 h-4" />
                Send an email
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              Or ask me anything via the chat in the bottom corner.
            </p>
          </motion.div>

          {/* Email display — big, typographic */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            href={`mailto:${personalInfo.social.email}`}
            className="group block"
          >
            <div className="eyebrow mb-3">Direct</div>
            <div className="text-3xl md:text-5xl font-display italic text-foreground/90 group-hover:text-primary transition-colors duration-500 tracking-tight flex items-center gap-3 flex-wrap">
              <span className="underline decoration-border/60 decoration-1 underline-offset-8 group-hover:decoration-primary/60 transition-colors duration-500">
                {personalInfo.social.email}
              </span>
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: personalInfo.social.github, icon: Github },
    { name: 'LinkedIn', url: personalInfo.social.linkedin, icon: Linkedin },
    { name: 'Medium', url: personalInfo.social.medium, icon: BookOpen },
  ];

  return (
    <footer className="relative border-t border-border/40 py-10 bg-background/60 backdrop-blur-sm">
      <div className="container px-6 md:px-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-lg border border-border/60 bg-card/40 flex items-center justify-center">
              <span className="font-display text-base text-foreground">V</span>
            </div>
            <div className="text-xs text-muted-foreground/80 font-mono tracking-wide">
              © {new Date().getFullYear()} {personalInfo.name}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

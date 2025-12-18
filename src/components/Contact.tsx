import { AnimatedSection } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, BookOpen, FileCode2, Terminal } from 'lucide-react';

const links = [
  {
    name: 'GitHub',
    description: 'Code & Projects',
    url: 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    description: 'Professional',
    url: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Medium',
    description: 'Writing',
    url: 'https://medium.com',
    icon: BookOpen,
  },
  {
    name: 'Resume Repo',
    description: 'CI/CD Source',
    url: 'https://github.com',
    icon: FileCode2,
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container px-6 md:px-8">
        <AnimatedSection>
          <SectionHeader 
            command="echo $CONTACT_INFO"
            title="Get in Touch"
            description="Open to opportunities, collaborations, and interesting security challenges."
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Links */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-lg bg-card border border-border card-hover group flex flex-col"
                >
                  <link.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-foreground">{link.name}</span>
                  <span className="text-sm text-muted-foreground">{link.description}</span>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Email CTA */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="h-full flex flex-col justify-center p-8 rounded-lg bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground">
                  Whether you're looking for a security-minded engineer, want to discuss 
                  a project, or just want to chat about the latest CVEs — I'm always happy to connect.
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <a href="mailto:your.email@example.com">
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
            <Terminal className="w-4 h-4 text-primary" />
            <span>Built with React + Tailwind</span>
            <span className="text-primary">•</span>
            <span>Deployed on GitHub Pages</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} [Your Name]. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { FileText, Download, GitBranch, RefreshCw } from 'lucide-react';

export const Resume = () => {
  return (
    <section id="resume" className="relative py-24 md:py-32">
      <div className="container px-6 md:px-8">
        <AnimatedSection>
          <SectionHeader 
            command="./build-resume.sh"
            title="Resume"
            description="Auto-generated from source via CI/CD pipeline. Always up-to-date."
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Resume preview card */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="relative p-8 rounded-lg bg-card border border-border overflow-hidden group">
              {/* Decorative terminal header */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary flex items-center gap-2 px-4">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-terminal-amber" />
                <div className="w-3 h-3 rounded-full bg-terminal-green" />
                <span className="ml-4 text-xs font-mono text-muted-foreground">resume.pdf</span>
              </div>

              {/* Mock resume content */}
              <div className="mt-8 space-y-6">
                <div>
                  <div className="h-8 bg-foreground/10 rounded w-48 mb-2" />
                  <div className="h-3 bg-foreground/5 rounded w-64" />
                </div>
                
                <div className="space-y-2">
                  <div className="h-4 bg-primary/20 rounded w-32" />
                  <div className="h-2 bg-foreground/5 rounded w-full" />
                  <div className="h-2 bg-foreground/5 rounded w-5/6" />
                  <div className="h-2 bg-foreground/5 rounded w-4/5" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-primary/20 rounded w-28" />
                  <div className="h-2 bg-foreground/5 rounded w-full" />
                  <div className="h-2 bg-foreground/5 rounded w-3/4" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-primary/20 rounded w-24" />
                  <div className="flex gap-2 flex-wrap">
                    <div className="h-6 bg-foreground/10 rounded w-16" />
                    <div className="h-6 bg-foreground/10 rounded w-20" />
                    <div className="h-6 bg-foreground/10 rounded w-14" />
                    <div className="h-6 bg-foreground/10 rounded w-18" />
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 mt-8 bg-gradient-to-t from-card via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="hero" size="lg">
                  <FileText className="w-5 h-5" />
                  View Full Resume
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* CI/CD info */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">CI/CD Powered</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  This resume is automatically generated from Markdown source using GitHub Actions. 
                  Every push to the resume repo triggers a build that produces a fresh PDF.
                </p>
                <div className="font-mono text-xs text-muted-foreground bg-secondary/50 p-3 rounded">
                  <div className="flex items-center gap-2 text-terminal-green">
                    <RefreshCw className="w-3 h-3" />
                    <span>Last build: 2 hours ago</span>
                  </div>
                  <div className="mt-1 text-foreground/60">
                    commit: feat: add cloud certifications section
                  </div>
                </div>
              </div>

              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <Button variant="hero" className="w-full" size="lg" asChild>
                    <a href="/resume/latest.pdf" download>
                      <Download className="w-5 h-5" />
                      Download PDF
                    </a>
                  </Button>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <GitBranch className="w-5 h-5" />
                      Source Repo
                    </a>
                  </Button>
                </StaggerItem>
              </StaggerContainer>

              {/* Pipeline steps */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <div className="text-xs font-mono text-muted-foreground mb-3">Pipeline Steps</div>
                <div className="space-y-2">
                  {[
                    { step: 'Parse Markdown', status: 'done' },
                    { step: 'Apply Template', status: 'done' },
                    { step: 'Generate PDF', status: 'done' },
                    { step: 'Deploy to /resume', status: 'done' },
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-terminal-green/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-terminal-green" />
                      </div>
                      <span className="text-sm text-foreground/80">{item.step}</span>
                      <span className="ml-auto text-xs text-terminal-green font-mono">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

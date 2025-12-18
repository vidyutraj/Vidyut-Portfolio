import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
}

const articles: Article[] = [
  {
    title: 'Building a Zero-Trust Network from Scratch',
    description: 'A practical guide to implementing BeyondCorp-style security in a home lab environment.',
    date: '2024-01-15',
    readTime: '12 min',
    url: '#',
    tags: ['Zero Trust', 'Networking', 'Security'],
  },
  {
    title: 'Detection Engineering: Beyond Simple Rules',
    description: 'How to write detection logic that catches real threats while minimizing false positives.',
    date: '2024-01-08',
    readTime: '8 min',
    url: '#',
    tags: ['Detection', 'SIEM', 'Threat Hunting'],
  },
  {
    title: 'Terraform Patterns for Secure AWS Deployments',
    description: 'Reusable infrastructure patterns with security controls baked in from day one.',
    date: '2023-12-22',
    readTime: '10 min',
    url: '#',
    tags: ['Terraform', 'AWS', 'IaC'],
  },
  {
    title: 'Lessons from Running a SOC Simulation',
    description: 'What I learned building and operating a simulated Security Operations Center.',
    date: '2023-12-10',
    readTime: '6 min',
    url: '#',
    tags: ['SOC', 'Learning', 'Career'],
  },
];

export const Writing = () => {
  return (
    <section id="writing" className="relative py-24 md:py-32 bg-card/30">
      <div className="container px-6 md:px-8">
        <AnimatedSection>
          <SectionHeader 
            command="tail -n 4 ./blog/posts.log"
            title="Writing"
            description="Thoughts on security, systems, and building things that work."
          />
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mt-12" staggerDelay={0.1}>
          {articles.map((article) => (
            <StaggerItem key={article.title}>
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-6 rounded-lg bg-card border border-border card-hover group"
              >
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <a 
            href="https://medium.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Read more on Medium
            <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

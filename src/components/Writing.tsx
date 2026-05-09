import { AnimatedSection } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { BookOpen, Calendar, ArrowUpRight } from 'lucide-react';
import { articles } from '@/data/writing';
import { personalInfo } from '@/data/personal';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const Writing = () => {
  // Sort most recent first
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [lead, ...rest] = sorted;

  return (
    <section id="writing" className="relative py-32 md:py-40">
      <div className="container px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="06"
            kicker="Essays"
            title="Writing"
            meta={`${articles.length} essays`}
            description="Breaking down complex tech topics into digestible pieces."
          />
        </AnimatedSection>

        {lead && (
          <div className="mt-16">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-6">
                <div className="telemetry-strip">
                  <span className="status-info pulse-dot" />
                  <span>Latest Dispatch</span>
                </div>
                <span className="mono-meta">{formatDate(lead.date)}</span>
              </div>
            </AnimatedSection>

            {/* Featured lead essay */}
            <AnimatedSection delay={0.05}>
              <a
                href={lead.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group rounded-2xl surface-interactive overflow-hidden"
              >
                <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 p-8 md:p-10 items-end">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-5 mono-meta">
                      <span className="text-primary/90">§ 01</span>
                      <span className="text-muted-foreground/60">·</span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        {lead.readTime}
                      </span>
                      <span className="text-muted-foreground/60">·</span>
                      <span>Featured</span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5 group-hover:text-primary transition-colors duration-500">
                      {lead.title}
                    </h3>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
                      {lead.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {lead.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read CTA */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-end gap-4 md:gap-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70 uppercase tracking-wider group-hover:text-primary transition-colors">
                      <span>Read</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <span className="crosshair top-3 left-3 opacity-60" />
                <span className="crosshair top-3 right-3 opacity-60" />
              </a>
            </AnimatedSection>
          </div>
        )}

        {/* Archive — compact list */}
        {rest.length > 0 && (
          <div className="mt-20">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-6">
                <div className="telemetry-strip">
                  <span className="status-ok" />
                  <span>Archive</span>
                </div>
                <span className="mono-meta">{String(rest.length).padStart(2, '0')} earlier</span>
              </div>
            </AnimatedSection>

            <div className="border border-border/60 rounded-xl bg-card/20 backdrop-blur-sm overflow-hidden">
              {rest.map((article, i) => (
                <ArchiveRow key={article.title} article={article} index={i} />
              ))}
            </div>
          </div>
        )}

        <AnimatedSection delay={0.3} className="mt-16 text-center">
          <a
            href={personalInfo.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs tracking-wider uppercase group"
          >
            Read more on Medium
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

const ArchiveRow = ({
  article,
  index,
}: {
  article: typeof articles[0];
  index: number;
}) => {
  const id = String(index + 2).padStart(3, '0');

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      className="group/row block border-t border-border/50 first:border-t-0 hover:bg-foreground/[0.02] transition-colors duration-300"
    >
      <div className="flex items-center gap-4 px-4 md:px-6 py-5">
        {/* ID */}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 w-10 shrink-0 tabular-nums">
          {id}
        </span>

        {/* Title + meta */}
        <div className="flex-grow min-w-0">
          <h4 className="text-sm md:text-base font-medium text-foreground truncate tracking-tight group-hover/row:text-primary transition-colors duration-300">
            {article.title}
          </h4>
          <div className="flex items-center gap-3 mt-1 mono-meta">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Tags — desktop */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="chip !text-[10px] !py-0.5 !px-2">
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover/row:text-primary group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all shrink-0" />
      </div>
    </motion.a>
  );
};

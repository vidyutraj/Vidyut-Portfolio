import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader, TechBadge } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import {
  Github,
  ExternalLink,
  ChevronDown,
  Trophy,
  Video,
  FileText,
  ArrowUpRight,
  Minus,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { personalInfo } from '@/data/personal';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Titles promoted to the featured band. Ordered by priority. */
const FEATURED_TITLES = [
  'AI Cyber Threat Intelligence Dashboard',
  'UPS Airlines OptiFlight',
  'SimpliEarn',
];

type Project = typeof projects[0];

/* ───────────────────────── Featured Card ───────────────────────── */

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => {
  const id = `FT-${String(index + 1).padStart(2, '0')}`;

  return (
    <StaggerItem>
      <article className="group relative h-full rounded-2xl surface-interactive overflow-hidden flex flex-col">
        {/* Top telemetry strip */}
        <div className="flex items-center justify-between px-6 md:px-7 py-3 border-b border-border/50 bg-card/40">
          <div className="flex items-center gap-3">
            <span className="status-info pulse-dot" />
            <span className="mono-meta">{id}</span>
            <span className="mono-meta text-muted-foreground/50">/</span>
            <span className="mono-meta">Featured</span>
          </div>
          <span className="mono-meta text-primary/90">{project.category}</span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-6 md:p-7">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Signal strip — Problem → Outcome */}
          <div className="relative mb-6 pl-4 border-l border-border/60 space-y-3">
            <div>
              <div className="mono-meta mb-1">Problem</div>
              <p className="text-xs text-muted-foreground/90 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <div className="mono-meta mb-1 text-accent/90">Outcome</div>
              <p className="text-xs text-foreground/85 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Key achievement pulled up if present */}
          {project.achievements && project.achievements.length > 0 && (
            <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-primary/[0.04] border border-primary/15">
              <Trophy className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/85 leading-relaxed">{project.achievements[0]}</p>
            </div>
          )}

          {/* Tech — top 6 shown, rest indicated */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 6).map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
            {project.techStack.length > 6 && (
              <span className="chip !text-[10px] text-muted-foreground/70">
                +{project.techStack.length - 6}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 pt-5 border-t border-border/50 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
                title="GitHub"
                aria-label={`${project.title} GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
                title="Live Demo"
                aria-label={`${project.title} Demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
                title="Video"
                aria-label={`${project.title} Video`}
              >
                <Video className="w-4 h-4" />
              </a>
            )}
            {project.slidesUrl && (
              <a
                href={project.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all"
                title="Slides"
                aria-label={`${project.title} Slides`}
              >
                <FileText className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Corner crosshairs */}
        <span className="crosshair top-2 left-2 opacity-60" />
        <span className="crosshair top-2 right-2 opacity-60" />
      </article>
    </StaggerItem>
  );
};

/* ───────────────────────── Registry Row ───────────────────────── */

const RegistryRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = String(index + 1).padStart(3, '0');

  const hasDossier =
    project.achievements || project.additionalDetails || project.slidesUrl || project.videoUrl;

  return (
    <div className="border-t border-border/50 first:border-t-0">
      {/* Row — click to expand */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full group/row relative flex items-center gap-4 px-4 md:px-6 py-4 text-left transition-colors duration-300 hover:bg-foreground/[0.02] ${
          isOpen ? 'bg-foreground/[0.02]' : ''
        }`}
        aria-expanded={isOpen}
      >
        {/* ID */}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 w-10 shrink-0 tabular-nums">
          {id}
        </span>

        {/* Title + category */}
        <div className="flex-grow min-w-0 flex items-center gap-3">
          <div className="min-w-0 flex-shrink">
            <h4 className="text-sm md:text-base font-medium text-foreground truncate tracking-tight group-hover/row:text-primary transition-colors duration-300">
              {project.title}
            </h4>
          </div>
          <span className="hidden md:inline mono-meta text-muted-foreground/60 shrink-0">
            · {project.category}
          </span>
        </div>

        {/* Tech preview — desktop only */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 max-w-[280px] overflow-hidden">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="chip !text-[10px] !py-0.5 !px-2">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="mono-meta text-muted-foreground/50">+{project.techStack.length - 3}</span>
          )}
        </div>

        {/* Link glyphs */}
        <div className="flex items-center gap-1 text-muted-foreground/60 shrink-0">
          {project.githubUrl && <Github className="w-3.5 h-3.5" />}
          {project.demoUrl && <ExternalLink className="w-3.5 h-3.5" />}
          {project.videoUrl && <Video className="w-3.5 h-3.5" />}
          {project.slidesUrl && <FileText className="w-3.5 h-3.5" />}
        </div>

        {/* Expand chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-muted-foreground/50 group-hover/row:text-foreground transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      {/* Dossier — inline expansion */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-8 pt-2">
              <div className="grid md:grid-cols-[2fr_1fr] gap-8 pl-14">
                {/* Left — narrative */}
                <div className="space-y-5">
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3 pl-4 border-l border-border/60">
                    <div>
                      <div className="mono-meta mb-1">Problem</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <div className="mono-meta mb-1 text-primary/90">Approach</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.approach}</p>
                    </div>
                    <div>
                      <div className="mono-meta mb-1 text-accent/90">Outcome</div>
                      <p className="text-xs text-foreground/85 leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>

                  {project.achievements && project.achievements.length > 0 && (
                    <div>
                      <div className="mono-meta mb-3 flex items-center gap-2">
                        <Trophy className="w-3 h-3" />
                        <span>Achievements</span>
                      </div>
                      <ul className="space-y-1.5">
                        {project.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                          >
                            <Minus className="w-3 h-3 text-primary/70 mt-[5px] flex-shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.additionalDetails && (
                    <div>
                      <div className="mono-meta mb-2">Details</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {project.additionalDetails}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right — meta panel */}
                <div className="space-y-5">
                  {/* Stack */}
                  <div>
                    <div className="mono-meta mb-3">Stack · {project.techStack.length}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <TechBadge key={tech}>{tech}</TechBadge>
                      ))}
                    </div>
                  </div>

                  {/* Links panel */}
                  <div>
                    <div className="mono-meta mb-3">Links</div>
                    <div className="space-y-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-md border border-border/50 hover:border-primary/30 bg-card/40 transition-all group/link"
                        >
                          <span className="flex items-center gap-2">
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-md border border-border/50 hover:border-primary/30 bg-card/40 transition-all group/link"
                        >
                          <span className="flex items-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live demo</span>
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                        </a>
                      )}
                      {project.videoUrl && (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-md border border-border/50 hover:border-primary/30 bg-card/40 transition-all group/link"
                        >
                          <span className="flex items-center gap-2">
                            <Video className="w-3.5 h-3.5" />
                            <span>Video walkthrough</span>
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                        </a>
                      )}
                      {project.slidesUrl && (
                        <a
                          href={project.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-md border border-border/50 hover:border-primary/30 bg-card/40 transition-all group/link"
                        >
                          <span className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Slides</span>
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                        </a>
                      )}
                      {!hasDossier && !project.githubUrl && !project.demoUrl && (
                        <div className="mono-meta text-muted-foreground/50">No external links</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ───────────────────────── Section ───────────────────────── */

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Split featured vs registry
  const { featured, rest } = useMemo(() => {
    const featuredSet = new Set(FEATURED_TITLES);
    const featuredProjects = FEATURED_TITLES
      .map((title) => projects.find((p) => p.title === title))
      .filter((p): p is Project => Boolean(p));
    const restProjects = projects.filter((p) => !featuredSet.has(p.title));
    return { featured: featuredProjects, rest: restProjects };
  }, []);

  const categories = ['All', ...Array.from(new Set(rest.map((p) => p.category)))];
  const filteredRest =
    activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 md:py-40">
      <div className="container px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="03"
            kicker="Selected Work"
            title="Projects"
            meta={`${projects.length} records`}
            description="A mix of security labs, cloud infrastructure, automation tools, and fullstack apps I've built—from hackathon winners to hands-on AWS experiments. Each one taught me something new (and sometimes broke in interesting ways)."
          />
        </AnimatedSection>

        {/* ─── Featured band ─── */}
        {featured.length > 0 && (
          <div className="mt-16">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-6">
                <div className="telemetry-strip">
                  <span className="status-info" />
                  <span>Priority Feed</span>
                  <span className="text-muted-foreground/50">Selected</span>
                </div>
                <span className="mono-meta">
                  {String(featured.length).padStart(2, '0')} ACTIVE
                </span>
              </div>
            </AnimatedSection>

            <StaggerContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
              staggerDelay={0.08}
            >
              {featured.map((project, i) => (
                <FeaturedCard key={project.title} project={project} index={i} />
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* ─── Registry ─── */}
        <div className="mt-20">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="telemetry-strip">
                <span className="status-ok" />
                <span>Full Registry</span>
                <span className="text-muted-foreground/50">Archive</span>
              </div>
              <span className="mono-meta">
                {String(filteredRest.length).padStart(2, '0')} /{' '}
                {String(rest.length).padStart(2, '0')}
              </span>
            </div>
          </AnimatedSection>

          {/* Filter pills */}
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3.5 py-1.5 text-[11px] font-mono tracking-wide uppercase rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.span
                      layoutId="registry-pill"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Table header */}
          <AnimatedSection delay={0.1}>
            <div className="hidden md:flex items-center gap-4 px-4 md:px-6 py-3 border border-border/60 rounded-t-xl bg-card/40 backdrop-blur-sm">
              <span className="mono-meta w-10 shrink-0">ID</span>
              <span className="mono-meta flex-grow">Project</span>
              <span className="mono-meta hidden lg:block w-[280px] shrink-0">Stack</span>
              <span className="mono-meta w-auto shrink-0">Links</span>
              <span className="mono-meta w-4 shrink-0"></span>
            </div>

            {/* Table body */}
            <div className="border border-border/60 border-t-0 md:border-t-0 rounded-b-xl md:rounded-b-xl rounded-t-xl md:rounded-t-none bg-card/20 backdrop-blur-sm overflow-hidden">
              {filteredRest.length === 0 ? (
                <div className="px-6 py-12 text-center mono-meta text-muted-foreground/60">
                  No records match the current filter.
                </div>
              ) : (
                filteredRest.map((project, i) => (
                  <RegistryRow
                    key={`${project.title}-${i}`}
                    project={project}
                    index={i}
                  />
                ))
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-16 text-center">
          <Button variant="hero-outline" size="lg" asChild className="group">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              See more on GitHub
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

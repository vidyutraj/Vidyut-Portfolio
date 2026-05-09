import { AnimatedSection } from '@/components/AnimatedSection';
import { SectionHeader, TechBadge } from '@/components/SectionHeader';
import { MapPin, Calendar, Building2, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { experiences, CompanyExperience, Role } from '@/data/experience';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + '-01');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} — ${end}`;
};

const getEmploymentTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'Full-time': 'text-primary border-primary/30 bg-primary/5',
    'Part-time': 'text-accent border-accent/30 bg-accent/5',
    'Internship': 'text-terminal-amber border-terminal-amber/30 bg-terminal-amber/5',
    'Co-op': 'text-terminal-green border-terminal-green/30 bg-terminal-green/5',
    'Contract': 'text-muted-foreground border-border bg-secondary/50',
    'Self-employed': 'text-primary border-primary/30 bg-primary/5',
  };
  return colors[type] || colors['Contract'];
};

const getCompanyDateRange = (company: CompanyExperience): { start: string; end: string | null } => {
  if (company.startDate) {
    return {
      start: company.startDate,
      end: company.endDate ?? null,
    };
  }
  const dates = company.roles.map((role) => ({
    start: new Date(role.startDate + '-01'),
    end: role.endDate ? new Date(role.endDate + '-01') : new Date(),
  }));
  const earliestStart = new Date(Math.min(...dates.map((d) => d.start.getTime())));
  const hasCurrent = company.roles.some((role) => role.endDate === null);
  const latestEnd = hasCurrent
    ? null
    : new Date(Math.max(...dates.map((d) => d.end.getTime())));
  return {
    start: `${earliestStart.getFullYear()}-${String(earliestStart.getMonth() + 1).padStart(2, '0')}`,
    end: latestEnd
      ? `${latestEnd.getFullYear()}-${String(latestEnd.getMonth() + 1).padStart(2, '0')}`
      : null,
  };
};

const sortedExperiences = [...experiences].sort((a, b) => {
  const aRange = getCompanyDateRange(a);
  const bRange = getCompanyDateRange(b);
  const aStart = new Date(aRange.start + '-01').getTime();
  const bStart = new Date(bRange.start + '-01').getTime();
  return bStart - aStart;
});

export const Experience = () => {
  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
        <div className="absolute inset-0 hex-pattern opacity-30 mask-fade-y" />
      </div>

      <div className="container relative px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="02"
            kicker="Career"
            title="Experience"
            meta={`${experiences.length} entries`}
            description="Where I've worked, what I've built, and the problems I've solved. From internships to research — here's the journey so far."
          />
        </AnimatedSection>

        <div className="mt-20 relative">
          {/* Timeline rail — hairline with fade */}
          <div className="absolute left-[11px] md:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-border/20 via-border to-border/20" />

          <div className="space-y-16">
            {sortedExperiences.map((company, companyIndex) => (
              <TimelineEntry
                key={company.company}
                company={company}
                index={companyIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({
  company,
  index,
}: {
  company: CompanyExperience;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const dateRange = getCompanyDateRange(company);
  const isCurrent = dateRange.end === null;

  return (
    <AnimatedSection delay={index * 0.08}>
      <div className="relative pl-10 md:pl-16">
        {/* Timeline node */}
        <div className="absolute left-0 md:left-2 top-3">
          <div
            className={`relative w-5 h-5 rounded-full border-2 ${
              isCurrent
                ? 'border-primary bg-background'
                : 'border-border bg-card'
            } transition-all duration-500`}
          >
            {isCurrent && (
              <span className="absolute inset-0.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </div>

        {/* Company header — clickable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left group"
          aria-expanded={isExpanded}
        >
          <div className="flex items-start justify-between gap-4 py-2">
            <div className="flex items-center gap-4 flex-grow min-w-0">
              {/* Logo */}
              {company.logo ? (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white dark:bg-card/80 p-2 flex items-center justify-center border border-border/70 overflow-hidden flex-shrink-0 transition-all duration-500 group-hover:border-primary/40 group-hover:scale-105">
                  <img
                    src={
                      company.logo.startsWith('http')
                        ? company.logo
                        : `${import.meta.env.BASE_URL}${
                            company.logo.startsWith('/')
                              ? company.logo.slice(1)
                              : company.logo
                          }`
                    }
                    alt={company.logoAlt || `${company.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-card border border-border/70 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 tracking-tight"
                    >
                      <span>{company.company}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </a>
                  ) : (
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500 tracking-tight">
                      {company.company}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                  <span className="font-mono text-xs tracking-wide">
                    {formatDateRange(dateRange.start, dateRange.end)}
                  </span>
                  {company.totalDuration && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-xs">{company.totalDuration}</span>
                    </>
                  )}
                  {isCurrent && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-xs text-primary font-medium tracking-wide uppercase">
                        Current
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors mt-1.5"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>

        {/* Roles */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-8">
                {company.roles.map((role, roleIndex) => (
                  <RoleDetails
                    key={`${role.position}-${role.startDate}`}
                    role={role}
                    roleIndex={roleIndex}
                    totalRoles={company.roles.length}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

const RoleDetails = ({
  role,
  roleIndex,
}: {
  role: Role;
  roleIndex: number;
  totalRoles: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreDetails = role.fullDetails.length > role.defaultBullets.length;
  const hasAnyBullets = role.defaultBullets.length > 0 || role.fullDetails.length > 0;

  return (
    <div
      className={`relative pl-5 border-l border-border/60 ${
        roleIndex > 0 ? 'pt-8' : ''
      }`}
    >
      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-card border-2 border-border" />

      {/* Role header */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
            {role.position}
          </h4>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border tracking-wider uppercase ${getEmploymentTypeColor(
              role.employmentType
            )}`}
          >
            {role.employmentType}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span className="font-mono">{formatDateRange(role.startDate, role.endDate)}</span>
          </div>
          {role.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>{role.location}</span>
                {role.workType && (
                  <>
                    <span className="text-muted-foreground/50">·</span>
                    <span>{role.workType}</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bullets */}
      {hasAnyBullets && (
        <div className="space-y-3">
          {role.defaultBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="text-primary/60 mt-2 flex-shrink-0">
                <span className="block w-1 h-1 rounded-full bg-current" />
              </span>
              <span>{bullet}</span>
            </div>
          ))}

          <AnimatePresence initial={false}>
            {hasMoreDetails && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-3">
                  {role.fullDetails
                    .slice(role.defaultBullets.length)
                    .map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary/60 mt-2 flex-shrink-0">
                          <span className="block w-1 h-1 rounded-full bg-current" />
                        </span>
                        <span>{detail}</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {hasMoreDetails && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-300 mt-4"
        >
          <span className="tracking-wide">{isExpanded ? 'Show less' : 'View details'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      )}

      {role.technologies && role.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-5 mt-5 border-t border-border/40">
          {role.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
      )}
    </div>
  );
};

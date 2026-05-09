import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { leadership } from '@/data/leadership';

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + '-01');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDateRange = (startDate: string, endDate: string | null): string => {
  if (!endDate) return `${formatDate(startDate)} — Present`;
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
};

export const Leadership = () => {
  const sortedLeadership = [...leadership].sort((a, b) => {
    const aStart = new Date(a.startDate + '-01').getTime();
    const bStart = new Date(b.startDate + '-01').getTime();
    return bStart - aStart;
  });

  return (
    <section id="leadership" className="relative py-32 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      </div>

      <div className="container relative px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="05"
            kicker="Roles"
            title="Leadership"
            meta={`${leadership.length} roles`}
            description="Leading teams, organizing initiatives, and making things happen. From consulting to student orgs — here's where I've stepped up."
          />
        </AnimatedSection>

        {sortedLeadership.length === 0 ? (
          <AnimatedSection delay={0.1}>
            <p className="text-muted-foreground text-center py-16">
              No leadership positions yet.
            </p>
          </AnimatedSection>
        ) : (
          <StaggerContainer className="space-y-5 mt-20" staggerDelay={0.08}>
            {sortedLeadership.map((lead, index) => (
              <StaggerItem key={`${lead.organization}-${lead.position}-${index}`}>
                <div className="surface-interactive p-7 md:p-10 rounded-2xl group">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {lead.logo && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white dark:bg-card/60 border border-border/60 p-2 flex items-center justify-center">
                        <img
                          src={
                            lead.logo.startsWith('http')
                              ? lead.logo
                              : `${import.meta.env.BASE_URL}${
                                  lead.logo.startsWith('/') ? lead.logo.slice(1) : lead.logo
                                }`
                          }
                          alt={lead.logoAlt || `${lead.organization} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="flex-grow min-w-0">
                      <div className="mb-4">
                        {lead.website ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors group/link tracking-tight"
                          >
                            <span>{lead.organization}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                            {lead.organization}
                          </h3>
                        )}
                        <p className="text-base font-medium text-primary/90 mt-1">
                          {lead.position}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span className="font-mono">
                            {formatDateRange(lead.startDate, lead.endDate)}
                          </span>
                        </div>
                        {lead.location && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              <span>{lead.location}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {lead.description && lead.description.length > 0 && (
                        <div className="space-y-2.5 mb-5">
                          {lead.description.map((desc, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="text-primary/60 mt-2 flex-shrink-0">
                                <span className="block w-1 h-1 rounded-full bg-current" />
                              </span>
                              <span>{desc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {lead.achievements && lead.achievements.length > 0 && (
                        <div className="pt-4 border-t border-border/40">
                          <div className="eyebrow mb-3">Key Achievements</div>
                          <div className="flex flex-wrap gap-1.5">
                            {lead.achievements.map((achievement, idx) => (
                              <span key={idx} className="chip text-primary">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
};

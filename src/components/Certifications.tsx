import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader } from '@/components/SectionHeader';
import { Calendar, Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/certifications';

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + '-01');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDateRange = (issueDate: string, expirationDate: string | null | undefined): string => {
  if (!expirationDate) return `Issued ${formatDate(issueDate)} · No expiration`;
  return `Issued ${formatDate(issueDate)} · Expires ${formatDate(expirationDate)}`;
};

export const Certifications = () => {
  const sortedCertifications = [...certifications].sort((a, b) => {
    const aDate = new Date(a.issueDate + '-01').getTime();
    const bDate = new Date(b.issueDate + '-01').getTime();
    return bDate - aDate;
  });

  return (
    <section id="certifications" className="relative py-32 md:py-40">
      <div className="container px-6 md:px-10 max-w-7xl">
        <AnimatedSection>
          <SectionHeader
            index="04"
            kicker="Credentials"
            title="Certifications"
            meta={`${certifications.length} verified`}
            description="The pieces of paper that prove I can actually do what I say I can do. Continuously learning and adding to the collection."
          />
        </AnimatedSection>

        {sortedCertifications.length === 0 ? (
          <AnimatedSection delay={0.1}>
            <p className="text-muted-foreground text-center py-16">No certifications yet.</p>
          </AnimatedSection>
        ) : (
          <StaggerContainer
            className="grid md:grid-cols-2 gap-5 mt-20"
            staggerDelay={0.08}
          >
            {sortedCertifications.map((cert, index) => (
              <StaggerItem key={`${cert.name}-${cert.issuer}-${index}`}>
                <div className="surface-interactive p-7 md:p-8 rounded-2xl group h-full flex flex-col">
                  <div className="flex items-start gap-5 mb-5">
                    {cert.logo && (
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white dark:bg-card/60 border border-border/60 p-2 flex items-center justify-center">
                        <img
                          src={
                            cert.logo.startsWith('http')
                              ? cert.logo
                              : `${import.meta.env.BASE_URL}${
                                  cert.logo.startsWith('/') ? cert.logo.slice(1) : cert.logo
                                }`
                          }
                          alt={cert.logoAlt || `${cert.issuer} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight tracking-tight group-hover:text-primary transition-colors duration-500">
                            {cert.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Award className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span className="font-mono">
                      {formatDateRange(cert.issueDate, cert.expirationDate)}
                    </span>
                  </div>

                  {(cert.credentialId || cert.credentialUrl) && (
                    <div className="mt-auto pt-4 border-t border-border/50">
                      {cert.credentialId && (
                        <p className="text-[10px] text-muted-foreground/70 mb-2 font-mono tracking-wide">
                          ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          Verify credential
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
};

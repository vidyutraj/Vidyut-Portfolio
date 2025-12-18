import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader, TechBadge } from '@/components/SectionHeader';
import { Shield, Cloud, Terminal, Database, Eye, Zap } from 'lucide-react';

const focusAreas = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'SOC operations, threat detection, security governance, and infrastructure hardening.',
    skills: ['SIEM/SOAR', 'Threat Hunting', 'Incident Response', 'Compliance'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Designing and automating scalable cloud infrastructure with security built-in.',
    skills: ['AWS', 'Terraform', 'CI/CD', 'Kubernetes'],
  },
  {
    icon: Eye,
    title: 'Observability',
    description: 'Building systems that are transparent, traceable, and easy to debug at scale.',
    skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing'],
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Eliminating toil through scripting, pipelines, and infrastructure as code.',
    skills: ['Python', 'Bash', 'Ansible', 'GitHub Actions'],
  },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container px-6 md:px-8">
        <AnimatedSection>
          <SectionHeader 
            command="cat about.md"
            title="About Me"
            description="Computer Engineering student at Georgia Tech with a focus on building secure, automated, and resilient systems."
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Bio section */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-4 font-mono text-sm text-muted-foreground">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>background.log</span>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a builder at heart — fascinated by how complex systems fail and how to make them resilient. 
                    My work spans from writing detection rules in Splunk to architecting multi-region AWS deployments.
                  </p>
                  <p>
                    Currently diving deep into{' '}
                    <span className="text-foreground">zero-trust architecture</span>,{' '}
                    <span className="text-foreground">detection engineering</span>, and{' '}
                    <span className="text-foreground">cloud security posture management</span>.
                  </p>
                  <p>
                    When I'm not in a terminal, I'm probably reading threat intelligence reports, 
                    contributing to open-source security tools, or experimenting with new automation workflows.
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Projects', value: '15+' },
                  { label: 'Certs', value: '4' },
                  { label: 'Languages', value: '6+' },
                ].map((stat) => (
                  <div 
                    key={stat.label}
                    className="p-4 rounded-lg bg-secondary/50 border border-border text-center"
                  >
                    <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Focus areas */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
            {focusAreas.map((area) => (
              <StaggerItem key={area.title}>
                <div className="h-full p-5 rounded-lg bg-card border border-border card-hover group">
                  <area.icon className="w-8 h-8 text-primary mb-4 group-hover:text-glow transition-all" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <TechBadge key={skill}>{skill}</TechBadge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

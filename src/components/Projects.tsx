import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SectionHeader, TechBadge } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  outcome: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Cloud SIEM Pipeline',
    category: 'Cybersecurity Labs',
    description: 'End-to-end security monitoring solution with automated threat detection and incident response.',
    problem: 'Needed centralized visibility across multi-cloud environments with minimal alert fatigue.',
    approach: 'Built a Splunk-based SIEM with custom detection rules, integrated with AWS CloudTrail and VPC Flow Logs.',
    outcome: 'Reduced mean-time-to-detect by 60% and automated 80% of initial triage workflows.',
    techStack: ['Splunk', 'AWS', 'Python', 'Lambda', 'Terraform'],
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'Zero-Trust Network Lab',
    category: 'Cybersecurity Labs',
    description: 'Micro-segmented network architecture with identity-aware access controls.',
    problem: 'Traditional perimeter security fails against lateral movement attacks.',
    approach: 'Implemented BeyondCorp-style access with mutual TLS, continuous verification, and least-privilege policies.',
    outcome: 'Demonstrated 100% containment of simulated insider threats in isolated segments.',
    techStack: ['Istio', 'Kubernetes', 'Vault', 'OPA', 'Envoy'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Infrastructure as Code Framework',
    category: 'Cloud & DevOps',
    description: 'Modular Terraform framework for rapid, secure AWS deployments.',
    problem: 'Ad-hoc infrastructure provisioning led to drift and security misconfigurations.',
    approach: 'Created reusable modules with embedded security controls, automated compliance checks, and GitOps workflows.',
    outcome: 'Cut deployment time by 75% while achieving 100% CIS benchmark compliance.',
    techStack: ['Terraform', 'AWS', 'GitHub Actions', 'Checkov', 'Sentinel'],
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'Automated Vulnerability Scanner',
    category: 'Automation & Tooling',
    description: 'CI/CD-integrated security scanner with custom rule engine.',
    problem: 'Manual security reviews couldn\'t keep pace with rapid deployment cycles.',
    approach: 'Built a Python-based scanner integrating SAST, DAST, and dependency analysis into the pipeline.',
    outcome: 'Caught 40+ critical vulnerabilities pre-production in first quarter.',
    techStack: ['Python', 'Docker', 'Semgrep', 'Trivy', 'GitHub Actions'],
    githubUrl: '#',
  },
  {
    title: 'Threat Intelligence Aggregator',
    category: 'Research / Experiments',
    description: 'Automated threat feed correlation and enrichment platform.',
    problem: 'Threat intel from multiple sources was siloed and difficult to operationalize.',
    approach: 'Developed an aggregation layer using MISP, with automated IOC enrichment and STIX/TAXII feeds.',
    outcome: 'Enabled proactive blocking of 200+ malicious IPs before any incident occurred.',
    techStack: ['MISP', 'Python', 'ElasticSearch', 'STIX/TAXII', 'Redis'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'ML-Based Anomaly Detection',
    category: 'Research / Experiments',
    description: 'Machine learning model for detecting anomalous network behavior.',
    problem: 'Rule-based detection missed novel attack patterns and generated false positives.',
    approach: 'Trained an isolation forest model on network flow data with feature engineering for behavioral patterns.',
    outcome: 'Achieved 95% precision in identifying APT-style lateral movement in lab environment.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Zeek', 'Kafka'],
    githubUrl: '#',
  },
];

const categories = ['All', 'Cybersecurity Labs', 'Cloud & DevOps', 'Automation & Tooling', 'Research / Experiments'];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-card/30">
      <div className="container px-6 md:px-8">
        <AnimatedSection>
          <SectionHeader 
            command="ls -la ./projects"
            title="Projects"
            description="A collection of security labs, cloud infrastructure, and automation tools I've built."
          />
        </AnimatedSection>

        {/* Category filter hint */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <div className={`h-full flex flex-col p-6 rounded-lg bg-card border border-border card-hover group ${
                project.featured ? 'ring-1 ring-primary/30' : ''
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="w-6 h-6 text-primary" />
                    {project.featured && (
                      <span className="px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Category */}
                <span className="text-xs font-mono text-accent mb-2">{project.category}</span>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Problem → Outcome (collapsed by default, shown on hover/focus) */}
                <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <div>
                    <span className="text-terminal-green font-mono">Problem:</span>{' '}
                    <span className="line-clamp-2">{project.problem}</span>
                  </div>
                  <div>
                    <span className="text-terminal-amber font-mono">Outcome:</span>{' '}
                    <span className="line-clamp-2">{project.outcome}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all link */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View All on GitHub
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

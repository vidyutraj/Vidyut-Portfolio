import { Shield, Cloud, Eye, Zap, LucideIcon } from 'lucide-react';

export interface FocusArea {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
}

export const focusAreas: FocusArea[] = [
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

export interface Role {
  position: string;
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Co-op' | 'Self-employed';
  startDate: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  endDate: string | null; // null for current position, Format: "YYYY-MM" or "YYYY-MM-DD"
  location: string;
  workType?: 'On-site' | 'Remote' | 'Hybrid';
  defaultBullets: string[]; // 2 concise bullets shown by default
  fullDetails: string[]; // Full technical detail bullets (shown when expanded)
  technologies?: string[];
  achievements?: string[];
}

export interface CompanyExperience {
  company: string;
  logo?: string; // Path to logo image in public folder, e.g., "/logos/ups.png"
  logoAlt?: string; // Alt text for logo
  website?: string; // Company website URL
  roles: Role[];
  totalDuration?: string; // e.g., "7 mos" - calculated if not provided
  startDate?: string; // Optional manual start date for company-level display (Format: "YYYY-MM")
  endDate?: string | null; // Optional manual end date for company-level display (Format: "YYYY-MM" or null)
}

export const experiences: CompanyExperience[] = [
  {
    company: 'Georgia Tech',
    logo: '/logos/GT.png',
    logoAlt: 'Georgia Tech Logo',
    totalDuration: '5 mos',
    startDate: '2026-02',
    endDate: null,
    roles: [
      {
        position: 'Security Operations Analyst',
        employmentType: 'Full-time',
        startDate: '2026-02',
        endDate: null,
        location: '',
        defaultBullets: [
          'Security Operations Analyst focused on incident detection, investigation, and response within a production security environment.',
        ],
        fullDetails: [
          'Security Operations Analyst focused on incident detection, investigation, and response within a production security environment.',
        ],
        technologies: [],
      },
      {
        position: 'Research Assistant — Cyberterrorism & Security Policy',
        employmentType: 'Full-time',
        startDate: '2026-02',
        endDate: null,
        location: '',
        defaultBullets: [
          'Research Assistant working with Professor Ryan Shandler, studying how exposure to cyberterrorism-related scenarios influences public attitudes toward surveillance and security policies, using experimental and behavioral research methods.'
        ],
        fullDetails: [
          'Research Assistant working with Professor Ryan Shandler, studying how exposure to cyberterrorism-related scenarios influences public attitudes toward surveillance and security policies, using experimental and behavioral research methods.',
        ],
        technologies: [],
      },
      {
        position: 'Embedded System Security Researcher',
        employmentType: 'Full-time',
        startDate: '2026-02',
        endDate: null,
        location: '',
        defaultBullets: [
          'Examining and assessing cybersecurity in IoT hardware devices through multi-domain investigation using hardware and firmware reverse engineering, RF analysis, and static/dynamic testing.',
          'Focusing on automated testing, tool development, wireless communication design, and zero-day discovery through instrumentation and analysis.',
        ],
        fullDetails: [
          'Examining and assessing cybersecurity in IoT hardware devices through multi-domain investigation using hardware and firmware reverse engineering, RF analysis, and static/dynamic testing.',
          'Focusing on automated testing, tool development, wireless communication design, and zero-day discovery through instrumentation and analysis.',
          'Implementing hardware reverse engineering, software/firmware reverse engineering, RF analysis, along with static and dynamic testing through instrumentation to identify and demonstrate security vulnerabilities in embedded systems.',
        ],
        technologies: [
          'Hardware Reverse Engineering',
          'Firmware Reverse Engineering',
          'Networking',
          'Software Defined Radios',
          'Static/Dynamic Analysis',
          'Instrumentation',
          'Microcontrollers',
          'Wireless Communications',
        ],
      },
    ],
  },
  {
    company: 'United Parcel Service (UPS)',
    logo: '/logos/ups.png',
    logoAlt: 'UPS Logo',
    totalDuration: '8 mos',
    startDate: '2025-07',
    endDate: '2026-01',
    roles: [
      {
        position: 'Enterprise Systems Engineer Co-Op',
        employmentType: 'Co-op',
        startDate: '2025-09',
        endDate: '2026-01',
        location: 'Remote',
        workType: 'Remote',
        defaultBullets: [
          'Used VMware vRealize Operations (vROps) to monitor infrastructure health, analyze performance and capacity, detect anomalies, and perform proactive root-cause analysis and VM right-sizing.',
          'Supported VMware vRealize Automation (vRA) to enable self-service VM provisioning and lifecycle management across private cloud (vSphere) environments.',
        ],
        fullDetails: [
          'Used VMware vRealize Operations (vROps) to monitor infrastructure health, analyze performance and capacity, detect anomalies, and perform proactive root-cause analysis and VM right-sizing.',
          'Supported VMware vRealize Automation (vRA) to enable self-service VM provisioning and lifecycle management across private cloud (vSphere) environments.',
          'Automated administrative workflows using PowerCLI and Microsoft Power Automate, reducing manual effort for admin-rights change requests.',
        ],
        technologies: ['VMware', 'ESXi', 'vCenter', 'vROps', 'vRA', 'PowerCLI', 'Power Automate'],
      },
      {
        position: 'Virtualization & Infrastructure Intern',
        employmentType: 'Internship',
        startDate: '2025-07',
        endDate: '2025-09',
        location: 'Mahwah, NJ',
        workType: 'On-site',
        defaultBullets: [
          'Hands-on administration of VMware ESXi and vCenter, including virtual machine provisioning, upgrades, and basic production troubleshooting.',
          'Built and upgraded physical servers, performing hardware installs (CPU, RAM, storage) and OS-level storage expansion and validation.',
        ],
        fullDetails: [
          'Hands-on administration of VMware ESXi and vCenter, including virtual machine provisioning, upgrades, and basic production troubleshooting.',
          'Built and upgraded physical servers, performing hardware installs (CPU, RAM, storage) and OS-level storage expansion and validation.',
          'Installed and configured enterprise applications including Microsoft Office and Citrix via internal deployment platforms (GSDP).',
          'Contributed to a production-ready solution that won 1st place in UPS Supply Chain & Transportation.',
        ],
        technologies: ['VMware', 'ESXi', 'vCenter', 'Citrix', 'GSDP'],
        achievements: [
          '1st place in UPS Supply Chain & Transportation with production-ready solution',
        ],
      },
    ],
  },
  {
    company: 'Waresport',
    logo: '/logos/waresport.png',
    logoAlt: 'Waresport Logo',
    website: 'https://waresport.com',
    totalDuration: '5 mos',
    startDate: '2025-08',
    endDate: null, // Present
    roles: [
      {
        position: 'Product Development & Sales',
        employmentType: 'Self-employed',
        startDate: '2025-08',
        endDate: null, // Present
        location: 'Atlanta, Georgia, United States',
        workType: 'Remote',
        defaultBullets: [
          'Leading strategic product development and sales initiatives for a sports management platform startup.',
        ],
        fullDetails: [
          'Leading strategic product development and sales initiatives for a sports management platform startup.',
        ],
        technologies: [],
      },
    ],
  },
];


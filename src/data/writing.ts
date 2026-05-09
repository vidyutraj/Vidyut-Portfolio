export interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    title: 'From Chips to Systems: Rethinking AI Export Controls for Long-Term National Security',
    description: 'A forward-looking perspective on how competitive advantage in AI is shifting from individual components like chips to fully integrated systems — arguing that success will depend on coordinating hardware, software, data, and organizational capabilities rather than breakthroughs in any single layer.',
    date: '2026-02-27',
    readTime: '8 min',
    url: 'https://georgetownai.substack.com/p/from-chips-to-systems-rethinking',
    tags: ['AI Policy', 'National Security', 'Export Controls', 'Geopolitics', 'AI Strategy'],
  },
  {
    title: 'AWS Outage Breaks Most of the Internet: My Thoughts',
    description: 'Breaking down the global AWS outage affecting 1000+ businesses, analyzing root causes related to DynamoDB DNS resolution, and discussing solutions like multi-region and multi-cloud architectures.',
    date: '2025-10-21',
    readTime: '6 min',
    url: 'https://medium.com/aws-in-plain-english/aws-outage-breaks-most-of-the-internet-my-thoughts-630975d88bea',
    tags: ['AWS', 'Cloud Infrastructure', 'Disaster Recovery', 'Multi-Cloud'],
  },
  {
    title: 'The Race for Microseconds: How Networks and Infrastructure Power High-Frequency Trading',
    description: 'Exploring the infrastructure behind HFT firms, covering latency optimization techniques including co-location, TCP/UDP protocols, hardware optimizations, and future trends like on-chip communication and quantum networking.',
    date: '2025-09-02',
    readTime: '10 min',
    url: 'https://medium.com/studentsxstudents/the-race-for-microseconds-how-networks-and-infrastructure-power-high-frequency-trading-f0d39bdf3b87',
    tags: ['HFT', 'Trading', 'Networking', 'Infrastructure', 'Latency'],
  },
  {
    title: 'Congestion Pricing in NYC: Individual Inconvenience for the Greater Good',
    description: 'Analyzing NYC\'s congestion pricing implementation, its economic principles using elasticity theory, impact on traffic reduction, and the tradeoffs between individual costs and societal benefits.',
    date: '2025-01-08',
    readTime: '4 min',
    url: 'https://medium.com/studentsxstudents/congestion-pricing-in-nyc-individual-inconvenience-for-the-greater-good-1d226fdcd7a4',
    tags: ['Urban Planning', 'Economics', 'Public Policy', 'Transportation', 'NYC'],
  },
  {
    title: 'American SSN Data Hack: USDoD Group Compromises 2.9 Billion Records',
    description: 'Breaking down the massive SSN data breach, debunking exaggerated headlines about 2.9 billion compromised records, and providing practical cybersecurity recommendations including VPN usage, MFA, and dark web monitoring.',
    date: '2024-08-16',
    readTime: '8 min',
    url: 'https://medium.com/studentsxstudents/american-ssn-data-hack-usdod-group-compromises-2-9-billion-records-ae57637b0422',
    tags: ['Cybersecurity', 'Data Breach', 'Privacy', 'Infrastructure', 'Hacking'],
  },
];


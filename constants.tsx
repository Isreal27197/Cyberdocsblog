
import { BlogPost, ResearchProject, SiteStats, ProfileData } from './types';

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Advanced Packet Inspection Techniques with Wireshark',
    excerpt: 'A deep dive into decrypting SSL/TLS traffic and identifying suspicious anomalies in enterprise networks.',
    content: '# Advanced Packet Inspection\n\n## Abstract\nThis research covers methods for inspecting encrypted traffic. Inspecting high-volume traffic requires specialized hardware or highly optimized software taps.\n\n## Technical Implementation\nUsing custom Lua scripts for Wireshark...\n\n### SSL Decryption\nTo decrypt traffic, one must capture the pre-master secret from the environment variable `SSLKEYLOGFILE`. Once captured, Wireshark can re-calculate the symmetric keys used for the session.\n\n## Findings\nDetected encrypted lateral movement in 4/5 test cases.',
    category: 'Network Security',
    date: 'March 15, 2024',
    readTime: '12 min',
    author: 'Admin',
    imageUrl: 'https://picsum.photos/seed/netsec/800/450'
  },
  {
    id: '2',
    title: 'The Rise of Smart Contract Vulnerabilities in DeFi',
    excerpt: 'Analyzing recent exploits in Web3 protocols and how to implement robust audit patterns for Solidity.',
    content: '# Web3 Auditing\n\n## Reentrancy Attacks\nOne of the most common vulnerabilities in EVM-based smart contracts is the reentrancy attack. This occurs when an external call is made before state changes are committed.\n\n### Prevention\nAlways use the Checks-Effects-Interactions pattern.',
    category: 'Web3 Security',
    date: 'March 10, 2024',
    readTime: '15 min',
    author: 'Admin',
    imageUrl: 'https://picsum.photos/seed/web3sec/800/450'
  },
  {
    id: '3',
    title: 'Automating OSINT for Threat Intelligence',
    excerpt: 'Building custom Python scripts to scrape and aggregate threat data from various public repositories.',
    content: '# OSINT Automation\n\n## Tools Used\n- Python\n- Scrapy\n- Shodan API',
    category: 'Security Research',
    date: 'March 05, 2024',
    readTime: '8 min',
    author: 'Admin',
    imageUrl: 'https://picsum.photos/seed/osint/800/450'
  }
];

export const MOCK_PROJECTS: ResearchProject[] = [
  {
    id: 'p1',
    title: 'VulneraScan API',
    description: 'A custom vulnerability scanner focusing on REST API endpoints and misconfigured CORS policies.',
    content: '# VulneraScan API Report\n\n## Lab Setup\nTargeting local OWASP Juice Shop instance.\n\n## Findings\nDetected 3 High-risk CORS misconfigurations.',
    status: 'In Progress',
    tags: ['Python', 'Automation', 'API Security'],
    githubUrl: 'https://github.com/yourusername/vulnerascan',
    topology: {
      nodes: [
        { id: 'att', label: 'Attacker Node', type: 'attacker', ip: '10.0.0.5', x: 100, y: 150 },
        { id: 'fw', label: 'Edge Firewall', type: 'firewall', ip: '10.0.0.1', x: 300, y: 150 },
        { id: 'srv', label: 'API Server', type: 'server', ip: '192.168.1.10', x: 500, y: 100 },
        { id: 'db', label: 'Core DB', type: 'database', ip: '192.168.1.50', x: 500, y: 200 }
      ],
      links: [
        { from: 'att', to: 'fw' },
        { from: 'fw', to: 'srv' },
        { from: 'srv', to: 'db' }
      ]
    }
  },
  {
    id: 'p2',
    title: 'Active Directory Lab Environment',
    description: 'A documented walkthrough of setting up a vulnerable AD environment for red teaming practice.',
    content: '# Active Directory Lab\n\n## Infrastructure\n- DC: Windows Server 2022\n- Clients: Windows 10 x2',
    status: 'Completed',
    tags: ['Windows Server', 'Virtualization', 'Active Directory'],
    reportUrl: '#'
  }
];

export const SITE_STATS: SiteStats = {
  articles: 3,
  projects: 2,
  contributions: 5
};

export const PROFILE_DATA: ProfileData = {
  name: "Cyber Researcher",
  tagline: "Documenting the unknown, one packet at a time.",
  bio: "Security enthusiast focusing on offensive research and defensive automation. Currently deep-diving into Web3 smart contract security and building automated detection pipelines for cloud-native infrastructure.",
  contributions: [
    "Contributed a Lua-based dissector for a proprietary industrial protocol to the Wireshark project.",
    "Submitted 2 critical CVE patches for a popular open-source Go-based web framework.",
    "Maintainer of 'AutoHardener' - a collection of Ansible playbooks for server CIS benchmarking.",
    "Regular contributor to CTF write-ups and educational resources for the local InfoSec community.",
    "Integrated a custom threat feed provider into the MISP platform via a Python extension."
  ],
  skills: [
    { name: "Network Security", level: 90, category: "Infrastructure" },
    { name: "Web3/Solidity", level: 75, category: "Research" },
    { name: "Security Analysis", level: 85, category: "Forensics" },
    { name: "Detection Engineering", level: 80, category: "Defense" },
    { name: "Python Automation", level: 95, category: "Development" },
    { name: "Cloud Security", level: 70, category: "Infrastructure" }
  ],
  certifications: [
    "CompTIA Security+",
    "OSCP (Offensive Security Certified Professional)",
    "eJPT (eLearnSecurity Junior Penetration Tester)",
    "AWS Certified Security - Specialty"
  ],
  socialLinks: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your.email@example.com"
  }
};

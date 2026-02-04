
export type Category = 
  | 'General Security' 
  | 'Network Security'
  | 'Web3 Security'
  | 'Security Research';

export interface TopologyNode {
  id: string;
  label: string;
  type: 'server' | 'client' | 'database' | 'firewall' | 'cloud' | 'attacker';
  ip?: string;
  x: number;
  y: number;
}

export interface TopologyLink {
  from: string;
  to: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  content: string;
  status: 'Completed' | 'In Progress' | 'Archived';
  tags: string[];
  githubUrl?: string;
  reportUrl?: string;
  topology?: {
    nodes: TopologyNode[];
    links: TopologyLink[];
  };
}

export interface SiteStats {
  articles: number;
  projects: number;
  contributions: number;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  contributions: string[];
  skills: Skill[];
  certifications: string[];
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

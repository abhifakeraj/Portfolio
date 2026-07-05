/**
 * ============================================================================
 * TYPES — single source of truth for every JSON data file in /src/data.
 * If you add a new field to a JSON file, add it here too so the whole
 * app stays type-safe. Nothing in /src/components should ever hardcode
 * a shape that isn't declared here.
 * ============================================================================
 */

export interface SocialLink {
  label: string;
  url: string;
  icon: string; // lucide-react icon name, see src/lib/icon-map.tsx
}

export interface ProfileStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Profile {
  name: string;
  role: string;
  taglineWords: string[]; // rotated by the hero typing animation
  location: string;
  email: string;
  phone?: string;
  availability: 'Open to opportunities' | 'Open to internships' | 'Not available' | string;
  summary: string;
  mission: string;
  values: string[];
  strengths: string[];
  differentiators: string[];
  resumeUrl: string;
  photoUrl: string;
  stats: ProfileStat[];
  socials: SocialLink[];
}

export type SkillCategory =
  | 'Governance'
  | 'Risk'
  | 'Compliance'
  | 'Audit'
  | 'ISO Standards'
  | 'NIST'
  | 'Privacy'
  | 'Cloud Security'
  | 'Networking'
  | 'Linux'
  | 'Python'
  | 'Documentation'
  | 'Risk Assessment'
  | 'Business Continuity'
  | 'Security Awareness';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100, used for the dashboard rings/bars
  description: string;
  tools?: string[];
  relatedProjectSlugs?: string[];
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  type: 'Internship' | 'Training' | 'Volunteer' | 'Freelance' | 'Leadership' | string;
  location: string;
  startDate: string; // ISO "YYYY-MM"
  endDate: string | 'Present';
  summary: string;
  responsibilities: string[];
  achievements: string[];
  tags: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | 'Present';
  cgpa?: string;
  location: string;
  coursework: string[];
  achievements: string[];
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Planned';
export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectCategory =
  | 'GRC'
  | 'Risk Assessment'
  | 'Cloud Security'
  | 'Networking'
  | 'Security Awareness'
  | 'Compliance'
  | 'Privacy'
  | 'Python / Automation'
  | string;

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo' | 'file' | 'external';
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  screenshots: string[];
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  featured: boolean;
  startDate: string;
  endDate: string | 'Present';
  problemStatement: string;
  businessImpact: string;
  objectives: string[];
  architecture: string;
  methodology: string[];
  riskAnalysis: string;
  lessonsLearned: string;
  futureImprovements: string;
  links: ProjectLink[];
}

export type CertificateCategory =
  | 'Vendor'
  | 'Technical'
  | 'Compliance'
  | 'Cloud'
  | 'Governance';

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: CertificateCategory;
  status: 'Completed' | 'In Progress';
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;

  logoUrl: string;      // NEW
  imageUrl: string;     // Full certificate image

  pdfUrl?: string;

  description: string;
  skillsLearned: string[];
}

export interface NavItem {
  label: string;
  href: string;
  comingSoon?: boolean;
}

export interface SiteConfig {
  siteName: string;
  shortName: string;
  description: string;
  url: string;
  themeColor: { light: string; dark: string };
  nav: NavItem[];
  futureSections: string[]; // roadmap placeholders shown in footer / nav
}

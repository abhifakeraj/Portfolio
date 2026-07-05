import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  FileText,
  MapPin,
  ExternalLink,
  Link as LinkIcon,
  Shield,
  ShieldCheck,
  Cloud,
  Server,
  Lock,
  Network,
  Terminal,
  BookOpen,
  ClipboardList,
  Award,
  type LucideIcon,
} from 'lucide-react';

/**
 * Add a new entry here any time you reference a new icon `name`
 * from a JSON data file (e.g. profile.socials[].icon).
 */
export const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  globe: Globe,
  file: FileText,
  location: MapPin,
  external: ExternalLink,
  link: LinkIcon,
  shield: Shield,
  'shield-check': ShieldCheck,
  cloud: Cloud,
  server: Server,
  lock: Lock,
  network: Network,
  terminal: Terminal,
  book: BookOpen,
  clipboard: ClipboardList,
  award: Award,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Globe;
}

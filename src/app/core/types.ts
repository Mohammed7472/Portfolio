export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  highlights: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ProjectModalState {
  isOpen: boolean;
  selectedProject: Project | null;
}

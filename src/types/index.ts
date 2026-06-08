export interface LocalizedString {
  en: string;
  id: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalData {
  name: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  bio: LocalizedString;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  cvUrl: string;
  avatar: string;
  skills: {
    en: Skill[];
    id: Skill[];
  };
}

export interface ExperienceItem {
  id: number;
  company: string;
  logo: string;
  role: LocalizedString;
  type: LocalizedString;
  duration: {
    start: string;
    end: string | null;
    current: boolean;
  };
  location: string;
  responsibilities: {
    en: string[];
    id: string[];
  };
  technologies: string[];
}

export interface EducationItem {
  id: number;
  institution: string;
  institutionShort: string;
  logo: string;
  degree: LocalizedString;
  duration: {
    start: string;
    end: string;
  };
  gpa: string | null;
  location: string;
  description: LocalizedString;
  achievements: {
    en: string[];
    id: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  shortDesc: LocalizedString;
  description: LocalizedString;
  category: string[];
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  features: {
    en: string[];
    id: string[];
  };
  githubUrl: string;
  demoUrl: string;
  status: 'completed' | 'in-progress' | 'archived';
  year: number;
  featured: boolean;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'id';

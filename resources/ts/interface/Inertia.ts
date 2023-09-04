export interface AuthUser {
  id: number;
  name: string;
  profile_photo: string;
  email: string;
  admin: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Hero {
  id: number;
  name: string;
  tagline: string;
  tagline_bold: string;
  description: string;
  image: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  image: string;
  url: string;
  description: string;
}

export interface Skill {
  id: number;
  title: string;
  icon: string;
}

interface ResumeActivitiy {
  id?: number;
  description: string;
}

export interface Education {
  id: number;
  title: string;
  start_year: number;
  end_year: number;
  institution: string;
  activities: ResumeActivitiy[];
}

export interface Experience {
  id: number;
  title: string;
  start_year: number;
  end_year: number;
  company: string;
  activities: ResumeActivitiy[];
}

export interface Contact {
  id: number;
  phone_number: string;
  email: string;
}

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
}

export interface InertiaProps {
  status: string;
  canResetPassword: boolean;
  auth: {
    user: AuthUser | null;
  };
  message: Message;
  hero: Hero;
  blogs: Blog[];
  blog: Blog;
  projects: Project[];
  project: Project;
  skills: Skill[];
  skill: Skill;
  educations: Education[];
  education: Education;
  experiences: Experience[];
  experience: Experience;
  contact: Contact;
  social_media_list: SocialMedia[];
  social_media: SocialMedia;
}

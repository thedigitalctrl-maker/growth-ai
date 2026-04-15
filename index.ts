export type ToneType = 'humorous' | 'funny' | 'debate' | 'professional' | 'general-short';

export interface CommentSuggestion {
  id: string;
  text: string;
  tone: ToneType;
  isBestMatch: boolean;
}

export interface ProfileAnalysis {
  name: string;
  headline: string;
  intent: ProfileIntent;
  confidence: number;
  insights: string[];
  recommendations: ConnectionRecommendation[];
}

export type ProfileIntent = 'Job Seeker' | 'Funding Seeker' | 'Sales Prospecting' | 'Networking';

export interface ConnectionRecommendation {
  id: string;
  name: string;
  headline: string;
  profileUrl: string;
  reason: string;
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}
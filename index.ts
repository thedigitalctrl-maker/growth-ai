export type ToneType = 'humorous' | 'funny' | 'debate' | 'professional' | 'general-short';

export interface CommentSuggestion {
  id: string;
  text: string;
  tone: ToneType;
  isBestMatch: boolean;
}

export interface BoldVariant {
  id: string;
  label: string;
  text: string;
}

export interface VoiceProfile {
  tonality: string;
  commonWords: string[];
  fillers: string[];
  sentenceLength: 'short' | 'medium' | 'long';
  emojiUsage: 'none' | 'occasional' | 'frequent';
  punctuationStyle: string;
  signaturePhrases: string[];
}

export interface TrainingStep {
  id: number;
  title: string;
  description: string;
  placeholder: string;
}

export type ProfileIntent = 
  | 'Job Seeker' 
  | 'Funding Seeker' 
  | 'Sales Prospecting' 
  | 'Networking';

export interface ProfileAnalysis {
  name: string;
  headline: string;
  intent: ProfileIntent;
  confidence: number;
  insights: string[];
  recommendations: ConnectionRecommendation[];
}

export interface ConnectionRecommendation {
  id: string;
  name: string;
  headline: string;
  profileUrl: string;
  reason: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
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

export interface ATSScoreResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}
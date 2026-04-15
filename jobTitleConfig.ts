import { JobTitle } from '../types';

interface JobTitleConfiguration {
  sections: string[];
  suggestedSkills: string[];
}

export const jobTitleConfig: Record<JobTitle, JobTitleConfiguration> = {
  "Software Engineer": {
    sections: ["summary", "experience", "projects", "technicalSkills", "education", "certifications"],
    suggestedSkills: ["JavaScript", "React", "Python", "AWS", "Docker"]
  },
  "Sales Manager": {
    sections: ["summary", "experience", "salesKPIs", "leadership", "education", "achievements"],
    suggestedSkills: ["CRM", "Negotiation", "Pipeline Management", "Forecasting"]
  },
  "Product Manager": {
    sections: ["summary", "experience", "productLaunches", "technicalSkills", "education", "stakeholderManagement"],
    suggestedSkills: ["Roadmapping", "Agile", "User Research", "Analytics"]
  },
  "Data Scientist": {
    sections: ["summary", "experience", "projects", "technicalSkills", "publications", "education"],
    suggestedSkills: ["Python", "SQL", "Machine Learning", "Statistics", "TensorFlow"]
  },
  "Marketing Director": {
    sections: ["summary", "experience", "campaigns", "brandStrategy", "education", "awards"],
    suggestedSkills: ["SEO/SEM", "Content Strategy", "Analytics", "Team Leadership"]
  },
  "Executive / C‑Suite": {
    sections: ["summary", "executiveExperience", "boardMemberships", "strategicInitiatives", "education", "publicSpeaking"],
    suggestedSkills: ["Strategic Planning", "M&A", "Investor Relations", "P&L Management"]
  }
};
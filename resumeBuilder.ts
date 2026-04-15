import type { ResumeTemplate, ResumeData, ATSScoreResult } from "../types";

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary layout' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional format' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and focused design' },
  { id: 'executive', name: 'Executive', description: 'Senior-level professional style' },
  { id: 'creative', name: 'Creative', description: 'Unique layout for creative roles' },
  { id: 'technical', name: 'Technical', description: 'Optimized for engineering roles' }
];

const COMMON_SKILLS = [
  'javascript', 'python', 'react', 'node.js', 'sql', 'aws', 'docker',
  'kubernetes', 'machine learning', 'data analysis', 'project management',
  'agile', 'scrum', 'leadership', 'communication', 'problem solving'
];

export function calculateATSScore(resumeText: string, jobDescription: string): ATSScoreResult {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();
  
  // Extract keywords from job description
  const jobWords = jobLower.split(/\s+/).filter(word => word.length > 3);
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  // Check for common skills
  COMMON_SKILLS.forEach(skill => {
    if (jobLower.includes(skill)) {
      if (resumeLower.includes(skill)) {
        matchedKeywords.push(skill);
      } else {
        missingKeywords.push(skill);
      }
    }
  });
  
  // Calculate score
  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  const score = totalKeywords > 0 
    ? Math.round((matchedKeywords.length / totalKeywords) * 100)
    : 50;
  
  const suggestions: string[] = [];
  
  if (missingKeywords.length > 0) {
    suggestions.push(`Consider adding these keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }
  
  if (score < 70) {
    suggestions.push('Your resume could benefit from more relevant keywords from the job description');
  }
  
  if (resumeText.length < 500) {
    suggestions.push('Consider adding more detail to your experience sections');
  }
  
  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestions
  };
}

export function exportResumeAsPDF(resumeData: ResumeData, template: string): void {
  // In production, this would use a PDF library
  // For now, we'll create a printable version
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${resumeData.fullName} - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #0A66C2; margin-bottom: 4px; }
        h2 { color: #2C3E50; border-bottom: 2px solid #0A66C2; padding-bottom: 8px; margin-top: 24px; }
        .contact { color: #64748B; margin-bottom: 16px; }
        .section { margin-bottom: 20px; }
        .experience-item { margin-bottom: 16px; }
        .experience-title { font-weight: bold; color: #2C3E50; }
        .experience-company { color: #0A66C2; }
        .experience-date { color: #64748B; font-size: 14px; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { background: #E8F4FD; padding: 4px 12px; border-radius: 4px; color: #0A66C2; }
      </style>
    </head>
    <body>
      <h1>${resumeData.fullName}</h1>
      <div class="contact">
        ${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
      </div>
      <div class="section">
        <h2>Summary</h2>
        <p>${resumeData.summary}</p>
      </div>
      <div class="section">
        <h2>Experience</h2>
        ${resumeData.experience.map(exp => `
          <div class="experience-item">
            <div class="experience-title">${exp.title}</div>
            <div class="experience-company">${exp.company}</div>
            <div class="experience-date">${exp.startDate} - ${exp.endDate}</div>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
      <div class="section">
        <h2>Education</h2>
        ${resumeData.education.map(edu => `
          <div>
            <strong>${edu.degree}</strong> - ${edu.school} (${edu.year})
          </div>
        `).join('')}
      </div>
      <div class="section">
        <h2>Skills</h2>
        <div class="skills">
          ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
      </div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}
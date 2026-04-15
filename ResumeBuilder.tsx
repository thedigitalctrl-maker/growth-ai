import React, { useState } from 'react';
import { Plus, Trash2, Download, FileText, Eye, Edit3 } from 'lucide-react';
import { ResumeData, ExperienceItem, EducationItem, ResumeTemplate } from '../types';

const RESUME_TEMPLATES: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary layout', preview: 'bg-slate-100' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional format', preview: 'bg-blue-50' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and focused design', preview: 'bg-gray-50' },
  { id: 'executive', name: 'Executive', description: 'Senior-level professional style', preview: 'bg-emerald-50' },
];

const JOB_TITLES = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'Project Manager',
  'Business Analyst',
  'DevOps Engineer',
  'Full Stack Developer'
];

const DEFAULT_RESUME: ResumeData = {
  fullName: '',
  jobTitle: 'Software Engineer',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: []
};

const ResumeBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddExperience = () => {
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };

  const handleRemoveExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const handleExperienceChange = (id: string, field: keyof ExperienceItem, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const handleAddEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: ''
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };

  const handleRemoveEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const handleEducationChange = (id: string, field: keyof EducationItem, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setResumeData({ ...resumeData, skills });
  };

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.fullName || 'Resume'} - Resume</title>
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
        <h1>${resumeData.fullName || 'Your Name'}</h1>
        <div class="contact">
          ${resumeData.email} ${resumeData.phone ? `| ${resumeData.phone}` : ''} ${resumeData.location ? `| ${resumeData.location}` : ''}
        </div>
        ${resumeData.summary ? `<div class="section"><p>${resumeData.summary}</p></div>` : ''}
        ${resumeData.experience.length > 0 ? `
          <div class="section">
            <h2>Experience</h2>
            ${resumeData.experience.map(exp => `
              <div class="experience-item">
                <div class="experience-title">${exp.title || 'Position'}</div>
                <div class="experience-company">${exp.company || 'Company'}</div>
                <div class="experience-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${resumeData.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
              <div>
                <strong>${edu.degree || 'Degree'}</strong> - ${edu.school || 'School'} (${edu.year || 'Year'})
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${resumeData.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <div class="skills">
              ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: '#2C3E50' }}>
          Resume Builder
        </h2>
        <p className="text-sm mt-2" style={{ color: '#64748B' }}>
          Create professional resumes with live preview
        </p>
      </div>

      {/* Template Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold" style={{ color: '#2C3E50' }}>
          Select Template
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RESUME_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className="p-4 rounded-lg border text-left transition-all"
              style={{
                backgroundColor: selectedTemplate === template.id ? '#E8F4FD' : '#FFFFFF',
                borderColor: selectedTemplate === template.id ? '#0A66C2' : '#E2E8F0'
              }}
            >
              <div 
                className="w-full h-20 rounded mb-2"
                style={{ backgroundColor: '#F1F5F9' }}
              />
              <p className="font-medium text-sm" style={{ color: '#2C3E50' }}>
                {template.name}
              </p>
              <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Job Title Selector */}
      <div className="space-y-2">
        <label htmlFor="job-title" className="block text-sm font-semibold" style={{ color: '#2C3E50' }}>
          Target Job Title
        </label>
        <select
          id="job-title"
          value={resumeData.jobTitle}
          onChange={(e) => setResumeData({ ...resumeData, jobTitle: e.target.value })}
          className="input"
        >
          {JOB_TITLES.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {/* Personal Information */}
      <div className="card">
        <h3 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm" style={{ color: '#64748B' }}>Full Name</label>
            <input
              id="fullName"
              type="text"
              value={resumeData.fullName}
              onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
              placeholder="John Doe"
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm" style={{ color: '#64748B' }}>Email</label>
            <input
              id="email"
              type="email"
              value={resumeData.email}
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
              placeholder="john@example.com"
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm" style={{ color: '#64748B' }}>Phone</label>
            <input
              id="phone"
              type="tel"
              value={resumeData.phone}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm" style={{ color: '#64748B' }}>Location</label>
            <input
              id="location"
              type="text"
              value={resumeData.location}
              onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
              placeholder="San Francisco, CA"
              className="input"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label htmlFor="summary" className="block text-sm" style={{ color: '#64748B' }}>Professional Summary</label>
          <textarea
            id="summary"
            value={resumeData.summary}
            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            placeholder="Brief summary of your professional background..."
            className="textarea"
            style={{ minHeight: '80px' }}
          />
        </div>
      </div>

      {/* Experience */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Experience</h3>
          <button onClick={handleAddExperience} className="btn btn-outline">
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>

        {resumeData.experience.length === 0 && (
          <p className="text-sm text-center py-4" style={{ color: '#94A3B8' }}>
            No experience entries yet. Click Add Experience to start.
          </p>
        )}

        {resumeData.experience.map((exp, idx) => (
          <div key={exp.id} className="p-4 rounded-lg border mb-4" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                Position {idx + 1}
              </span>
              <button
                onClick={() => handleRemoveExperience(exp.id)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={exp.title}
                onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                placeholder="Job Title"
                className="input"
              />
              <input
                value={exp.company}
                onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="input"
              />
              <input
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                placeholder="Start Date (e.g., Jan 2020)"
                className="input"
              />
              <input
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                placeholder="End Date (or Present)"
                className="input"
              />
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className="textarea mt-3"
              style={{ minHeight: '60px' }}
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Education</h3>
          <button onClick={handleAddEducation} className="btn btn-outline">
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>

        {resumeData.education.length === 0 && (
          <p className="text-sm text-center py-4" style={{ color: '#94A3B8' }}>
            No education entries yet. Click Add Education to start.
          </p>
        )}

        {resumeData.education.map((edu, idx) => (
          <div key={edu.id} className="p-4 rounded-lg border mb-4" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                Education {idx + 1}
              </span>
              <button
                onClick={() => handleRemoveEducation(edu.id)}
                className="p-1 rounded hover:bg-slate-100"
              >
                <Trash2 className="w-4 h-4" style={{ color: '#DC2626' }} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                value={edu.degree}
                onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                placeholder="Degree (e.g., B.S. Computer Science)"
                className="input"
              />
              <input
                value={edu.school}
                onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                placeholder="School Name"
                className="input"
              />
              <input
                value={edu.year}
                onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                placeholder="Year (e.g., 2020)"
                className="input"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="card">
        <h3 className="font-semibold mb-3" style={{ color: '#2C3E50' }}>Skills</h3>
        <div className="space-y-2">
          <label htmlFor="skills" className="block text-sm" style={{ color: '#64748B' }}>
            Enter skills separated by commas
          </label>
          <textarea
            id="skills"
            value={resumeData.skills.join(', ')}
            onChange={(e) => handleSkillsChange(e.target.value)}
            placeholder="JavaScript, React, Node.js, Python, SQL..."
            className="textarea"
            style={{ minHeight: '60px' }}
          />
        </div>
        {resumeData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {resumeData.skills.map((skill, idx) => (
              <span key={idx} className="badge badge-primary">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="btn btn-outline flex-1"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <button
          onClick={handleExport}
          disabled={!resumeData.fullName || !resumeData.email}
          className="btn btn-primary flex-1"
        >
          <Download className="w-4 h-4" />
          Export as PDF
        </button>
      </div>

      {/* Live Preview */}
      {showPreview && (
        <div className="card animate-fade-in" style={{ backgroundColor: '#F8FAFC' }}>
          <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Live Preview</h4>
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            <h2 className="text-xl font-bold" style={{ color: '#0A66C2' }}>
              {resumeData.fullName || 'Your Name'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>
              {resumeData.jobTitle}
            </p>
            <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
              {[resumeData.email, resumeData.phone, resumeData.location].filter(Boolean).join(' | ')}
            </p>
            
            {resumeData.summary && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                <p className="text-sm" style={{ color: '#475569' }}>{resumeData.summary}</p>
              </div>
            )}

            {resumeData.experience.length > 0 && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#2C3E50' }}>Experience</h3>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <p className="font-medium text-sm" style={{ color: '#2C3E50' }}>{exp.title}</p>
                    <p className="text-xs" style={{ color: '#0A66C2' }}>{exp.company}</p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{exp.startDate} - {exp.endDate || 'Present'}</p>
                  </div>
                ))}
              </div>
            )}

            {resumeData.education.length > 0 && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#2C3E50' }}>Education</h3>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-sm" style={{ color: '#2C3E50' }}>{edu.degree}</p>
                    <p className="text-xs" style={{ color: '#64748B' }}>{edu.school} - {edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {resumeData.skills.length > 0 && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#2C3E50' }}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, idx) => (
                    <span key={idx} className="badge badge-primary">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
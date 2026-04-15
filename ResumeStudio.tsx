import { useState } from "react";
import { Plus, Trash2, Upload, FileText, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { RESUME_TEMPLATES, calculateATSScore, exportResumeAsPDF } from "../utils/resumeBuilder";
import type { ResumeData, ExperienceItem, EducationItem, ATSScoreResult } from "../types";

const DEFAULT_RESUME: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: []
};

export function ResumeStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [atsResult, setAtsResult] = useState<ATSScoreResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleATSCheck = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing
    setTimeout(() => {
      const result = calculateATSScore(resumeText, jobDescription);
      setAtsResult(result);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleExport = () => {
    exportResumeAsPDF(resumeData, selectedTemplate);
  };

  return (
    <div className="space-y-8">
      {/* Template Selector */}
      <div className="space-y-3">
        <Label style={{ color: '#2C3E50' }}>Select Template</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {RESUME_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className="p-3 rounded-lg border text-left transition-all"
              style={{
                backgroundColor: selectedTemplate === template.id ? '#E8F4FD' : '#FFFFFF',
                borderColor: selectedTemplate === template.id ? '#0A66C2' : '#E2E8F0'
              }}
            >
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

      {/* Personal Information */}
      <Card className="border-slate-200">
        <CardContent className="pt-4 space-y-4">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Personal Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" style={{ color: '#64748B' }}>Full Name</Label>
              <Input
                id="fullName"
                value={resumeData.fullName}
                onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: '#64748B' }}>Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" style={{ color: '#64748B' }}>Phone</Label>
              <Input
                id="phone"
                value={resumeData.phone}
                onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" style={{ color: '#64748B' }}>Location</Label>
              <Input
                id="location"
                value={resumeData.location}
                onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" style={{ color: '#64748B' }}>Professional Summary</Label>
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              placeholder="Brief summary of your professional background..."
              className="min-h-20 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="border-slate-200">
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Experience</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddExperience}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Experience
            </Button>
          </div>

          {resumeData.experience.length === 0 && (
            <p className="text-sm text-center py-4" style={{ color: '#94A3B8' }}>
              No experience entries yet. Click Add Experience to start.
            </p>
          )}

          {resumeData.experience.map((exp, idx) => (
            <div key={exp.id} className="p-4 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Position {idx + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExperience(exp.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                  placeholder="Job Title"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
                <Input
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                  placeholder="Start Date (e.g., Jan 2020)"
                />
                <Input
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                  placeholder="End Date (or Present)"
                />
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-16 resize-none"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-slate-200">
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Education</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddEducation}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Education
            </Button>
          </div>

          {resumeData.education.length === 0 && (
            <p className="text-sm text-center py-4" style={{ color: '#94A3B8' }}>
              No education entries yet. Click Add Education to start.
            </p>
          )}

          {resumeData.education.map((edu, idx) => (
            <div key={edu.id} className="p-4 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Education {idx + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveEducation(edu.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                  placeholder="Degree (e.g., B.S. Computer Science)"
                />
                <Input
                  value={edu.school}
                  onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                  placeholder="School Name"
                />
                <Input
                  value={edu.year}
                  onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                  placeholder="Year (e.g., 2020)"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-slate-200">
        <CardContent className="pt-4 space-y-3">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Skills</h3>
          <div className="space-y-2">
            <Label htmlFor="skills" style={{ color: '#64748B' }}>
              Enter skills separated by commas
            </Label>
            <Textarea
              id="skills"
              value={resumeData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="JavaScript, React, Node.js, Python, SQL..."
              className="min-h-16 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={!resumeData.fullName || !resumeData.email}
        className="w-full font-semibold"
        style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
      >
        <Download className="w-4 h-4 mr-2" />
        Export as PDF
      </Button>

      {/* ATS Score Checker */}
      <Card className="border-slate-200">
        <CardContent className="pt-4 space-y-4">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>ATS Score Checker</h3>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Paste your resume text and a job description to check how well your resume matches.
          </p>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="resume-text" style={{ color: '#64748B' }}>Resume Text</Label>
              <Textarea
                id="resume-text"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="min-h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-desc" style={{ color: '#64748B' }}>Job Description</Label>
              <Textarea
                id="job-desc"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-24 resize-none"
              />
            </div>

            <Button
              onClick={handleATSCheck}
              disabled={!resumeText.trim() || !jobDescription.trim() || isAnalyzing}
              className="w-full"
              style={{ backgroundColor: '#70B5F9', color: '#2C3E50' }}
            >
              {isAnalyzing ? (
                'Analyzing...'
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Check ATS Score
                </>
              )}
            </Button>
          </div>

          {/* ATS Results */}
          {atsResult && (
            <div className="space-y-4 pt-4">
              {/* Score */}
              <div 
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: atsResult.score >= 70 ? '#D1FAE5' : '#FEF3C7'
                }}
              >
                <p className="text-sm font-medium" style={{ color: '#64748B' }}>
                  ATS Compatibility Score
                </p>
                <p 
                  className="text-4xl font-bold mt-1"
                  style={{ 
                    color: atsResult.score >= 70 ? '#059669' : '#D97706'
                  }}
                >
                  {atsResult.score}%
                </p>
              </div>

              {/* Matched Keywords */}
              {atsResult.matchedKeywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#059669' }}>
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Matched Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.matchedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: '#D1FAE5', color: '#059669' }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {atsResult.missingKeywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#DC2626' }}>
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Missing Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.missingKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {atsResult.suggestions.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: '#2C3E50' }}>
                    Suggestions
                  </p>
                  <ul className="space-y-1">
                    {atsResult.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm" style={{ color: '#64748B' }}>
                        - {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
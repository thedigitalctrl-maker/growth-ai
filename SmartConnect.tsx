import React, { useState } from 'react';
import { Search, User, ExternalLink, Loader2, CheckCircle, Users } from 'lucide-react';
import { ProfileAnalysis, ProfileIntent } from '../types';
import { analyzeProfile } from '../utils/profileAnalyzer';

const SmartConnect: React.FC = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!profileUrl.trim()) {
      setError('Please enter a LinkedIn profile URL.');
      return;
    }

    if (!profileUrl.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (linkedin.com/in/...).');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeProfile(profileUrl);
      setAnalysis(result);
    } catch (err) {
      setError('Unable to analyze profile. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnalyzing) {
      handleAnalyze();
    }
  };

  const getIntentColor = (intent: ProfileIntent) => {
    const colors = {
      'Job Seeker': { bg: '#DBEAFE', text: '#1E40AF' },
      'Funding Seeker': { bg: '#EDE9FE', text: '#7C3AED' },
      'Sales Prospecting': { bg: '#D1FAE5', text: '#059669' },
      'Networking': { bg: '#FEF3C7', text: '#D97706' }
    };
    return colors[intent];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: '#2C3E50' }}>
          Smart Connect
        </h2>
        <p className="text-sm mt-2" style={{ color: '#64748B' }}>
          Analyze profiles and find relevant connections
        </p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label 
          htmlFor="profile-url" 
          className="block text-sm font-semibold"
          style={{ color: '#2C3E50' }}
        >
          LinkedIn Profile URL
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
            <input
              id="profile-url"
              type="text"
              value={profileUrl}
              onChange={(e) => {
                setProfileUrl(e.target.value);
                setError(null);
              }}
              onKeyPress={handleKeyPress}
              placeholder="https://linkedin.com/in/username"
              className="input"
              style={{ paddingLeft: '40px' }}
              disabled={isAnalyzing}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !profileUrl.trim()}
            className="btn btn-primary"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Profile'
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div 
          className="p-3 rounded-lg text-sm"
          style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div className="space-y-4 pt-4 animate-fade-in">
          {/* Intent Badge */}
          <div 
            className="flex items-center justify-between p-4 rounded-lg"
            style={{ backgroundColor: getIntentColor(analysis.intent).bg }}
          >
            <div>
              <p 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: getIntentColor(analysis.intent).text }}
              >
                Detected Intent
              </p>
              <p 
                className="font-bold text-lg"
                style={{ color: getIntentColor(analysis.intent).text }}
              >
                {analysis.intent}
              </p>
            </div>
            <div className="text-right">
              <p 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: getIntentColor(analysis.intent).text }}
              >
                Confidence
              </p>
              <p 
                className="font-bold text-2xl"
                style={{ color: getIntentColor(analysis.intent).text }}
              >
                {analysis.confidence}%
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#E8F4FD' }}
              >
                <User className="w-7 h-7" style={{ color: '#0A66C2' }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg" style={{ color: '#2C3E50' }}>
                  {analysis.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                  {analysis.headline}
                </p>
              </div>
              <button
                onClick={() => window.open(profileUrl, '_blank')}
                className="btn btn-outline"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </button>
            </div>
          </div>

          {/* Insights */}
          <div className="card">
            <h4 className="font-semibold mb-3" style={{ color: '#2C3E50' }}>
              Key Insights
            </h4>
            <ul className="space-y-2">
              {analysis.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#059669' }} />
                  <span style={{ color: '#475569' }}>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Connections */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: '#0A66C2' }} />
              <h4 className="font-semibold" style={{ color: '#2C3E50' }}>
                Suggested Connections
              </h4>
            </div>
            {analysis.recommendations.map((connection) => (
              <div key={connection.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium" style={{ color: '#2C3E50' }}>
                      {connection.name}
                    </h5>
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                      {connection.headline}
                    </p>
                    <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                      {connection.reason}
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(connection.profileUrl, '_blank')}
                    className="btn btn-outline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!analysis && !isAnalyzing && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#CBD5E1' }} />
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            Enter a LinkedIn profile URL to analyze intent and find suggested connections.
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartConnect;
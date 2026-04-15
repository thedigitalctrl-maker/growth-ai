import { useState } from "react";
import { Search, User, TrendingUp, Lightbulb, ArrowRight, Loader2, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { analyzeProfile, getIntentInfo } from "../utils/profileAnalyzer";
import type { ProfileAnalysis, ProfileIntent } from "../types";

export function ProfileAnalyzer() {
  const [profileUrl, setProfileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!profileUrl.trim()) {
      setError('Please enter a LinkedIn profile URL');
      return;
    }

    // Basic URL validation
    if (!profileUrl.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (linkedin.com/in/...)');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeProfile(profileUrl);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze profile. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnalyzing) {
      handleAnalyze();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#2C3E50' }}>
            <User className="w-5 h-5" style={{ color: '#0A66C2' }} />
            Profile Intent Analyzer
          </CardTitle>
          <p className="text-sm text-slate-600">
            Enter a LinkedIn profile URL to analyze their primary intent and get personalized recommendations.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={profileUrl}
                onChange={(e) => {
                  setProfileUrl(e.target.value);
                  setError(null);
                }}
                onKeyPress={handleKeyPress}
                placeholder="https://linkedin.com/in/username"
                className="pl-10 h-11"
                disabled={isAnalyzing}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !profileUrl.trim()}
              className="h-11 px-6 font-medium"
              style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: '#DC2626' }}>
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Demo hint */}
          <p className="mt-3 text-xs text-slate-500">
            💡 Try URLs containing: "job", "founder", "sales", "speaker" for different intent results
          </p>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-4 animate-fade-in">
          {/* Intent Badge */}
          <IntentBadge intent={analysis.intent} confidence={analysis.confidence} />

          {/* Profile Info */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E8F4FD' }}
                >
                  <span className="text-2xl font-bold" style={{ color: '#0A66C2' }}>
                    {analysis.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg" style={{ color: '#2C3E50' }}>
                    {analysis.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {analysis.headline}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => window.open(profileUrl, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2" style={{ color: '#2C3E50' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#0A66C2' }} />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span style={{ color: '#475569' }}>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2" style={{ color: '#2C3E50' }}>
                <Lightbulb className="w-4 h-4" style={{ color: '#F59E0B' }} />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.recommendations.map((rec, idx) => (
                  <RecommendationCard key={rec.id} recommendation={rec} index={idx + 1} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Intent Badge Component
function IntentBadge({ intent, confidence }: { intent: ProfileIntent; confidence: number }) {
  const info = getIntentInfo(intent);
  
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl"
      style={{ backgroundColor: info.bgColor }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{info.icon}</span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: info.color }}>
            Detected Intent
          </p>
          <p className="font-bold text-lg" style={{ color: info.color }}>
            {info.label}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: info.color }}>
          Confidence
        </p>
        <p className="font-bold text-2xl" style={{ color: info.color }}>
          {confidence}%
        </p>
      </div>
    </div>
  );
}

// Recommendation Card Component
function RecommendationCard({ 
  recommendation, 
  index 
}: { 
  recommendation: ProfileAnalysis['recommendations'][0];
  index: number;
}) {
  const priorityColors = {
    high: { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
    medium: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' },
    low: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0' }
  };

  const actionIcons = {
    comment: '💬',
    connect: '🤝',
    content: '📝',
    outreach: '📧'
  };

  const colors = priorityColors[recommendation.priority];

  return (
    <div 
      className="flex gap-3 p-3 rounded-lg border"
      style={{ backgroundColor: '#FAFAFA', borderColor: '#E5E7EB' }}
    >
      <div 
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
        style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
      >
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">{actionIcons[recommendation.actionType]}</span>
          <h4 className="font-semibold text-sm" style={{ color: '#2C3E50' }}>
            {recommendation.title}
          </h4>
          <span 
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {recommendation.priority}
          </span>
        </div>
        <p className="text-sm" style={{ color: '#64748B' }}>
          {recommendation.description}
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Search, User, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { analyzeProfile, getIntentConfig } from "../utils/profileAnalyzer";
import type { ProfileAnalysis, ProfileIntent } from "../types";

export function SmartConnect() {
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
      setError('Please enter a valid LinkedIn profile URL.');
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

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="profile-url" style={{ color: '#2C3E50' }}>LinkedIn Profile URL</Label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="profile-url"
              value={profileUrl}
              onChange={(e) => {
                setProfileUrl(e.target.value);
                setError(null);
              }}
              onKeyPress={handleKeyPress}
              placeholder="https://linkedin.com/in/username"
              className="pl-10"
              disabled={isAnalyzing}
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !profileUrl.trim()}
            className="font-semibold"
            style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Profile'
            )}
          </Button>
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
        <div className="space-y-4 pt-4">
          {/* Intent Badge */}
          <IntentBadge intent={analysis.intent} confidence={analysis.confidence} />

          {/* Profile Info */}
          <Card className="border-slate-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E8F4FD' }}
                >
                  <User className="w-6 h-6" style={{ color: '#0A66C2' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold" style={{ color: '#2C3E50' }}>
                    {analysis.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                    {analysis.headline}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-slate-200">
            <CardContent className="pt-4">
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
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <div className="space-y-3">
            <h4 className="font-semibold" style={{ color: '#2C3E50' }}>
              Suggested Connections
            </h4>
            {analysis.recommendations.map((connection) => (
              <Card key={connection.id} className="border-slate-200">
                <CardContent className="pt-4">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(connection.profileUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!analysis && !isAnalyzing && (
        <p className="text-sm text-center py-8" style={{ color: '#94A3B8' }}>
          Enter a LinkedIn profile URL to analyze intent and find suggested connections.
        </p>
      )}
    </div>
  );
}

// Intent Badge Component
function IntentBadge({ intent, confidence }: { intent: ProfileIntent; confidence: number }) {
  const config = getIntentConfig(intent);
  
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-lg"
      style={{ backgroundColor: config.bgColor }}
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: config.color }}>
          Detected Intent
        </p>
        <p className="font-bold text-lg" style={{ color: config.color }}>
          {intent}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: config.color }}>
          Confidence
        </p>
        <p className="font-bold text-2xl" style={{ color: config.color }}>
          {confidence}%
        </p>
      </div>
    </div>
  );
}
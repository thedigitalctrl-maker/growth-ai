import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Copy, Check, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { CommentSuggestion } from "../types";

interface SuggestionCardsProps {
  suggestions: CommentSuggestion[];
}

export function SuggestionCards({ suggestions }: SuggestionCardsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getEngagementIcon = (engagement: string) => {
    switch (engagement) {
      case 'high':
        return <TrendingUp className="w-4 h-4" />;
      case 'medium':
        return <Minus className="w-4 h-4" />;
      case 'low':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high':
        return '#0A66C2';
      case 'medium':
        return '#70B5F9';
      case 'low':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-3 mb-4">
        <h2 
          className="text-xl sm:text-2xl font-bold"
          style={{ color: '#2C3E50' }}
        >
          Suggested Comments
        </h2>
        <span 
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: '#E8F4FD', color: '#0A66C2' }}
        >
          {suggestions.length} options
        </span>
      </div>

      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => (
          <Card 
            key={suggestion.id}
            className="border-2 transition-all duration-200 hover:shadow-md"
            style={{ 
              borderColor: index === 0 ? '#0A66C2' : '#E2E8F0',
              backgroundColor: index === 0 ? '#F8FBFE' : '#FFFFFF'
            }}
          >
            <CardHeader className="pb-3 pt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: '#0A66C2' }}
                  >
                    {index + 1}
                  </span>
                  {index === 0 && (
                    <span 
                      className="px-2 py-0.5 rounded text-xs font-semibold"
                      style={{ backgroundColor: '#70B5F9', color: '#0A66C2' }}
                    >
                      Best Match
                    </span>
                  )}
                </div>
                <div 
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getEngagementColor(suggestion.engagement)}20`,
                    color: getEngagementColor(suggestion.engagement)
                  }}
                >
                  {getEngagementIcon(suggestion.engagement)}
                  <span className="capitalize hidden sm:inline">{suggestion.engagement}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p 
                className="text-sm sm:text-base leading-relaxed mb-4"
                style={{ color: '#2C3E50' }}
              >
                {suggestion.text}
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(suggestion.text, suggestion.id)}
                  className="gap-2 transition-all duration-200 text-sm"
                  style={{
                    borderColor: copiedId === suggestion.id ? '#0A66C2' : '#E2E8F0',
                    backgroundColor: copiedId === suggestion.id ? '#0A66C2' : '#FFFFFF',
                    color: copiedId === suggestion.id ? '#FFFFFF' : '#2C3E50'
                  }}
                >
                  {copiedId === suggestion.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500 mt-4">
        💡 Personalize these comments for better engagement
      </p>
    </div>
  );
}
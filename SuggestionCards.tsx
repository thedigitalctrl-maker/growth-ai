import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { CommentSuggestion } from '../types';

interface SuggestionCardsProps {
  suggestions: CommentSuggestion[];
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ suggestions }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: '#2C3E50' }}>
        Generated Comments
      </h3>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-xl border transition-all hover:shadow-md"
            style={{ 
              backgroundColor: '#FFFFFF',
              borderColor: suggestion.isBestMatch ? '#0F6B5E' : '#E2E8F0'
            }}
          >
            {/* Best Match Badge */}
            {suggestion.isBestMatch && (
              <div className="flex items-center gap-1 mb-2">
                <span 
                  className="text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: '#0F6B5E', color: '#FFFFFF' }}
                >
                  <Sparkles className="w-3 h-3" />
                  Best Match
                </span>
              </div>
            )}

            {/* Comment Text */}
            <p className="text-sm mb-3" style={{ color: '#2C3E50' }}>
              {suggestion.text}
            </p>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(suggestion.text, suggestion.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: copiedId === suggestion.id ? '#0F6B5E' : '#F1F5F9',
                color: copiedId === suggestion.id ? '#FFFFFF' : '#64748B'
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
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCards;
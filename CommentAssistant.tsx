import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import type { ToneType, CommentSuggestion } from "../types";
import { generatePersonalizedSuggestions } from "../utils/generateSuggestions";
import { getVoiceProfile, canGenerate, incrementUsage, getUsageCount } from "../utils/storage";

interface CommentAssistantProps {
  onGenerate: () => void;
  onCopy?: (text: string) => void;
}

export function CommentAssistant({ onGenerate, onCopy }: CommentAssistantProps) {
  const [postText, setPostText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [suggestions, setSuggestions] = useState<CommentSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const usageCount = getUsageCount();
  const canGen = canGenerate();
  const showWarning = usageCount >= 8 && usageCount < 10;

  const tones: { id: ToneType; label: string }[] = [
    { id: 'humorous', label: 'Humorous' },
    { id: 'funny', label: 'Funny' },
    { id: 'debate', label: 'Debate' },
    { id: 'professional', label: 'Professional' },
    { id: 'general-short', label: 'General Short' }
  ];

  const handleGenerate = async () => {
    if (!postText.trim()) {
      setError('Please paste a LinkedIn post to generate suggestions.');
      return;
    }

    if (!canGen) {
      setError('Daily limit reached. Please try again tomorrow.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const profile = getVoiceProfile();
      const results = generatePersonalizedSuggestions(postText, selectedTone, profile);
      setSuggestions(results);
      incrementUsage();
      onGenerate();
    } catch (err) {
      setError('Unable to generate suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (onCopy) {
        onCopy(text);
      }
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      if (onCopy) {
        onCopy(text);
      }
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Usage indicator */}
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: '#64748B' }}>Daily usage:</span>
        <span 
          className="font-medium"
          style={{ color: usageCount >= 8 ? '#DC2626' : '#2C3E50' }}
        >
          {usageCount} / 10
        </span>
      </div>

      {/* Warning */}
      {showWarning && (
        <div 
          className="flex items-center gap-2 p-3 rounded-lg text-sm"
          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
        >
          <AlertCircle className="w-4 h-4" />
          You have {10 - usageCount} generations remaining today.
        </div>
      )}

      {/* Post input */}
      <div className="space-y-2">
        <Label htmlFor="post" style={{ color: '#2C3E50' }}>Paste LinkedIn Post</Label>
        <Textarea
          id="post"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Paste the LinkedIn post content here..."
          className="min-h-32 resize-none"
          disabled={!canGen || isGenerating}
        />
      </div>

      {/* Tone selector */}
      <div className="space-y-2">
        <Label style={{ color: '#2C3E50' }}>Select Tone</Label>
        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: selectedTone === tone.id ? '#0A66C2' : '#F1F5F9',
                color: selectedTone === tone.id ? '#FFFFFF' : '#64748B'
              }}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <Button
        onClick={handleGenerate}
        disabled={!canGen || isGenerating || !postText.trim()}
        className="w-full font-semibold"
        style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
      >
        {isGenerating ? 'Generating suggestions...' : 'Generate Suggestions'}
      </Button>

      {/* Error message */}
      {error && (
        <div 
          className="p-3 rounded-lg text-sm"
          style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
        >
          {error}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="font-semibold" style={{ color: '#2C3E50' }}>Suggestions</h3>
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="border-slate-200">
              <CardContent className="pt-4">
                {suggestion.isBestMatch && (
                  <span 
                    className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
                    style={{ backgroundColor: '#E8F4FD', color: '#0A66C2' }}
                  >
                    Best Match
                  </span>
                )}
                <p className="text-sm mb-3" style={{ color: '#2C3E50' }}>
                  {suggestion.text}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(suggestion.text, suggestion.id)}
                  className="text-sm"
                >
                  {copiedId === suggestion.id ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {suggestions.length === 0 && !isGenerating && (
        <p className="text-sm text-center py-8" style={{ color: '#94A3B8' }}>
          No suggestions yet. Paste a post and select a tone.
        </p>
      )}
    </div>
  );
}
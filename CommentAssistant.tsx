import React, { useState } from 'react';
import { Send, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import { ToneType, CommentSuggestion } from '../types';
import { generateSuggestions } from '../utils/commentGenerator';

interface CommentAssistantProps {
  onGenerate: () => void;
  onCopy?: (text: string) => void;
  usageCount: number;
  usageLimit: number;
}

const toneOptions: { value: ToneType; label: string }[] = [
  { value: 'humorous', label: 'Humorous' },
  { value: 'funny', label: 'Funny' },
  { value: 'debate', label: 'Debate' },
  { value: 'professional', label: 'Professional' },
  { value: 'general-short', label: 'General Short' }
];

const CommentAssistant: React.FC<CommentAssistantProps> = ({
  onGenerate,
  onCopy,
  usageCount,
  usageLimit
}) => {
  const [postText, setPostText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [suggestions, setSuggestions] = useState<CommentSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = usageCount < usageLimit;

  const handleGenerate = async () => {
    if (!postText.trim()) {
      setError('Please paste a LinkedIn post to generate suggestions.');
      return;
    }

    if (!canGenerate) {
      setError('Daily limit reached. Please try again tomorrow.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = generateSuggestions(postText, selectedTone);
    setSuggestions(results);
    setIsGenerating(false);
    onGenerate();
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (onCopy) onCopy(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      if (onCopy) onCopy(text);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: '#2C3E50' }}>
          AI Comment Assistant
        </h2>
        <p className="text-sm mt-2" style={{ color: '#64748B' }}>
          Generate engaging comments that spark conversations
        </p>
      </div>

      {/* Limit Warning */}
      {!canGenerate && (
        <div 
          className="flex items-center gap-3 p-4 rounded-lg"
          style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
        >
          <AlertCircle className="w-5 h-5" style={{ color: '#DC2626' }} />
          <p className="text-sm" style={{ color: '#DC2626' }}>
            You have reached your daily limit of {usageLimit} generations. Come back tomorrow!
          </p>
        </div>
      )}

      {/* Post Input */}
      <div className="space-y-2">
        <label 
          htmlFor="post-text" 
          className="block text-sm font-semibold"
          style={{ color: '#2C3E50' }}
        >
          Paste LinkedIn Post
        </label>
        <textarea
          id="post-text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Paste the LinkedIn post you want to comment on..."
          className="textarea"
          style={{ minHeight: '120px' }}
          disabled={!canGenerate}
        />
        <div className="flex justify-between text-xs" style={{ color: '#94A3B8' }}>
          <span>Include the full post for better suggestions</span>
          <span>{postText.length} characters</span>
        </div>
      </div>

      {/* Tone Selector */}
      <div className="space-y-3">
        <label 
          className="block text-sm font-semibold"
          style={{ color: '#2C3E50' }}
        >
          Select Comment Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => setSelectedTone(tone.value)}
              disabled={!canGenerate}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: selectedTone === tone.value ? '#0A66C2' : '#F8FAFC',
                color: selectedTone === tone.value ? '#FFFFFF' : '#64748B',
                border: `1px solid ${selectedTone === tone.value ? '#0A66C2' : '#E2E8F0'}`
              }}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleGenerate}
        disabled={!postText.trim() || isGenerating || !canGenerate}
        className="btn btn-primary w-full py-3"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Comments...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Generate Comment Suggestions
          </>
        )}
      </button>

      {/* Error */}
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
        <div className="space-y-4 pt-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold" style={{ color: '#2C3E50' }}>
              Suggested Comments
            </h3>
            <span className="badge badge-primary">{suggestions.length} options</span>
          </div>

          {suggestions.map((suggestion, index) => (
            <div 
              key={suggestion.id}
              className="card"
              style={{ 
                borderColor: index === 0 ? '#0A66C2' : '#E2E8F0',
                backgroundColor: index === 0 ? '#F8FBFE' : '#FFFFFF'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
                  >
                    {index + 1}
                  </span>
                  {index === 0 && (
                    <span className="badge badge-primary">Best Match</span>
                  )}
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: '#2C3E50' }}>
                {suggestion.text}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(suggestion.text, suggestion.id)}
                  className="btn btn-outline text-sm"
                  style={{
                    backgroundColor: copiedId === suggestion.id ? '#0A66C2' : '#FFFFFF',
                    color: copiedId === suggestion.id ? '#FFFFFF' : '#2C3E50'
                  }}
                >
                  {copiedId === suggestion.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          <p className="text-center text-sm" style={{ color: '#64748B' }}>
            Personalize these comments for better engagement
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentAssistant;
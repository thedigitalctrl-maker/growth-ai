import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ToneType } from '../types';

interface CommentFormProps {
  onSubmit: (postText: string, tone: ToneType) => void;
  isLoading: boolean;
}

const TONES: { value: ToneType; label: string; emoji: string }[] = [
  { value: 'humorous', label: 'Humorous', emoji: '😄' },
  { value: 'funny', label: 'Funny', emoji: '😂' },
  { value: 'debate', label: 'Debate', emoji: '💭' },
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'general-short', label: 'General Short', emoji: '✨' },
];

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isLoading }) => {
  const [postText, setPostText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim() && !isLoading) {
      onSubmit(postText.trim(), selectedTone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Post Input */}
      <div>
        <label 
          htmlFor="post-text" 
          className="block text-sm font-semibold mb-2"
          style={{ color: '#2C3E50' }}
        >
          Paste LinkedIn Post
        </label>
        <textarea
          id="post-text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Paste the LinkedIn post content here..."
          className="w-full p-4 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: '#E2E8F0',
            minHeight: '160px',
            color: '#2C3E50'
          }}
          disabled={isLoading}
        />
      </div>

      {/* Tone Selector */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: '#2C3E50' }}>
          Select Tone
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {TONES.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => setSelectedTone(tone.value)}
              className="p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: selectedTone === tone.value ? '#0F6B5E' : '#FFFFFF',
                borderColor: selectedTone === tone.value ? '#0F6B5E' : '#E2E8F0',
                color: selectedTone === tone.value ? '#FFFFFF' : '#64748B'
              }}
            >
              <span>{tone.emoji}</span>
              <span className="hidden md:inline">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!postText.trim() || isLoading}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ backgroundColor: '#FF6B4A' }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Generate Comments
          </>
        )}
      </button>
    </form>
  );
};

export default CommentForm;
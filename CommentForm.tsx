import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Loader2, AlertCircle } from "lucide-react";
import type { ToneType } from "../types";

interface CommentFormProps {
  onSubmit: (postText: string, tone: ToneType) => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

const toneOptions: { value: ToneType; label: string; emoji: string }[] = [
  { value: 'humorous', label: 'Humorous', emoji: '😄' },
  { value: 'funny', label: 'Funny', emoji: '😂' },
  { value: 'debate', label: 'Debate', emoji: '💭' },
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'general-short', label: 'Short', emoji: '✨' },
];

export function CommentForm({ onSubmit, isGenerating, canGenerate }: CommentFormProps) {
  const [postText, setPostText] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType>("professional");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim() && !isGenerating && canGenerate) {
      onSubmit(postText.trim(), selectedTone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Limit Warning */}
      {!canGenerate && (
        <div 
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">
            You've reached your daily limit of 10 generations. Come back tomorrow!
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
        <Textarea
          id="post-text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Paste the LinkedIn post you want to comment on..."
          className="min-h-36 text-base resize-none transition-all duration-200"
          style={{ 
            borderColor: postText ? '#0A66C2' : '#E2E8F0',
            color: '#2C3E50'
          }}
          disabled={!canGenerate}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>💡 Include the full post for better suggestions</span>
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
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => setSelectedTone(tone.value)}
              disabled={!canGenerate}
              className={`
                px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                flex flex-col items-center justify-center gap-1.5
                border-2 hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              style={{
                backgroundColor: selectedTone === tone.value ? '#0A66C2' : '#F8FAFC',
                borderColor: selectedTone === tone.value ? '#0A66C2' : '#E2E8F0',
                color: selectedTone === tone.value ? '#FFFFFF' : '#64748B',
              }}
            >
              <span className="text-lg">{tone.emoji}</span>
              <span className="text-xs sm:text-sm">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!postText.trim() || isGenerating || !canGenerate}
        className="w-full py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{ 
          backgroundColor: '#0A66C2',
          color: '#FFFFFF'
        }}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Comments...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Generate Comment Suggestions
          </span>
        )}
      </Button>
    </form>
  );
}
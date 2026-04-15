import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { SuggestionCards } from "./SuggestionCards";
import { AboutSection } from "./AboutSection";
import { generateMockSuggestions } from "../utils/generateSuggestions";
import type { CommentSuggestion, ToneType } from "../types";

interface CommentHelperProps {
  canGenerate: boolean;
  onGenerate: () => void;
}

export function CommentHelper({ canGenerate, onGenerate }: CommentHelperProps) {
  const [suggestions, setSuggestions] = useState<CommentSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleSubmit = async (postText: string, tone: ToneType) => {
    if (!canGenerate) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newSuggestions = generateMockSuggestions(postText, tone);
    setSuggestions(newSuggestions);
    setHasGenerated(true);
    onGenerate();
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ color: '#2C3E50' }}
        >
          AI Comment Assistant
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Generate engaging comments that spark conversations and build your network
        </p>
      </div>

      {/* About Section - only show before first generation */}
      {!hasGenerated && <AboutSection />}

      <CommentForm 
        onSubmit={handleSubmit} 
        isGenerating={isGenerating}
        canGenerate={canGenerate}
      />
      
      {hasGenerated && suggestions.length > 0 && (
        <SuggestionCards suggestions={suggestions} />
      )}
    </div>
  );
}
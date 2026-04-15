import React, { useState } from 'react';
import Header from './components/Header';
import CommentForm from './components/CommentForm';
import SuggestionCards from './components/SuggestionCards';
import { CommentSuggestion, ToneType } from './types';
import { generateSuggestions } from './utils/commentGenerator';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<CommentSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const maxUsage = 80;

  const handleSubmit = async (postText: string, tone: ToneType) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newSuggestions = generateSuggestions(postText, tone);
    setSuggestions(newSuggestions);
    setUsageCount(prev => Math.min(prev + 1, maxUsage));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Header usageCount={usageCount} maxUsage={maxUsage} />
      
      <main className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#2C3E50' }}>
              LinkedIn Comment Assistant
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Generate engaging comments for LinkedIn posts with AI
            </p>
          </div>

          {/* Comment Form */}
          <CommentForm onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="pt-4">
              <SuggestionCards suggestions={suggestions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, User, MessageCircle, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import type { TrainingStep } from "../types";

const TRAINING_STEPS: TrainingStep[] = [
  {
    id: 1,
    title: "Write a positive comment",
    description: "Share a comment you'd write on a post you agree with or find valuable.",
    placeholder: "e.g., 'This is such a refreshing perspective on leadership. I especially loved the point about empowering team members...'",
    type: 'positive'
  },
  {
    id: 2,
    title: "Write a disagreement comment",
    description: "Share how you'd respectfully disagree with a post while adding value.",
    placeholder: "e.g., 'Interesting take, though I see this differently based on my experience. In my view, the key factor here is...'",
    type: 'disagreement'
  },
  {
    id: 3,
    title: "Write an educational comment",
    description: "Share a comment where you add insights or teach something relevant.",
    placeholder: "e.g., 'Great topic! From what I've learned, there are three key factors to consider here. First...'",
    type: 'educational'
  }
];

interface VoiceTrainerProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function VoiceTrainer({ onComplete, onSkip }: VoiceTrainerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = TRAINING_STEPS[currentStep];
  const currentResponse = responses[currentStep];
  const canProceed = currentResponse.trim().length >= 20;
  const isLastStep = currentStep === TRAINING_STEPS.length - 1;

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
    setError(null);
  };

  const handleNext = () => {
    if (!canProceed) {
      setError('Please write at least 20 characters to continue.');
      return;
    }
    
    if (isLastStep) {
      handleAnalyze();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Import dynamically to avoid circular deps
      const { analyzeVoiceProfile, saveVoiceProfile, setTrainingComplete } = await import('../utils/voiceProfileManager');
      
      const profile = await analyzeVoiceProfile(responses[0], responses[1], responses[2]);
      saveVoiceProfile(profile);
      setTrainingComplete();
      onComplete();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'positive': return <MessageCircle className="w-5 h-5" />;
      case 'disagreement': return <User className="w-5 h-5" />;
      case 'educational': return <Lightbulb className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#0A66C2' }}
              >
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold" style={{ color: '#2C3E50' }}>Growth AI</span>
            </div>
            <button
              onClick={onSkip}
              className="text-sm font-medium hover:underline"
              style={{ color: '#64748B' }}
            >
              Skip for now
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-slate-100">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${((currentStep + 1) / TRAINING_STEPS.length) * 100}%`,
            backgroundColor: '#0A66C2'
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {TRAINING_STEPS.map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: idx <= currentStep ? '#0A66C2' : '#E2E8F0',
                  transform: idx === currentStep ? 'scale(1.25)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Step card */}
          <div 
            className="rounded-2xl p-6 sm:p-8 shadow-lg border"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
          >
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#E8F4FD' }}
            >
              <div style={{ color: '#0A66C2' }}>
                {getStepIcon(step.type)}
              </div>
            </div>

            {/* Title & description */}
            <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2C3E50' }}>
              {step.title}
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: '#64748B' }}>
              {step.description}
            </p>

            {/* Textarea */}
            <Textarea
              value={currentResponse}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder={step.placeholder}
              className="min-h-40 text-base resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isAnalyzing}
            />

            {/* Character count */}
            <div className="flex justify-between items-center mt-2 mb-4">
              <span className="text-xs" style={{ color: currentResponse.length >= 20 ? '#10B981' : '#94A3B8' }}>
                {currentResponse.length} / 20 min characters
              </span>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isAnalyzing}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={!canProceed || isAnalyzing}
                className="flex-1 font-semibold"
                style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing your voice...
                  </>
                ) : isLastStep ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Complete Training
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Skip link */}
          <p className="text-center mt-6 text-sm" style={{ color: '#94A3B8' }}>
            You can always retrain your voice profile in settings
          </p>
        </div>
      </main>
    </div>
  );
}
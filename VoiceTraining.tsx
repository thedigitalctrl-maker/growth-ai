import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { FeedbackButton } from "./FeedbackButton";
import { Logo } from "./Logo";

interface VoiceTrainingProps {
  onComplete: () => void;
}

interface TrainingAnswers {
  question1: string;
  question2: string;
  question3: string;
}

export function VoiceTraining({ onComplete }: VoiceTrainingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<TrainingAnswers>({
    question1: '',
    question2: '',
    question3: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 'question1',
      title: 'Question 1 of 3',
      question: 'Write a LinkedIn comment congratulating a colleague on a promotion.',
      placeholder: 'Example: Congratulations on your well-deserved promotion! Your hard work and dedication have truly paid off...'
    },
    {
      id: 'question2',
      title: 'Question 2 of 3',
      question: 'Someone posts: "AI will replace all software engineers in 5 years." You disagree respectfully. Write your reply.',
      placeholder: 'Example: Interesting perspective! While AI is advancing rapidly, I believe human creativity and problem-solving remain irreplaceable...'
    },
    {
      id: 'question3',
      title: 'Question 3 of 3',
      question: 'A junior asks for advice on learning data science. Share your tips.',
      placeholder: 'Example: Great question! I would recommend starting with Python fundamentals, then moving to statistics and machine learning concepts...'
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    
    try {
      localStorage.setItem('growthai_voice_training', JSON.stringify({
        completed: true,
        answers,
        completedAt: new Date().toISOString()
      }));
      
      setTimeout(() => {
        onComplete();
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('growthai_voice_training', JSON.stringify({
      completed: true,
      skipped: true,
      completedAt: new Date().toISOString()
    }));
    onComplete();
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id as keyof TrainingAnswers];
  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-xl mx-auto px-4 py-4">
          <Logo size="md" showText={true} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: '#2C3E50' }}>Voice Training</h1>
          <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
            Help us learn your writing style for personalized suggestions
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className="w-8 h-1 rounded-full transition-all"
              style={{
                backgroundColor: idx <= currentStep ? '#0F6B5E' : '#E2E8F0'
              }}
            />
          ))}
        </div>

        {/* Question Card */}
        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  {currentQuestion.title}
                </span>
                <span className="text-sm" style={{ color: '#94A3B8' }}>
                  {currentStep + 1} / {questions.length}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor={currentQuestion.id} style={{ color: '#2C3E50' }}>
                  {currentQuestion.question}
                </Label>
                <Textarea
                  id={currentQuestion.id}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="min-h-32 resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
          
          {isLastStep ? (
            <Button
              onClick={handleComplete}
              disabled={isSubmitting}
              className="flex-1 font-semibold"
              style={{ backgroundColor: '#0F6B5E', color: '#FFFFFF' }}
            >
              {isSubmitting ? 'Completing...' : 'Complete Training'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="flex-1 font-semibold"
              style={{ backgroundColor: '#0F6B5E', color: '#FFFFFF' }}
            >
              Continue
            </Button>
          )}
        </div>

        {/* Skip option */}
        <div className="text-center mt-6">
          <button
            onClick={handleSkip}
            className="text-sm hover:underline"
            style={{ color: '#64748B' }}
          >
            Use default style
          </button>
        </div>
      </main>

      <FeedbackButton />
    </div>
  );
}
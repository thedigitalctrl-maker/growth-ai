import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { FeedbackButton } from "./components/FeedbackButton";
import { VoiceTraining } from "./components/VoiceTraining";
import { CommentAssistant } from "./components/CommentAssistant";
import { BoldTextMaker } from "./components/BoldTextMaker";
import { SmartConnect } from "./components/SmartConnect";
import { ResumeStudio } from "./components/ResumeStudio";
import { Logo } from "./components/Logo";
import { useToast } from "./hooks/useToast";
import { isTrainingComplete, getUsageCount } from "./utils/storage";

export type TabType = 'comments' | 'bold' | 'connect' | 'resume';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('comments');
  const [showTraining, setShowTraining] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usageCount, setUsageCount] = useState(0);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const trainingComplete = isTrainingComplete();
    if (!trainingComplete) {
      setShowTraining(true);
    }
    setUsageCount(getUsageCount());
    setIsLoading(false);
  }, []);

  const handleGenerate = () => {
    setUsageCount(getUsageCount());
  };

  const handleCopy = (_text: string) => {
    showToast('Copied to clipboard');
  };

  const handleTrainingComplete = () => {
    setShowTraining(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="text-center">
          <Logo size="lg" showText={false} />
          <p className="text-sm mt-4" style={{ color: '#64748B' }}>Loading Growth AI...</p>
        </div>
      </div>
    );
  }

  if (showTraining) {
    return <VoiceTraining onComplete={handleTrainingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <Header used={usageCount} limit={10} />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === 'comments' && (
            <CommentAssistant onGenerate={handleGenerate} onCopy={handleCopy} />
          )}
          {activeTab === 'bold' && <BoldTextMaker onCopy={handleCopy} />}
          {activeTab === 'connect' && <SmartConnect />}
          {activeTab === 'resume' && <ResumeStudio />}
        </div>
      </main>

      <Footer />
      
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onHide={hideToast}
      />
      
      <FeedbackButton />
    </div>
  );
}
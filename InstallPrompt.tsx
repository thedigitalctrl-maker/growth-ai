import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { promptInstall, subscribeToInstallState, canInstallApp } from "../utils/pwaInstaller";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const wasDismissed = sessionStorage.getItem('pwa-install-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Initial check
    setShowPrompt(canInstallApp());

    // Subscribe to install state changes
    const unsubscribe = subscribeToInstallState((canInstall) => {
      setShowPrompt(canInstall && !dismissed);
    });

    return unsubscribe;
  }, [dismissed]);

  const handleInstall = async () => {
    setIsInstalling(true);
    const installed = await promptInstall();
    setIsInstalling(false);
    
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div 
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-20 sm:w-80 z-40 animate-slide-up"
    >
      <div 
        className="rounded-xl p-4 shadow-xl border"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#0A66C2' }}
          >
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-sm mb-1"
              style={{ color: '#2C3E50' }}
            >
              Install Growth AI
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Add to your home screen for quick access and offline use.
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 h-8 text-xs font-medium"
                style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
              >
                <Download className="w-3 h-3 mr-1" />
                {isInstalling ? 'Installing...' : 'Install'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="h-8 px-3 text-xs"
                style={{ color: '#64748B' }}
              >
                Not now
              </Button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded hover:bg-slate-100 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
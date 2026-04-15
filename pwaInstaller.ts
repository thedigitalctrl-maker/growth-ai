import type { BeforeInstallPromptEvent } from "../types";

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installCallbacks: ((canInstall: boolean) => void)[] = [];

export function initPWAInstaller() {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    installCallbacks.forEach(cb => cb(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    installCallbacks.forEach(cb => cb(false));
  });
}

export function canInstallApp(): boolean {
  return deferredPrompt !== null;
}

export function subscribeToInstallState(callback: (canInstall: boolean) => void): () => void {
  installCallbacks.push(callback);
  return () => {
    installCallbacks = installCallbacks.filter(cb => cb !== callback);
  };
}

export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) return false;

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      deferredPrompt = null;
      installCallbacks.forEach(cb => cb(false));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Install prompt error:', error);
    return false;
  }
}

export function isRunningAsPWA(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}
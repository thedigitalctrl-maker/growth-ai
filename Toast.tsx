import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, isVisible, onHide, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in"
    >
      <div 
        className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
        style={{ backgroundColor: '#1E293B', color: '#FFFFFF' }}
      >
        <CheckCircle className="w-4 h-4" style={{ color: '#059669' }} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
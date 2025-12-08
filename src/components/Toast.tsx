import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, X, Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'animate-slide-up'
      )}
    >
      <div 
        className={cn(
          'paper-card px-6 py-4 rounded-xl shadow-scrapbook',
          'flex items-center gap-3',
          'border-2',
          type === 'success' ? 'border-mint' : 'border-destructive/50'
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          type === 'success' 
            ? 'bg-gradient-to-br from-mint to-secondary' 
            : 'bg-destructive/20'
        )}>
          {type === 'success' ? (
            <Check className="w-5 h-5 text-secondary-foreground" />
          ) : (
            <X className="w-5 h-5 text-destructive" />
          )}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="font-handwritten text-lg text-foreground">
            {message}
          </p>
          {type === 'success' && (
            <p className="font-hand text-sm text-kraft flex items-center gap-1">
              Erik & Rafa agradecem!
              <Heart className="w-3 h-3 text-blush animate-heart-beat fill-current" />
            </p>
          )}
        </div>

        {/* Decorations */}
        {type === 'success' && (
          <div className="flex flex-col gap-1">
            <Sparkles className="w-4 h-4 text-peach animate-sparkle" />
            <span className="text-lg">💕</span>
          </div>
        )}

        {/* Close button */}
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-cream/80 transition-colors"
        >
          <X className="w-4 h-4 text-kraft" />
        </button>
      </div>
    </div>
  );
};

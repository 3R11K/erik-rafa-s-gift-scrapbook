import { cn } from '@/lib/utils';

interface WashiTapeProps {
  variant?: 'pink' | 'mint' | 'blue';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';
  rotation?: number;
  className?: string;
}

export const WashiTape = ({ 
  variant = 'pink', 
  position = 'top-left',
  rotation = -5,
  className 
}: WashiTapeProps) => {
  const positionClasses = {
    'top-left': '-top-2 -left-4',
    'top-right': '-top-2 -right-4',
    'bottom-left': '-bottom-2 -left-4',
    'bottom-right': '-bottom-2 -right-4',
    'top-center': '-top-2 left-1/2 -translate-x-1/2',
  };

  const variantClasses = {
    pink: 'bg-gradient-to-r from-blush/60 to-peach/60',
    mint: 'bg-gradient-to-r from-mint/60 to-secondary/60',
    blue: 'bg-gradient-to-r from-sky/60 to-accent/60',
  };

  return (
    <div 
      className={cn(
        'absolute h-5 w-16 md:h-6 md:w-20 rounded-sm shadow-tape',
        positionClasses[position],
        variantClasses[variant],
        className
      )}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        backgroundImage: `repeating-linear-gradient(
          ${variant === 'mint' ? '-45deg' : '45deg'},
          transparent,
          transparent 2px,
          rgba(255,255,255,0.3) 2px,
          rgba(255,255,255,0.3) 4px
        )`,
      }}
    />
  );
};

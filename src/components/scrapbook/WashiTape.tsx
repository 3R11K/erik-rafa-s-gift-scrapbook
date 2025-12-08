import { cn } from '@/lib/utils';

interface WashiTapeProps {
  variant?: 'pink' | 'mint' | 'blue' | 'yellow' | 'lavender';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';
  rotation?: number;
  className?: string;
  length?: number;
}

export const WashiTape = ({ 
  variant = 'pink', 
  position = 'top-left',
  rotation = -5,
  className,
  length = 100
}: WashiTapeProps) => {
  const positionClasses = {
    'top-left': '-top-3 -left-6',
    'top-right': '-top-3 -right-6',
    'bottom-left': '-bottom-3 -left-6',
    'bottom-right': '-bottom-3 -right-6',
    'top-center': '-top-3 left-1/2 -translate-x-1/2',
  };

  // Fita transparente realista - tipo scotch/durex
  const tapeStyles = {
    pink: {
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
      border: 'none',
    },
    mint: {
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
      border: 'none',
    },
    blue: {
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
      border: 'none',
    },
    yellow: {
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
      border: 'none',
    },
    lavender: {
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
      border: 'none',
    },
  };

  const style = tapeStyles[variant];

  return (
    <div 
      className={cn(
        'absolute h-7 z-20',
        positionClasses[position],
        className
      )}
      style={{ 
        width: `${length}px`,
        transform: `rotate(${rotation}deg)`,
        background: style.background,
        border: style.border,
        backdropFilter: 'blur(0.5px)',
        boxShadow: `
          0 1px 2px rgba(0, 0, 0, 0.08),
          0 2px 4px rgba(0, 0, 0, 0.05),
          inset 0 1px 1px rgba(255, 255, 255, 0.8),
          inset 0 -1px 1px rgba(255, 255, 255, 0.6)
        `,
        borderRadius: '1px',
        opacity: 0.75,
      }}
    >
      {/* Textura de fita - linhas sutis */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.4) 1px, rgba(255,255,255,0.4) 2px)',
        }}
      />
    </div>
  );
};

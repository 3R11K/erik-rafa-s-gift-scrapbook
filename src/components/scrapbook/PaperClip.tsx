import { cn } from '@/lib/utils';

interface PaperClipProps {
  position?: 'top-left' | 'top-right' | 'top-center';
  color?: 'silver' | 'gold' | 'rose';
  className?: string;
}

export const PaperClip = ({ 
  position = 'top-left',
  color = 'silver',
  className 
}: PaperClipProps) => {
  const positionClasses = {
    'top-left': 'top-0 left-4',
    'top-right': 'top-0 right-4',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
  };

  const colorStyles = {
    silver: {
      background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 50%, #a8a8a8 100%)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    gold: {
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffc700 100%)',
      shadow: 'rgba(139, 69, 19, 0.3)',
    },
    rose: {
      background: 'linear-gradient(135deg, #ffb3d9 0%, #ff99cc 50%, #ff7ab8 100%)',
      shadow: 'rgba(139, 69, 19, 0.3)',
    },
  };

  const style = colorStyles[color];

  return (
    <div 
      className={cn(
        'absolute -top-1 z-30',
        positionClasses[position],
        className
      )}
    >
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`clip-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color === 'silver' ? '#e0e0e0' : color === 'gold' ? '#ffd700' : '#ffb3d9' }} />
            <stop offset="50%" style={{ stopColor: color === 'silver' ? '#c0c0c0' : color === 'gold' ? '#ffed4e' : '#ff99cc' }} />
            <stop offset="100%" style={{ stopColor: color === 'silver' ? '#a8a8a8' : color === 'gold' ? '#ffc700' : '#ff7ab8' }} />
          </linearGradient>
          <filter id={`clip-shadow-${color}`}>
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor={style.shadow} floodOpacity="0.5"/>
          </filter>
        </defs>
        <path 
          d="M 4,2 L 4,20 C 4,24 6,26 9,26 C 12,26 14,24 14,20 L 14,8 C 14,6 13,5 12,5 C 11,5 10,6 10,8 L 10,18 C 10,19 10.5,19.5 11,19.5 C 11.5,19.5 12,19 12,18 L 12,9"
          stroke={`url(#clip-gradient-${color})`}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          filter={`url(#clip-shadow-${color})`}
        />
      </svg>
    </div>
  );
};

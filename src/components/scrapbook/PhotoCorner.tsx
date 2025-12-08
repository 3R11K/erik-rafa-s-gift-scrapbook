import { cn } from '@/lib/utils';

interface PhotoCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: 'kraft' | 'white' | 'black';
  className?: string;
}

export const PhotoCorner = ({ 
  position,
  color = 'kraft',
  className 
}: PhotoCornerProps) => {
  const colorMap = {
    kraft: '#d4a574',
    white: '#fdfbf7',
    black: '#3a3a3a',
  };

  const rotationMap = {
    'top-left': 0,
    'top-right': 90,
    'bottom-left': 270,
    'bottom-right': 180,
  };

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div 
      className={cn(
        'absolute w-6 h-6 z-10',
        positionClasses[position],
        className
      )}
      style={{
        transform: `rotate(${rotationMap[position]}deg)`,
        transformOrigin: position === 'top-left' ? 'top left' : 
                        position === 'top-right' ? 'top right' :
                        position === 'bottom-left' ? 'bottom left' : 'bottom right',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`corner-shadow-${position}`}>
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.2)" floodOpacity="0.5"/>
          </filter>
        </defs>
        <path 
          d="M 0,0 L 24,0 L 24,3 L 3,3 L 3,24 L 0,24 Z" 
          fill={colorMap[color]}
          filter={`url(#corner-shadow-${position})`}
          opacity="0.85"
        />
        <path 
          d="M 0,0 L 20,0 L 0,20 Z" 
          fill={colorMap[color]}
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

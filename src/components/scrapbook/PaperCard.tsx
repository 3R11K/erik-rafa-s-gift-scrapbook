import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { WashiTape } from './WashiTape';

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  tilt?: 1 | 2 | 3 | 4;
  showTape?: boolean;
  tapeVariant?: 'pink' | 'mint' | 'blue';
  tapePosition?: 'top-left' | 'top-right' | 'top-center';
  style?: React.CSSProperties;
}

export const PaperCard = ({ 
  children, 
  className,
  tilt = 1,
  showTape = true,
  tapeVariant = 'pink',
  tapePosition = 'top-center',
  style
}: PaperCardProps) => {
  const tiltClasses = {
    1: 'hover:rotate-0 rotate-[-1deg]',
    2: 'hover:rotate-0 rotate-[0.5deg]',
    3: 'hover:rotate-0 rotate-[-0.5deg]',
    4: 'hover:rotate-0 rotate-[1deg]',
  };

  return (
    <div 
      className={cn(
        'relative paper-card rounded-lg p-4 transition-all duration-300',
        'hover:shadow-scrapbook hover:scale-[1.02]',
        'torn-edge',
        tiltClasses[tilt],
        className
      )}
      style={style}
    >
      {showTape && (
        <WashiTape 
          variant={tapeVariant} 
          position={tapePosition}
          rotation={tapePosition === 'top-center' ? -3 : tapePosition.includes('left') ? -8 : 8}
        />
      )}
      {children}
    </div>
  );
};

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { WashiTape } from './WashiTape';

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  tilt?: 1 | 2 | 3 | 4;
  showTape?: boolean;
  tapeVariant?: 'pink' | 'mint' | 'blue' | 'yellow' | 'lavender';
  tapePosition?: 'top-left' | 'top-right' | 'top-center';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PaperCard = ({ 
  children, 
  className,
  tilt = 1,
  showTape = true,
  tapeVariant = 'pink',
  tapePosition = 'top-center',
  style,
  onClick
}: PaperCardProps) => {
  const tiltClasses = {
    1: 'hover:rotate-0 rotate-[-2deg]',
    2: 'hover:rotate-0 rotate-[1.5deg]',
    3: 'hover:rotate-0 rotate-[-1.2deg]',
    4: 'hover:rotate-0 rotate-[2.2deg]',
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        'relative paper-card rounded-lg p-5 transition-all duration-300',
        'hover:shadow-2xl hover:scale-[1.04] hover:z-10',
        tiltClasses[tilt],
        className
      )}
      style={{
        ...style,
        // Textura de papel mais realista
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E")
        `,
        backgroundColor: '#fdfbf7',
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.08),
          0 4px 8px rgba(0, 0, 0, 0.06),
          0 8px 16px rgba(0, 0, 0, 0.04),
          0 0 0 1px rgba(255, 255, 255, 0.9)
        `,
      }}
    >
      {showTape && (
        <>
          <WashiTape 
            variant={tapeVariant} 
            position={tapePosition}
            rotation={tapePosition === 'top-center' ? -5 : tapePosition.includes('left') ? -12 : 12}
            length={tapePosition === 'top-center' ? 130 : 100}
          />
        </>
      )}
      {children}
    </div>
  );
};

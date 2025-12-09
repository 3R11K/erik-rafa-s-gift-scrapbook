import { useState } from 'react';
import { Gift } from '@/types/gift';
import { cn } from '@/lib/utils';
import { ExternalLink, Gift as GiftIcon } from 'lucide-react';
import { PaperCard } from './scrapbook/PaperCard';
import { PurchasedBadge } from './scrapbook/PurchasedBadge';
import { PhotoCorner } from './scrapbook/PhotoCorner';
import { PaperClip } from './scrapbook/PaperClip';
import { WashiTape } from './scrapbook/WashiTape';

interface GiftCardProps {
  gift: Gift;
  index: number;
  onSelect: (gift: Gift) => void;
  onUnmark?: (gift: Gift) => void;
}

export const GiftCard = ({ gift, index, onSelect, onUnmark }: GiftCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const tapeVariants: ('pink' | 'mint' | 'blue' | 'yellow' | 'lavender')[] = ['pink', 'mint', 'blue', 'yellow', 'lavender'];
  const tapePositions: ('top-left' | 'top-right' | 'top-center')[] = ['top-center', 'top-left', 'top-right'];
  const tilts: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
  
  // Different decorative elements for variety
  const decorativeCorners = [
    { top: '✨', bottom: '🌸' },
    { top: '💕', bottom: '⭐' },
    { top: '🎀', bottom: '💐' },
    { top: '🌟', bottom: '🌺' },
    { top: '💖', bottom: '🦋' },
  ];
  
  const corner = decorativeCorners[index % decorativeCorners.length];

  const fallbackImage = `https://placehold.co/400x300/e8b4b8/ffffff?text=${encodeURIComponent('🎁')}`;

  const handleCardClick = () => {
    window.open(gift.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <PaperCard
      tilt={tilts[index % 4]}
      tapeVariant={tapeVariants[index % 5]}
      tapePosition={tapePositions[index % 3]}
      onClick={handleCardClick}
      className={cn(
        'animate-fade-in cursor-pointer group overflow-visible',
        gift.comprado && 'cursor-default'
      )}
      style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* Additional decorative washi tape pieces for variation */}
      {index % 3 === 0 && (
        <WashiTape 
          variant="pink" 
          position="bottom-right" 
          rotation={18}
          length={85}
        />
      )}
      {index % 5 === 2 && (
        <WashiTape 
          variant="mint" 
          position="top-right" 
          rotation={-12}
          length={75}
        />
      )}

      {/* Decorative corner emojis - mais sutis */}
      <div className="absolute -top-2 -right-2 text-lg md:text-2xl opacity-60 drop-shadow-lg animate-float z-20">
        {corner.top}
      </div>
      <div className="absolute -bottom-2 -left-2 text-lg md:text-2xl opacity-60 drop-shadow-lg animate-float z-20" style={{ animationDelay: '0.5s' }}>
        {corner.bottom}
      </div>

      {/* Content Container */}
      <div className={cn(
        'relative transition-all duration-300',
        gift.comprado && 'opacity-40 blur-[1px]'
      )}>
        {/* Image Container - estilo foto de câmera instantânea */}
        <div className="relative aspect-[4/3] mb-2 md:mb-4 overflow-hidden rounded-[2px] bg-white shadow-xl border-[6px] md:border-[10px] border-white" style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.05)',
        }}>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream to-paper">
              <GiftIcon className="w-12 h-12 text-kraft/40 animate-bounce-soft" />
            </div>
          )}
          <img
            src={imageError ? fallbackImage : (gift.imageUrl || fallbackImage)}
            alt={gift.item}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              'group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
            style={{
              filter: 'contrast(1.08) saturate(1.12) brightness(0.97)',
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Film grain texture para efeito de foto analógica */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Vinheta sutil para dar efeito de foto antiga */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
            }}
          />
          
          {/* Light leak sutil em alguns cards */}
          {index % 7 === 0 && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 150, 0.3) 0%, transparent 40%)',
              }}
            />
          )}
          
          {/* Sombra interna da foto */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.08)' }} />
        </div>

        {/* Item Name */}
        <h3 className="font-handwritten text-base md:text-xl lg:text-2xl text-foreground mb-1 md:mb-1.5 leading-tight line-clamp-2 relative">
          {gift.item}
          {/* Handwritten underline accent */}
          <div className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </h3>

        {/* Price */}
        {gift.preco && (
          <div className="relative inline-block mb-1.5 md:mb-2">
            <p className="font-hand text-sm md:text-lg text-primary font-semibold">
              {gift.preco.startsWith('$') ? `R${gift.preco}` : gift.preco}
            </p>
            {/* Price tag sticker effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-peach/20 to-blush/20 rounded-md -z-10 transform rotate-1" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-1.5 md:gap-2 mt-2 md:mt-3">
          <a
            href={gift.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 md:gap-1.5 text-xs md:text-sm font-hand text-kraft hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver produto
          </a>

          {!gift.comprado && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(gift);
              }}
              className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full font-hand text-xs md:text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 relative overflow-hidden group/btn"
              style={{
                background: 'linear-gradient(135deg, #a88a6f 0%, #9b8070 100%)',
                color: '#ffffff'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <GiftIcon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Reservar!</span>
            </button>
          )}
        </div>
      </div>

      {/* Purchased Overlay */}
      {gift.comprado && (
        <PurchasedBadge 
          buyerName={gift.porQuem} 
          onUnmark={onUnmark ? () => onUnmark(gift) : undefined}
        />
      )}
    </PaperCard>
  );
};

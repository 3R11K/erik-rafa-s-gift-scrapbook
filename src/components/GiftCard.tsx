import { useState } from 'react';
import { Gift } from '@/types/gift';
import { cn } from '@/lib/utils';
import { ExternalLink, Gift as GiftIcon } from 'lucide-react';
import { PaperCard } from './scrapbook/PaperCard';
import { PurchasedBadge } from './scrapbook/PurchasedBadge';
import { Sticker } from './scrapbook/Sticker';
import { HeartDoodle, StarDoodle } from './scrapbook/Doodles';

interface GiftCardProps {
  gift: Gift;
  index: number;
  onSelect: (gift: Gift) => void;
}

export const GiftCard = ({ gift, index, onSelect }: GiftCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const tapeVariants: ('pink' | 'mint' | 'blue')[] = ['pink', 'mint', 'blue'];
  const tapePositions: ('top-left' | 'top-right' | 'top-center')[] = ['top-center', 'top-left', 'top-right'];
  const tilts: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

  const fallbackImage = `https://placehold.co/400x300/e8b4b8/ffffff?text=${encodeURIComponent('🎁')}`;

  return (
    <PaperCard
      tilt={tilts[index % 4]}
      tapeVariant={tapeVariants[index % 3]}
      tapePosition={tapePositions[index % 3]}
      className={cn(
        'animate-fade-in cursor-pointer group',
        gift.comprado && 'cursor-default'
      )}
      style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* Decorative Elements */}
      <div className="absolute -top-1 -right-1 opacity-60">
        {index % 3 === 0 && <HeartDoodle className="w-4 h-4 md:w-5 md:h-5 text-blush" />}
        {index % 3 === 1 && <StarDoodle className="w-4 h-4 md:w-5 md:h-5 text-peach" />}
        {index % 3 === 2 && <span className="text-lg">✨</span>}
      </div>

      {/* Content Container */}
      <div className={cn(
        'relative transition-all duration-300',
        gift.comprado && 'opacity-40 blur-[1px]'
      )}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-md bg-cream/50">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
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
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Photo corners effect */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-kraft/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-kraft/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-kraft/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-kraft/30" />
        </div>

        {/* Item Name */}
        <h3 className="font-handwritten text-xl md:text-2xl text-foreground mb-2 leading-tight line-clamp-2">
          {gift.item}
        </h3>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <a
            href={gift.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-hand text-kraft hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver produto
          </a>

          {!gift.comprado && (
            <button
              onClick={() => onSelect(gift)}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-blush hover:from-blush hover:to-primary text-primary-foreground px-3 py-1.5 rounded-full font-hand text-sm transition-all duration-300 shadow-sticker hover:shadow-scrapbook hover:scale-105"
            >
              <GiftIcon className="w-4 h-4" />
              Presentear!
            </button>
          )}
        </div>
      </div>

      {/* Purchased Overlay */}
      {gift.comprado && (
        <PurchasedBadge buyerName={gift.porQuem} />
      )}
    </PaperCard>
  );
};

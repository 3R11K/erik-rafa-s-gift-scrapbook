import { cn } from '@/lib/utils';
import { Heart, Check } from 'lucide-react';

interface PurchasedBadgeProps {
  buyerName?: string;
  className?: string;
}

export const PurchasedBadge = ({ buyerName, className }: PurchasedBadgeProps) => {
  return (
    <div 
      className={cn(
        'absolute inset-0 z-20 flex items-center justify-center',
        className
      )}
    >
      <div 
        className="relative transform rotate-[-8deg] animate-scale-in"
        style={{ animationDelay: '0.1s' }}
      >
        {/* Main Badge */}
        <div className="bg-gradient-to-br from-blush via-primary to-peach text-primary-foreground px-6 py-3 rounded-lg shadow-scrapbook border-4 border-white/60">
          <div className="flex items-center gap-2 font-handwritten text-xl md:text-2xl font-bold">
            <Check className="w-5 h-5 md:w-6 md:h-6" />
            <span>COMPRADO!</span>
            <Heart className="w-4 h-4 md:w-5 md:h-5 animate-heart-beat fill-current" />
          </div>
          {buyerName && (
            <p className="text-center text-sm md:text-base font-hand mt-1 text-primary-foreground/90">
              por {buyerName} 💕
            </p>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
        <div className="absolute -bottom-2 -left-2 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>🎀</div>
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils';
import { Heart, Check, X } from 'lucide-react';

interface PurchasedBadgeProps {
  buyerName?: string;
  className?: string;
  onUnmark?: () => void;
}

export const PurchasedBadge = ({ buyerName, className, onUnmark }: PurchasedBadgeProps) => {
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
        {/* Unmark Button */}
        {onUnmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUnmark();
            }}
            className="absolute -top-3 -right-3 z-30 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center group"
            title="Desmarcar presente"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        )}

        {/* Main Badge */}
        <div className="px-6 py-3 rounded-lg shadow-scrapbook border-4 border-white/60"
             style={{
               background: 'linear-gradient(135deg, #9b8070 0%, #7a6555 100%)',
               color: '#ffffff'
             }}>
          <div className="flex items-center gap-2 font-handwritten text-xl md:text-2xl font-bold">
            <Check className="w-5 h-5 md:w-6 md:h-6" />
            <span>COMPRADO!</span>
            <Heart className="w-4 h-4 md:w-5 md:h-5 animate-heart-beat fill-current" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
        <div className="absolute -bottom-2 -left-2 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>🎀</div>
      </div>
    </div>
  );
};

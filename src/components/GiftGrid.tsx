import { Gift } from '@/types/gift';
import { GiftCard } from './GiftCard';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { HeartDoodle, FlowerDoodle } from './scrapbook/Doodles';

interface GiftGridProps {
  gifts: Gift[];
  loading: boolean;
  error: string | null;
  onSelectGift: (gift: Gift) => void;
  onRetry: () => void;
}

export const GiftGrid = ({ gifts, loading, error, onSelectGift, onRetry }: GiftGridProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <HeartDoodle className="absolute -top-2 -right-2 w-5 h-5 text-blush animate-sparkle" />
        </div>
        <p className="mt-4 font-handwritten text-xl text-kraft animate-pulse">
          Carregando presentes...
        </p>
        <div className="flex gap-2 mt-2">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎁</span>
          <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🏠</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="paper-card rounded-xl p-8 text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="font-handwritten text-2xl text-foreground mb-2">
            Ops! Algo deu errado 🙈
          </h3>
          <p className="font-hand text-kraft mb-4">{error}</p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-hand transition-transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (gifts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <FlowerDoodle className="w-16 h-16 text-mint opacity-50 mb-4" />
        <h3 className="font-handwritten text-2xl text-foreground mb-2">
          Nenhum presente encontrado
        </h3>
        <p className="font-hand text-kraft">
          A lista está vazia por enquanto 🎁
        </p>
      </div>
    );
  }

  // Separate available and purchased gifts
  const availableGifts = gifts.filter(g => !g.comprado);
  const purchasedGifts = gifts.filter(g => g.comprado);

  return (
    <div className="px-4 md:px-6 lg:px-8 pb-12">
      {/* Stats */}
      <div className="flex justify-center gap-4 mb-8">
        <div className="paper-card px-4 py-2 rounded-full text-center">
          <span className="font-handwritten text-lg text-foreground">
            {availableGifts.length} disponíveis
          </span>
          <span className="ml-1">🎁</span>
        </div>
        <div className="paper-card px-4 py-2 rounded-full text-center">
          <span className="font-handwritten text-lg text-foreground">
            {purchasedGifts.length} comprados
          </span>
          <span className="ml-1">💝</span>
        </div>
      </div>

      {/* Available Gifts */}
      {availableGifts.length > 0 && (
        <section className="mb-12">
          <h2 className="font-script text-2xl md:text-3xl text-center text-foreground mb-6 hand-underline inline-block mx-auto w-full">
            <span className="inline-block">Presentes Disponíveis ✨</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {availableGifts.map((gift, index) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                index={index}
                onSelect={onSelectGift}
              />
            ))}
          </div>
        </section>
      )}

      {/* Purchased Gifts */}
      {purchasedGifts.length > 0 && (
        <section>
          <h2 className="font-script text-2xl md:text-3xl text-center text-kraft mb-6">
            Já Presenteados 💕
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {purchasedGifts.map((gift, index) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                index={index + availableGifts.length}
                onSelect={onSelectGift}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

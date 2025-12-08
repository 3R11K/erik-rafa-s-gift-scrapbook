import { useState } from 'react';
import { Gift } from '@/types/gift';
import { cn } from '@/lib/utils';
import { X, AlertTriangle } from 'lucide-react';
import { WashiTape } from './scrapbook/WashiTape';

interface UnmarkGiftModalProps {
  gift: Gift;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (itemName: string, buyerName: string) => Promise<boolean>;
}

export const UnmarkGiftModal = ({ gift, isOpen, onClose, onConfirm }: UnmarkGiftModalProps) => {
  const [buyerName, setBuyerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buyerName.trim()) {
      setError('Por favor, digite seu nome para confirmar 🔒');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const success = await onConfirm(gift.item, buyerName.trim());
    
    if (success) {
      setBuyerName('');
      onClose();
    } else {
      setError('Ops! Algo deu errado. Tente novamente! 🙈');
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={cn(
          'relative w-full max-w-md paper-card rounded-xl p-6 md:p-8 animate-scale-in',
          'border-2 border-kraft/20 shadow-2xl'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner stickers */}
        <div className="absolute -top-3 -left-3 text-3xl drop-shadow-lg animate-wiggle z-30">⚠️</div>
        <div className="absolute -top-3 -right-3 text-3xl drop-shadow-lg animate-wiggle z-30" style={{ animationDelay: '0.5s' }}>🔓</div>
        
        {/* Decorative Tapes */}
        <WashiTape variant="yellow" position="top-left" rotation={-15} length={110} />
        <WashiTape variant="blue" position="top-right" rotation={12} length={110} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-cream hover:bg-blush/30 transition-colors z-10"
        >
          <X className="w-5 h-5 text-kraft" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-3 animate-bounce-soft" />
          <h2 className="font-script text-2xl md:text-3xl text-foreground mb-2">
            Desmarcar Presente
          </h2>
          <p className="font-hand text-kraft text-lg">
            "{gift.item}"
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
          <p className="font-hand text-foreground text-center leading-relaxed">
            Para desmarcar este presente, confirme digitando seu nome abaixo.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block font-handwritten text-lg text-foreground mb-1.5">
              Seu nome (para confirmação) 🔒
            </label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Digite seu nome"
              disabled={isSubmitting}
              className={cn(
                'w-full px-4 py-3 rounded-lg bg-cream/80 border-2 border-kraft/30',
                'font-hand text-lg text-foreground placeholder:text-kraft/50',
                'focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20',
                'transition-all duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 animate-shake">
              <p className="text-destructive text-sm font-hand text-center">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-lg font-handwritten text-lg text-kraft bg-cream hover:bg-kraft/10 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'flex-1 px-4 py-3 rounded-lg font-handwritten text-lg',
                'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
                'text-white shadow-lg hover:shadow-xl',
                'transition-all duration-300 hover:scale-105',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                'flex items-center justify-center gap-2'
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Desmarcando...</span>
                </>
              ) : (
                <>
                  <X className="w-5 h-5" />
                  <span>Desmarcar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

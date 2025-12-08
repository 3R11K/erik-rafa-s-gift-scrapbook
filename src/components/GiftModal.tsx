import { useState } from 'react';
import { Gift, GiftFormData } from '@/types/gift';
import { cn } from '@/lib/utils';
import { X, Heart, Send, Sparkles } from 'lucide-react';
import { WashiTape } from './scrapbook/WashiTape';
import { HeartDoodle, GiftDoodle, FlowerDoodle } from './scrapbook/Doodles';

interface GiftModalProps {
  gift: Gift;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (giftId: number, data: GiftFormData) => Promise<boolean>;
}

export const GiftModal = ({ gift, isOpen, onClose, onSubmit }: GiftModalProps) => {
  const [formData, setFormData] = useState<GiftFormData>({ nome: '', mensagem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      setError('Por favor, digite seu nome 💕');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const success = await onSubmit(gift.id, formData);
    
    if (success) {
      setFormData({ nome: '', mensagem: '' });
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
          'border-4 border-cream shadow-scrapbook'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Tapes */}
        <WashiTape variant="pink" position="top-left" rotation={-15} />
        <WashiTape variant="mint" position="top-right" rotation={12} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-cream hover:bg-blush/30 transition-colors z-10"
        >
          <X className="w-5 h-5 text-kraft" />
        </button>

        {/* Decorative Doodles */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <GiftDoodle className="w-12 h-12 text-blush animate-bounce-soft" />
        </div>
        <div className="absolute -bottom-2 -left-2 opacity-50">
          <FlowerDoodle className="w-8 h-8 text-mint" />
        </div>
        <div className="absolute -bottom-2 -right-2 opacity-50">
          <HeartDoodle className="w-6 h-6 text-blush" />
        </div>

        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h2 className="font-script text-2xl md:text-3xl text-foreground mb-2">
            Quero presentear! 
            <Sparkles className="inline-block w-5 h-5 ml-2 text-peach animate-sparkle" />
          </h2>
          <p className="font-hand text-kraft text-lg">
            "{gift.item}"
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block font-handwritten text-lg text-foreground mb-1.5">
              Seu nome <Heart className="inline w-4 h-4 text-primary" />
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Como você se chama?"
              className={cn(
                'w-full px-4 py-3 rounded-lg bg-cream/80 border-2 border-kraft/30',
                'font-hand text-lg text-foreground placeholder:text-kraft/50',
                'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                'transition-all duration-200'
              )}
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block font-handwritten text-lg text-foreground mb-1.5">
              Mensagem <span className="text-kraft text-base">(opcional)</span>
            </label>
            <textarea
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              placeholder="Deixe um recadinho fofo... 💕"
              rows={3}
              className={cn(
                'w-full px-4 py-3 rounded-lg bg-cream/80 border-2 border-kraft/30',
                'font-hand text-lg text-foreground placeholder:text-kraft/50',
                'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                'transition-all duration-200 resize-none'
              )}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center font-hand text-destructive animate-wiggle">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full py-3 px-6 rounded-full font-handwritten text-xl',
              'bg-gradient-to-r from-primary via-blush to-peach text-primary-foreground',
              'shadow-sticker hover:shadow-scrapbook',
              'transition-all duration-300 hover:scale-[1.02]',
              'flex items-center justify-center gap-2',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Confirmar Presente
                <Heart className="w-5 h-5 animate-heart-beat" />
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center mt-4 font-hand text-sm text-kraft">
          Erik & Rafa agradecem muito! 🏠✨
        </p>
      </div>
    </div>
  );
};

import { useState, useCallback } from 'react';
import { Gift, GiftFormData } from '@/types/gift';
import { useGifts } from '@/hooks/useGifts';
import { Header } from '@/components/Header';
import { GiftGrid } from '@/components/GiftGrid';
import { GiftModal } from '@/components/GiftModal';
import { UnmarkGiftModal } from '@/components/UnmarkGiftModal';
import { Toast } from '@/components/Toast';
import { Footer } from '@/components/Footer';
import { BackgroundCollage } from '@/components/BackgroundCollage';

const Index = () => {
  const { gifts, loading, error, refetch, markAsGifted, unmarkGift } = useGifts();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giftToUnmark, setGiftToUnmark] = useState<Gift | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const handleSelectGift = useCallback((gift: Gift) => {
    if (!gift.comprado) {
      setSelectedGift(gift);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedGift(null);
  }, []);

  const handleSubmitGift = useCallback(async (itemName: string, data: GiftFormData) => {
    const success = await markAsGifted(itemName, data);
    
    if (success) {
      setToast({
        message: `Presente registrado com sucesso! 🎁`,
        type: 'success',
        visible: true,
      });
    } else {
      setToast({
        message: 'Não foi possível registrar o presente. Tente novamente!',
        type: 'error',
        visible: true,
      });
    }
    
    return success;
  }, [markAsGifted]);

  const handleUnmarkGift = useCallback((gift: Gift) => {
    setGiftToUnmark(gift);
  }, []);

  const handleConfirmUnmark = useCallback(async (itemName: string, buyerName: string): Promise<boolean> => {
    const success = await unmarkGift(itemName, buyerName);
    
    if (success) {
      setToast({
        message: `Presente desmarcado com sucesso!`,
        type: 'success',
        visible: true,
      });
      setGiftToUnmark(null);
    } else {
      setToast({
        message: 'Não foi possível desmarcar o presente. Verifique o nome e tente novamente!',
        type: 'error',
        visible: true,
      });
    }
    
    return success;
  }, [unmarkGift]);

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* SEO Meta */}
      <title>Chá de Casa Nova — Erik & Rafa</title>
      
      {/* Background Collage with Couple Photos */}
      <BackgroundCollage />
      
      {/* Decorative background elements - Subtle */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-10 text-5xl opacity-5 animate-float">🎁</div>
        <div className="absolute bottom-20 left-10 text-5xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>🏡</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-5 animate-float" style={{ animationDelay: '2s' }}>💖</div>
      </div>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <GiftGrid 
          gifts={gifts}
          loading={loading}
          error={error}
          onSelectGift={handleSelectGift}
          onRetry={refetch}
          onUnmarkGift={handleUnmarkGift}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Gift Modal */}
      {selectedGift && (
        <GiftModal
          gift={selectedGift}
          isOpen={!!selectedGift}
          onClose={handleCloseModal}
          onSubmit={handleSubmitGift}
        />
      )}

      {/* Unmark Gift Modal */}
      {giftToUnmark && (
        <UnmarkGiftModal
          gift={giftToUnmark}
          isOpen={!!giftToUnmark}
          onClose={() => setGiftToUnmark(null)}
          onConfirm={handleConfirmUnmark}
        />
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Index;

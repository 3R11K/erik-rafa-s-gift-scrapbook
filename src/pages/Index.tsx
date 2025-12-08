import { useState, useCallback } from 'react';
import { Gift, GiftFormData } from '@/types/gift';
import { useGifts } from '@/hooks/useGifts';
import { Header } from '@/components/Header';
import { GiftGrid } from '@/components/GiftGrid';
import { GiftModal } from '@/components/GiftModal';
import { Toast } from '@/components/Toast';
import { Footer } from '@/components/Footer';

const Index = () => {
  const { gifts, loading, error, refetch, markAsGifted } = useGifts();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
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

  const handleSubmitGift = useCallback(async (giftId: number, data: GiftFormData) => {
    const success = await markAsGifted(giftId, data);
    
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

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta */}
      <title>Chá de Casa Nova — Erik & Rafa</title>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <GiftGrid 
          gifts={gifts}
          loading={loading}
          error={error}
          onSelectGift={handleSelectGift}
          onRetry={refetch}
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

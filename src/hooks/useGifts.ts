import { useState, useEffect, useCallback } from 'react';
import { Gift, ApiGift, GiftFormData } from '@/types/gift';
import { scrapeImageFromUrl } from '@/utils/imageScaper';

const API_URL = 'https://script.google.com/macros/s/AKfycbx2yGugXwj3oLPz_ztDIqGKOCroF9sRNYGgitrOFDfjF75MyutbXN51EocDjP_A4xRy/exec';

const transformApiGift = (apiGift: ApiGift): Gift => ({
  id: apiGift.ID,
  item: apiGift.Item,
  url: apiGift.URL,
  porQuem: apiGift["Por quem?"] || '',
  mensagem: apiGift.Mensagem || '',
  comprado: apiGift.Comprado?.toLowerCase() === 'sim',
});

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Não foi possível carregar a lista de presentes');
      }
      
      const data: ApiGift[] = await response.json();
      
      // Transform and add images
      const transformedGifts = await Promise.all(
        data.map(async (apiGift, index) => {
          const gift = transformApiGift(apiGift);
          const imageUrl = await scrapeImageFromUrl(gift.url, index);
          return { ...gift, imageUrl };
        })
      );
      
      setGifts(transformedGifts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar presentes');
      console.error('Error fetching gifts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsGifted = async (giftId: number, formData: GiftFormData): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          id: giftId,
          porQuem: formData.nome,
          mensagem: formData.mensagem,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao registrar presente');
      }
      
      // Update local state optimistically
      setGifts(prevGifts => 
        prevGifts.map(gift => 
          gift.id === giftId 
            ? { 
                ...gift, 
                comprado: true, 
                porQuem: formData.nome, 
                mensagem: formData.mensagem 
              }
            : gift
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error marking gift:', err);
      // Refresh the list to get current state
      await fetchGifts();
      return false;
    }
  };

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  return {
    gifts,
    loading,
    error,
    refetch: fetchGifts,
    markAsGifted,
  };
};

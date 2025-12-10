import { useState, useEffect } from 'react';

// API endpoint que retorna as fotos do Google Drive
const PHOTOS_API = 'https://script.google.com/macros/s/AKfycbyAEPKPl-7_ZGNOk1HPDCkMZ8cfQtDZlAmh-78t0_TA3u1kU5H7kYf22J9pvtB6nr6y/exec';

const CACHE_KEY = 'background-photos-cache';
const CACHE_IDS_KEY = 'background-photos-ids';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 horas

interface DrivePhoto {
  nome: string;
  id: string;
  url: string;
}

interface PhotoPosition {
  top: string;
  left: string;
  rotation: number;
  scale: number;
  delay: number;
  zIndex: number;
}

interface CachedData {
  photos: DrivePhoto[];
  timestamp: number;
}

export const BackgroundCollage = () => {
  const [photos, setPhotos] = useState<DrivePhoto[]>([]);
  const [positions, setPositions] = useState<PhotoPosition[]>([]);

  // Buscar fotos do Google Drive
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Verificar cache primeiro
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedIds = localStorage.getItem(CACHE_IDS_KEY);
        
        if (cachedData && cachedIds) {
          const parsed: CachedData = JSON.parse(cachedData);
          const now = Date.now();
          
          // Se o cache ainda é válido (dentro de 24h)
          if (now - parsed.timestamp < CACHE_DURATION) {
            setPhotos(parsed.photos);
            return;
          }
        }

        // Buscar do servidor
        const response = await fetch(PHOTOS_API);
        const data: DrivePhoto[] = await response.json();
        
        // Extrair IDs atuais
        const currentIds = data.map(p => p.id).sort().join(',');
        
        // Se os IDs são os mesmos do cache, usar cache
        if (cachedIds === currentIds && cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          setPhotos(parsed.photos);
          
          // Atualizar timestamp do cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            photos: parsed.photos,
            timestamp: Date.now()
          }));
          return;
        }
        
        // Pegar apenas 6-7 fotos aleatórias para não poluir
        const shuffled = data.sort(() => Math.random() - 0.5);
        const selectedPhotos = shuffled.slice(0, shuffled.length > 7 ? 7 : 6);
        
        // Adicionar proxy CORS para as URLs das imagens
        const photosWithProxy = selectedPhotos.map(photo => ({
          ...photo,
          url: `https://images.weserv.nl/?url=${encodeURIComponent(photo.url)}`
        }));
        
        // Salvar no cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          photos: photosWithProxy,
          timestamp: Date.now()
        }));
        localStorage.setItem(CACHE_IDS_KEY, currentIds);
        
        setPhotos(photosWithProxy);
      } catch (error) {
        console.error('Erro ao carregar fotos do Drive:', error);
        
        // Em caso de erro, tentar usar cache mesmo que expirado
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          setPhotos(parsed.photos);
        }
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;

    // Generate random positions for each photo
    const newPositions = photos.map((_, index) => {
      // Define positions espalhadas pela tela
      const positions = [
        { top: '5%', left: '5%' },
        { top: '10%', left: '80%' },
        { top: '70%', left: '10%' },
        { top: '60%', left: '85%' },
        { top: '40%', left: '5%' },
        { top: '25%', left: '88%' },
        { top: '15%', left: '50%' },
        { top: '75%', left: '60%' },
        { top: '50%', left: '15%' },
        { top: '30%', left: '75%' },
        { top: '80%', left: '40%' },
        { top: '20%', left: '30%' },
        { top: '65%', left: '50%' },
      ];

      const position = positions[index % positions.length] || { top: '50%', left: '50%' };

      return {
        ...position,
        rotation: Math.random() * 40 - 20, // -20 to 20 degrees
        scale: 0.7 + Math.random() * 0.4, // 0.7 to 1.1
        delay: index * 0.3,
        zIndex: Math.floor(Math.random() * 3),
      };
    });

    setPositions(newPositions);
  }, [photos]);

  if (photos.length === 0) {
    return null; // Don't render if no photos are loaded
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {photos.map((photo, index) => {
        const pos = positions[index];
        if (!pos) return null;

        return (
          <div
            key={photo.id}
            className="absolute transition-all duration-700 ease-out hover:scale-110 hover:opacity-20"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
              zIndex: pos.zIndex,
              animationDelay: `${pos.delay}s`,
            }}
          >
            {/* Polaroid frame effect */}
            <div className="relative animate-float">
              {/* Photo container with white border (Polaroid style) */}
              <div className="bg-white p-3 pb-8 shadow-2xl rounded-sm">
                {/* Photo */}
                <div className="w-48 h-48 overflow-hidden bg-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.nome}
                    className="w-full h-full object-cover opacity-[0.15] grayscale-[0.4] sepia-[0.1]"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Erro ao carregar foto:', photo.nome);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Washi tape overlay (rose, brown, green) */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 opacity-30"
                style={{
                  background: `linear-gradient(135deg, 
                    ${['#d4a5a5', '#a3b89a', '#a88a6f', '#dfc0c0', '#94a085'][index % 5]} 0%, 
                    ${['#ddb3b3', '#b0c4a8', '#b5987e', '#e8cdcd', '#a1ad93'][index % 5]} 100%)`,
                  transform: 'rotate(-3deg)',
                }}
              />

              {/* Shadow underneath */}
              <div className="absolute inset-0 -z-10 bg-black opacity-10 blur-md transform translate-y-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

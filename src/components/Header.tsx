import { Home, Heart, Sparkles, Star, Gift } from 'lucide-react';
import { WashiTape } from './scrapbook/WashiTape';

export const Header = () => {
  return (
    <header className="relative py-6 md:py-10 px-4 overflow-hidden">
      {/* Elegant washi tapes - Rose, Brown & Green */}
      <div className="washi-tape-rose top-0 left-0 right-0 h-7 rotate-[-1deg]" />
      <div className="washi-tape-sage bottom-0 left-0 right-0 h-6 rotate-[1deg]" />
      <div className="washi-tape-brown top-10 left-1/4 w-28 rotate-[88deg] z-0 md:z-20" />
      <div className="washi-tape-blush top-10 right-1/4 w-24 rotate-[-85deg] z-0 md:z-20" />
      
      {/* Scrapbook page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-vintage-cream/40 via-transparent to-transparent" />
      
      {/* Background Decorations - Subtle & Elegant */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Minimal decorative elements */}
        <div className="absolute top-8 left-8 md:left-16 opacity-15 text-2xl">🌿</div>
        <div className="absolute top-10 right-10 md:right-20 opacity-12 text-xl">🌹</div>
        <div className="absolute bottom-10 left-20 md:left-36 opacity-15 text-2xl">🏡</div>
        <div className="absolute bottom-14 right-16 md:right-28 opacity-12 text-xl">🎁</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">\n        {/* Top Badge - Rose, Brown & Green */}
        <div className="flex justify-center mb-6 relative z-20 gap-3">
          <div className="inline-block px-4 py-2 rounded-full font-semibold text-sm md:text-base shadow-lg transform -rotate-2"
               style={{ 
                 background: 'linear-gradient(145deg, #d4a5a5 0%, #ddb3b3 100%)',
                 color: '#fff'
               }}>
            <Home className="inline w-3.5 h-3.5 mr-1.5" />
            Nosso Lar
          </div>
          <div className="inline-block px-4 py-2 rounded-full font-semibold text-sm md:text-base shadow-lg transform rotate-1"
               style={{ 
                 background: 'linear-gradient(145deg, #a3b89a 0%, #b0c4a8 100%)',
                 color: '#fff'
               }}>
            <Heart className="inline w-3.5 h-3.5 mr-1.5 fill-current" />
            2025
          </div>
        </div>

        {/* Main Title - Elegant */}
        <div className="relative inline-block mb-4">
          <h1 className="font-script text-5xl md:text-6xl lg:text-7xl leading-tight"
              style={{ 
                color: '#9b8070',
                textShadow: '2px 2px 4px rgba(0,0,0,0.08)'
              }}>
            Chá de Casa Nova
          </h1>
          {/* Decorative doodle under title - natural */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4">
            <svg className="w-full h-8" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path 
                d="M5,15 Q50,7 100,13 T195,11" 
                stroke="#d4a5a5" 
                fill="none" 
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Names with hearts - Natural & Elegant */}
        <div className="flex items-center justify-center gap-4 mb-6 mt-6">
          <div className="relative group">
            <span className="font-handwritten text-3xl md:text-4xl font-bold"
                  style={{ 
                    color: '#8B7355',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
              Erik
            </span>
            <div className="absolute -top-2 -right-3 text-lg opacity-60">🤎</div>
          </div>
          <div className="animate-heart-beat">
            <Heart className="w-8 h-8 md:w-10 md:h-10 fill-current" 
                   style={{ color: '#c87456' }} />
          </div>
          <div className="relative group">
            <span className="font-handwritten text-3xl md:text-4xl font-bold"
                  style={{ 
                    color: '#8B7355',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
              Rafa
            </span>
            <div className="absolute -top-2 -left-3 text-lg opacity-60">🤎</div>
          </div>
        </div>

        {/* Subtitle - Natural Card */}
        <div className="relative max-w-xl mx-auto mb-6">
          <div className="absolute inset-0 bg-white/40 rounded-xl transform rotate-1 shadow-md" />
          <div className="relative backdrop-blur-sm rounded-xl p-4 md:p-5 border border-warm-beige/30 shadow-lg"
               style={{ background: 'rgba(253, 250, 246, 0.85)' }}>
            <p className="font-hand text-lg md:text-xl leading-relaxed font-medium"
               style={{ color: '#6b5d52' }}>
              Escolha um presentinho especial para ajudar a montar nosso novo lar 
              <span className="inline-block ml-2 opacity-70">🏡</span>
            </p>
          </div>
        </div>

        {/* Bottom Decoration - Minimal */}
        <div className="flex justify-center items-center gap-3 mt-6 flex-wrap opacity-40">
          <span className="text-xl hover:scale-110 transition-transform cursor-default">🏡</span>
          <span className="text-lg">🌿</span>
          <span className="text-xl hover:scale-110 transition-transform cursor-default">🌹</span>
          <span className="text-lg">🎁</span>
        </div>
      </div>

      {/* Bottom torn paper edge effect */}
      <div className="absolute bottom-0 left-0 right-0 h-6">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
          <path 
            d="M0,0 L0,8 Q2,5 4,8 T8,8 Q10,6 12,8 T16,8 Q18,5 20,8 T24,8 Q26,6 28,8 T32,8 Q34,5 36,8 T40,8 Q42,6 44,8 T48,8 Q50,5 52,8 T56,8 Q58,6 60,8 T64,8 Q66,5 68,8 T72,8 Q74,6 76,8 T80,8 Q82,5 84,8 T88,8 Q90,6 92,8 T96,8 Q98,5 100,8 L100,0 Z" 
            fill="url(#paperGradient)"
          />
          <defs>
            <linearGradient id="paperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fdfbf7', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </header>
  );
};

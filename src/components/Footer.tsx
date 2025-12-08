import { Heart, Home } from 'lucide-react';
import { HeartDoodle } from './scrapbook/Doodles';

export const Footer = () => {
  return (
    <footer className="relative py-10 px-4 mt-12 overflow-hidden">
      {/* Torn paper top edge */}
      <div className="absolute top-0 left-0 right-0 h-6">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
          <path 
            d="M0,10 L0,2 Q2,5 4,2 T8,2 Q10,4 12,2 T16,2 Q18,5 20,2 T24,2 Q26,4 28,2 T32,2 Q34,5 36,2 T40,2 Q42,4 44,2 T48,2 Q50,5 52,2 T56,2 Q58,4 60,2 T64,2 Q66,5 68,2 T72,2 Q74,4 76,2 T80,2 Q82,5 84,2 T88,2 Q90,4 92,2 T96,2 Q98,5 100,2 L100,10 Z" 
            fill="url(#footerGradient)"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: '#fdfbf7', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper/40 to-transparent" />
      
      {/* Decorative scattered elements */}
      <div className="absolute top-4 left-8 text-2xl opacity-20 animate-float">💕</div>
      <div className="absolute top-6 right-12 text-2xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-8 left-1/4 text-2xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
      
      <div className="relative text-center max-w-lg mx-auto">
        {/* Decorative stickers */}
        <div className="flex justify-center gap-3 mb-6">
          <span className="text-2xl drop-shadow-md hover:scale-125 transition-transform cursor-default">🏠</span>
          <span className="text-xl drop-shadow-md hover:scale-125 transition-transform cursor-default">💕</span>
          <span className="text-2xl drop-shadow-md hover:scale-125 transition-transform cursor-default">🎁</span>
        </div>

        {/* Message with handwritten style */}
        <div className="relative inline-block mb-4">
          <p className="font-script text-3xl text-foreground mb-1 drop-shadow-sm">
            Feito com muito amor
          </p>
          {/* Decorative underline */}
          <svg className="w-full h-4 absolute -bottom-1 left-0" viewBox="0 0 200 10" preserveAspectRatio="none">
            <path 
              d="M5,5 Q50,2 100,5 T195,5" 
              stroke="#ffc9d4" 
              fill="none" 
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
        
        {/* Info box */}
        <div className="inline-block bg-white/40 backdrop-blur-sm rounded-lg px-5 py-3 border border-kraft/10 shadow-sm">
          <div className="flex items-center justify-center gap-2 font-hand text-base text-kraft">
            <Home className="w-4 h-4" />
            <span className="font-handwritten text-lg">Erik & Rafa</span>
            <Heart className="w-5 h-5 text-blush fill-current animate-heart-beat" />
            <span className="font-handwritten text-lg">2025</span>
          </div>
        </div>

        {/* Decorative wavy line */}
        <svg className="w-40 h-4 mx-auto mt-6 opacity-30" viewBox="0 0 150 15">
          <path 
            d="M5,7 Q40,3 75,7 T145,7" 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2"
            strokeLinecap="round"
            className="text-kraft"
          />
        </svg>
      </div>
    </footer>
  );
};

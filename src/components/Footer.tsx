import { Heart, Home } from 'lucide-react';
import { HeartDoodle } from './scrapbook/Doodles';

export const Footer = () => {
  return (
    <footer className="relative py-8 px-4 mt-8">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kraft/30 to-transparent" />
      
      <div className="text-center">
        {/* Decorative elements */}
        <div className="flex justify-center gap-2 mb-4">
          <span className="text-xl opacity-70">🏠</span>
          <HeartDoodle className="w-5 h-5 text-blush animate-float" />
          <span className="text-xl opacity-70">🎁</span>
        </div>

        {/* Message */}
        <p className="font-handwritten text-xl text-kraft mb-2">
          Feito com muito amor para vocês!
        </p>
        
        <div className="flex items-center justify-center gap-1 font-hand text-sm text-kraft/70">
          <Home className="w-4 h-4" />
          <span>Erik & Rafa</span>
          <Heart className="w-4 h-4 text-blush fill-current" />
          <span>2024</span>
        </div>

        {/* Decorative line */}
        <svg className="w-32 h-3 mx-auto mt-4 opacity-40" viewBox="0 0 100 10">
          <path 
            d="M5,5 Q25,2 50,5 T95,5" 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-kraft"
          />
        </svg>
      </div>
    </footer>
  );
};

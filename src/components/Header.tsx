import { Home, Heart, Sparkles } from 'lucide-react';
import { HouseDoodle, HeartDoodle, FlowerDoodle, StarDoodle, GiftDoodle } from './scrapbook/Doodles';
import { Sticker } from './scrapbook/Sticker';

export const Header = () => {
  return (
    <header className="relative py-8 md:py-12 px-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scattered Doodles */}
        <div className="absolute top-4 left-4 md:left-12 opacity-40 animate-float">
          <HeartDoodle className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="absolute top-8 right-8 md:right-20 opacity-40 animate-float" style={{ animationDelay: '0.5s' }}>
          <StarDoodle className="w-5 h-5 md:w-7 md:h-7" />
        </div>
        <div className="absolute bottom-4 left-12 md:left-32 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <FlowerDoodle className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="absolute bottom-6 right-6 md:right-24 opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>
          <GiftDoodle className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="absolute top-1/2 left-6 opacity-20 hidden md:block">
          <span className="text-4xl">🏠</span>
        </div>
        <div className="absolute top-1/2 right-6 opacity-20 hidden md:block">
          <span className="text-4xl">🎁</span>
        </div>

        {/* Decorative Lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,20 Q25,10 50,20 T100,20" stroke="currentColor" fill="none" strokeWidth="0.3" className="text-kraft"/>
          <path d="M0,80 Q30,90 60,80 T100,85" stroke="currentColor" fill="none" strokeWidth="0.3" className="text-kraft"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Top Sticker */}
        <div className="flex justify-center mb-4">
          <Sticker variant="mint" size="lg" className="animate-wiggle">
            <Home className="w-4 h-4" />
            Nova Casa!
          </Sticker>
        </div>

        {/* Main Title */}
        <h1 className="font-script text-4xl md:text-6xl lg:text-7xl text-foreground mb-2 leading-tight">
          Chá de Casa Nova
        </h1>

        {/* Names */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="font-handwritten text-2xl md:text-4xl text-primary">Erik</span>
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-blush animate-heart-beat fill-current" />
          <span className="font-handwritten text-2xl md:text-4xl text-primary">Rafa</span>
        </div>

        {/* Decorative Underline */}
        <div className="flex justify-center mb-4">
          <svg className="w-48 md:w-64 h-4" viewBox="0 0 200 15">
            <path 
              d="M5,10 Q50,2 100,10 T195,8" 
              stroke="hsl(var(--blush))" 
              fill="none" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="font-hand text-lg md:text-xl text-kraft max-w-md mx-auto">
          Escolha um presentinho especial para ajudar a montar nosso novo lar! 
          <Sparkles className="inline w-4 h-4 ml-1 text-peach" />
        </p>

        {/* Bottom Decoration */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="text-2xl">🏠</span>
          <span className="text-xl opacity-60">✨</span>
          <span className="text-xl">💕</span>
          <span className="text-xl opacity-60">✨</span>
          <span className="text-2xl">🎁</span>
        </div>
      </div>

      {/* Bottom Paper Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-background" />
    </header>
  );
};

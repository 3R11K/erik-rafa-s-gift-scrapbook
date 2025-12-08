import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StickerProps {
  children: ReactNode;
  variant?: 'pink' | 'mint' | 'blue' | 'lavender';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Sticker = ({ 
  children, 
  variant = 'pink',
  size = 'md',
  className 
}: StickerProps) => {
  const variantClasses = {
    pink: 'bg-gradient-to-br from-blush to-peach text-foreground',
    mint: 'bg-gradient-to-br from-mint to-secondary text-secondary-foreground',
    blue: 'bg-gradient-to-br from-sky to-accent text-accent-foreground',
    lavender: 'bg-gradient-to-br from-lavender to-blush text-foreground',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-hand font-bold shadow-sticker',
        'border-2 border-white/50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

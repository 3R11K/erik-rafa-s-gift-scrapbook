import { cn } from '@/lib/utils';

interface DoodleProps {
  className?: string;
}

export const HeartDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-6 h-6 text-primary', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21C12 21 3 14.5 3 8.5C3 5.5 5.5 3 8.5 3C10.5 3 12 4.5 12 4.5C12 4.5 13.5 3 15.5 3C18.5 3 21 5.5 21 8.5C21 14.5 12 21 12 21Z" />
  </svg>
);

export const StarDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-6 h-6 text-peach', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
  </svg>
);

export const FlowerDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-8 h-8 text-mint', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2C12 2 14 6 12 9" />
    <path d="M12 15C12 18 12 22 12 22" />
    <path d="M2 12C6 12 9 12 9 12" />
    <path d="M15 12C18 12 22 12 22 12" />
    <path d="M4.93 4.93C7.5 7.5 9.5 9.5 9.5 9.5" />
    <path d="M14.5 14.5C17 17 19.07 19.07 19.07 19.07" />
    <path d="M4.93 19.07C7.5 16.5 9.5 14.5 9.5 14.5" />
    <path d="M14.5 9.5C17 7 19.07 4.93 19.07 4.93" />
  </svg>
);

export const HouseDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 32 32" 
    className={cn('w-10 h-10 text-kraft', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 14L16 4L27 14" />
    <path d="M7 13V27H25V13" />
    <path d="M13 27V19H19V27" />
    <path d="M11 10L11 6H15" />
    <circle cx="20" cy="17" r="2" />
  </svg>
);

export const GiftDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-8 h-8 text-blush', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="8" width="18" height="14" rx="1" />
    <path d="M12 8V22" />
    <path d="M3 12H21" />
    <path d="M12 8C12 8 8 8 6 5C4 2 8 1 10 3C12 5 12 8 12 8Z" />
    <path d="M12 8C12 8 16 8 18 5C20 2 16 1 14 3C12 5 12 8 12 8Z" />
  </svg>
);

export const SparklesDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-6 h-6 text-sky', className)}
    fill="currentColor"
  >
    <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
  </svg>
);

export const ArrowDoodle = ({ className }: DoodleProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={cn('w-8 h-8 text-kraft', className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12C4 12 8 8 12 12C16 16 20 12 20 12" />
    <path d="M16 8L20 12L16 16" />
  </svg>
);

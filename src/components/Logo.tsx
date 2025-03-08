
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg 
        className={cn('text-primary', sizeClasses[size])} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" 
          fill="currentColor" 
          fillOpacity="0.1"
        />
        <path 
          d="M32 12C20.954 12 12 20.954 12 32C12 43.046 20.954 52 32 52C43.046 52 52 43.046 52 32C52 20.954 43.046 12 32 12Z" 
          fill="currentColor" 
          fillOpacity="0.2"
        />
        <path 
          d="M38 24H26C24.895 24 24 24.895 24 26V38C24 39.105 24.895 40 26 40H38C39.105 40 40 39.105 40 38V26C40 24.895 39.105 24 38 24Z" 
          fill="currentColor"
        />
        <path 
          d="M46 18H18C16.895 18 16 18.895 16 20V44C16 45.105 16.895 46 18 46H46C47.105 46 48 45.105 48 44V20C48 18.895 47.105 18 46 18Z" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M16 28H48" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M24 18V46" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn('font-bold text-foreground', {
        'text-lg': size === 'sm',
        'text-2xl': size === 'md',
        'text-3xl': size === 'lg',
      })}>
        StayFlow
      </span>
    </div>
  );
};

export default Logo;

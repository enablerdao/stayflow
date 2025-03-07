
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getDirectionStyles = () => {
    const baseStyles = {
      opacity: 0,
      transform: 'translate(0, 0)',
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      switch (direction) {
        case 'up':
          return { ...baseStyles, transform: 'translateY(20px)' };
        case 'down':
          return { ...baseStyles, transform: 'translateY(-20px)' };
        case 'left':
          return { ...baseStyles, transform: 'translateX(20px)' };
        case 'right':
          return { ...baseStyles, transform: 'translateX(-20px)' };
        case 'none':
          return { ...baseStyles };
        default:
          return { ...baseStyles };
      }
    }

    return {
      opacity: 1,
      transform: 'translate(0, 0)',
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };
  };

  return (
    <div ref={ref} className={cn(className)} style={getDirectionStyles()}>
      {children}
    </div>
  );
};

export default FadeIn;

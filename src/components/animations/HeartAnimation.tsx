
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartProps {
  size: number;
  color: string;
  left: string;
  animationDuration: number;
}

const HeartAnimation = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    // Create 15 random hearts
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      size: Math.random() * 20 + 10,
      color: getRandomColor(),
      left: `${Math.random() * 100}%`,
      animationDuration: Math.random() * 3 + 2,
    }));
    
    setHearts(newHearts);
    
    // Clean up hearts after animation is complete
    const timer = setTimeout(() => {
      setHearts([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const getRandomColor = () => {
    const colors = [
      'text-red-400', 'text-red-500', 'text-pink-400', 
      'text-pink-500', 'text-rose-400', 'text-rose-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, index) => (
        <div
          key={index}
          className="absolute bottom-0 animate-float"
          style={{
            left: heart.left,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <Heart 
            className={`${heart.color} animate-pulse-subtle`}
            fill="currentColor"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default HeartAnimation;

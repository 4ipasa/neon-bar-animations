
import React, { useEffect, useRef } from 'react';

export const useRevealAnimation = () => {
  const revealRefs = useRef<HTMLElement[]>([]);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    revealRefs.current.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    
    return () => {
      revealRefs.current.forEach((el) => observer.unobserve(el));
    };
  }, [revealRefs]);
  
  return { addToRefs };
};

export const NeonGlow: React.FC<{ 
  className?: string; 
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'pink';
}> = ({ className = '', children, color = 'blue' }) => {
  const colorMap = {
    blue: 'rgba(0, 255, 255, 0.7)',
    purple: 'rgba(138, 43, 226, 0.7)',
    pink: 'rgba(255, 20, 147, 0.7)',
  };
  
  return (
    <div className={`relative ${className}`}>
      {children}
      <div 
        className="absolute -inset-0.5 blur-lg opacity-50 rounded-lg" 
        style={{ backgroundColor: colorMap[color], zIndex: -1 }}
      />
    </div>
  );
};

export const ParallaxBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 -z-10 opacity-30"
      style={{ 
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.4) 0%, transparent 50%)
        ` 
      }}
    />
  );
};

export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-gradient bg-[length:200%_auto] ${className}`}>
      {children}
    </span>
  );
};

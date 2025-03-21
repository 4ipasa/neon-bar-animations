
import React, { useEffect, useRef } from 'react';
import { Martini, Clock, MapPin } from 'lucide-react';
import { NeonGlow, useRevealAnimation, GradientText } from './Animations';

const HeroSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Dark Overlay */}
      <div className="absolute inset-0 bg-bar-black/70 z-10"></div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
        poster="https://images.unsplash.com/photo-1551978256-3f0899a51d6d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        <source
          src="https://player.vimeo.com/external/460431680.sd.mp4?s=18e7517aba596c3cb8efeeb4ca65f03b26dec87e&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <div className="container relative z-20 px-6 md:px-12 pt-24 pb-12 flex flex-col items-center justify-center text-center">
        <div ref={(el) => addToRefs(el as HTMLElement)} className="delay-100">
          <h3 className="text-white/80 uppercase tracking-[0.2em] mb-4 text-sm md:text-base">Premium Cocktail Experience</h3>
        </div>
        
        <div ref={(el) => addToRefs(el as HTMLElement)} className="delay-300">
          <h1 className="mb-6 md:mb-8 text-5xl md:text-7xl font-bold leading-tight">
            Discover the Art of <br />
            <GradientText>Mixology</GradientText>
          </h1>
        </div>
        
        <div ref={(el) => addToRefs(el as HTMLElement)} className="delay-500">
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 md:mb-12">
            Immerse yourself in a world of exquisite flavors and craftsmanship at our premium cocktail destination
          </p>
        </div>
        
        <div ref={(el) => addToRefs(el as HTMLElement)} className="delay-700">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <NeonGlow color="blue">
              <a 
                href="#menu" 
                className="px-6 py-3 md:px-8 md:py-4 bg-bar-black border border-neon-blue/30 rounded-md text-white hover:bg-neon-blue/10 transition-all duration-300 text-sm md:text-base uppercase tracking-wider font-medium"
              >
                Explore Our Menu
              </a>
            </NeonGlow>
            <a 
              href="#contact" 
              className="px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white/30 rounded-md text-white hover:bg-white/10 transition-all duration-300 text-sm md:text-base uppercase tracking-wider font-medium"
            >
              Reserve a Table
            </a>
          </div>
        </div>
        
        {/* Info Cards */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { icon: <Martini className="text-neon-blue" size={24} />, title: "Craft Cocktails", desc: "Expertly crafted signature drinks" },
            { icon: <Clock className="text-neon-purple" size={24} />, title: "Happy Hours", desc: "Tue-Fri, 5PM - 8PM" },
            { icon: <MapPin className="text-neon-pink" size={24} />, title: "Find Us", desc: "123 Nightlife Street" }
          ].map((item, index) => (
            <div 
              key={index}
              ref={(el) => addToRefs(el as HTMLElement)} 
              className={`glass-card p-6 flex flex-col items-center text-center delay-${700 + (index * 100)}`}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-medium mb-1">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-white/50 text-xs mb-2 uppercase tracking-wider">Scroll</span>
        <div className="w-5 h-10 border border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

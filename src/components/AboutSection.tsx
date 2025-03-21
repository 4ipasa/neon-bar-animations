
import React from 'react';
import { Cocktail, Award, Music } from 'lucide-react';
import { useRevealAnimation, GradientText } from './Animations';

const AboutSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();

  return (
    <section id="about" className="section-padding bg-bar-darker relative">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:order-2">
            <div ref={(el) => addToRefs(el as HTMLElement)}>
              <p className="text-white/60 uppercase tracking-wider mb-3">Our Story</p>
            </div>
            
            <div ref={(el) => addToRefs(el as HTMLElement)}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The <GradientText>Art</GradientText> of Perfect Cocktails
              </h2>
            </div>
            
            <div ref={(el) => addToRefs(el as HTMLElement)}>
              <p className="text-white/70 mb-6 leading-relaxed">
                Founded in 2015, Neon Bar has established itself as a premier destination for cocktail enthusiasts and connoisseurs. What started as a passion project of two mixologists has evolved into one of the city's most vibrant nightlife spots.
              </p>
            </div>
            
            <div ref={(el) => addToRefs(el as HTMLElement)}>
              <p className="text-white/70 mb-8 leading-relaxed">
                Our master mixologists blend traditional techniques with innovative approaches, creating signature cocktails that are as visually stunning as they are delicious. We source only the finest spirits and freshest ingredients to ensure an unforgettable experience with every sip.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: <Cocktail size={24} className="text-neon-blue" />, title: "Craft Mixology", desc: "Expertly crafted unique cocktails" },
                { icon: <Award size={24} className="text-neon-purple" />, title: "Award Winning", desc: "Recognized for excellence" },
                { icon: <Music size={24} className="text-neon-pink" />, title: "Live Music", desc: "Weekend performances" }
              ].map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => addToRefs(el as HTMLElement)}
                  className="glass-card p-5 flex flex-col items-center text-center"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-base font-medium mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div ref={(el) => addToRefs(el as HTMLElement)}>
              <a
                href="#contact"
                className="inline-flex items-center text-neon-blue hover:text-neon-purple transition-colors duration-300"
              >
                <span className="mr-2 font-medium">Visit Us Today</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Images Grid */}
          <div className="lg:order-1 grid grid-cols-2 gap-4 h-full">
            <div className="space-y-4">
              <div ref={(el) => addToRefs(el as HTMLElement)} className="overflow-hidden rounded-lg h-64 md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1594650878450-43e357a15d74?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bar interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div ref={(el) => addToRefs(el as HTMLElement)} className="overflow-hidden rounded-lg h-48 md:h-56">
                <img
                  src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Cocktail preparation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div ref={(el) => addToRefs(el as HTMLElement)} className="overflow-hidden rounded-lg h-48 md:h-56">
                <img
                  src="https://images.unsplash.com/photo-1550807014-1236e91b92d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bartender"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div ref={(el) => addToRefs(el as HTMLElement)} className="overflow-hidden rounded-lg h-64 md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Signature cocktail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

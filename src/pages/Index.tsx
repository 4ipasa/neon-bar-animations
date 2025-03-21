
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ParallaxBackground } from '../components/Animations';

const Index = () => {
  // Set body overflow to auto to enable scrolling
  useEffect(() => {
    document.body.style.overflow = 'auto';
    
    // Initialize scroll reveal
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      reveals.forEach((reveal) => {
        const revealTop = (reveal as HTMLElement).getBoundingClientRect().top;
        if (revealTop < windowHeight - 50) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bar-dark text-white overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ParallaxBackground } from '../components/Animations';

const Index = () => {
  // State to force refresh when localStorage changes
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
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
    
    // Monitor localStorage changes
    const handleStorageChange = () => {
      // Check for changes in localStorage directly
      setLastUpdate(Date.now());
    };
    
    // Add event listener for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Set up an interval to check for localStorage changes within the same tab
    const checkInterval = setInterval(() => {
      handleStorageChange();
    }, 2000); // Check every 2 seconds
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bar-dark text-white overflow-x-hidden">
      <ParallaxBackground />
      <Navbar key={`navbar-${lastUpdate}`} />
      <HeroSection key={`hero-${lastUpdate}`} />
      <MenuSection />
      <AboutSection key={`about-${lastUpdate}`} />
      <ContactSection key={`contact-${lastUpdate}`} />
      <Footer key={`footer-${lastUpdate}`} />
    </div>
  );
};

export default Index;

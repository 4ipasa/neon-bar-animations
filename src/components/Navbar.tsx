
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GradientText } from './Animations';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 ${
        isScrolled
          ? 'py-3 bg-bar-black/80 backdrop-blur-md shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="relative z-10">
          <h1 className="text-2xl font-bold">
            <GradientText>NEON</GradientText>
            <span className="ml-1 font-light">BAR</span>
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {['home', 'menu', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white/80 hover:text-neon-blue transition-colors duration-300 uppercase tracking-wider text-sm font-medium"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 bg-bar-light border border-neon-blue/30 rounded-md text-neon-blue hover:bg-neon-blue/10 transition-colors duration-300"
          >
            RESERVE
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-10 md:hidden text-white/80 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-bar-black/95 backdrop-blur-lg md:hidden flex flex-col justify-center items-center gap-10 px-6 py-20 z-0">
          {['home', 'menu', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white/80 hover:text-neon-blue transition-colors duration-300 uppercase tracking-wider text-xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-6 px-8 py-3 bg-bar-light border border-neon-blue/30 rounded-md text-neon-blue hover:bg-neon-blue/10 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            RESERVE NOW
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

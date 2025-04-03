import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { GradientText } from './Animations';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';

// Default site name to use if localStorage doesn't have a value
const DEFAULT_SITE_NAME = "JD Bar";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState(DEFAULT_SITE_NAME);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const isAdmin = localStorage.getItem('adminToken') === 'admin-secret-token';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Load site name from localStorage
    const loadSiteSettings = () => {
      try {
        const siteSettings = localStorage.getItem('siteSettings');
        if (siteSettings) {
          const settings = JSON.parse(siteSettings);
          if (settings.siteName) {
            setSiteName(settings.siteName);
          }
        } else {
          // If no settings exist, save the default
          localStorage.setItem('siteSettings', JSON.stringify({ siteName: DEFAULT_SITE_NAME }));
        }
      } catch (error) {
        console.error("Error loading site settings:", error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    loadSiteSettings(); // Load settings when component mounts
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'siteSettings') {
        loadSiteSettings();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Split site name to apply neon effect only to the first part (JD)
  const nameParts = siteName.split(' ');
  const firstPart = nameParts[0]; // JD
  const restParts = nameParts.slice(1).join(' '); // Bar

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-bar-black bg-opacity-80 backdrop-blur-lg shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="inline-block">
          <h1 className="text-2xl font-bold">
            <GradientText 
              className="text-shadow-neon animate-pulse-neon tracking-tighter 
                         bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink 
                         bg-clip-text text-transparent"
            >
              {firstPart}
            </GradientText>
            {restParts && (
              <span className="ml-1 font-light text-white/80">{restParts}</span>
            )}
          </h1>
        </a>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="flex items-center gap-8">
            <ul className="flex gap-6">
              {[
                { id: 'home', label: t('home') },
                { id: 'menu', label: t('menu') },
                { id: 'about', label: t('about') },
                { id: 'contact', label: t('contact') }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-white/80 hover:text-neon-blue transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  className="flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors duration-300"
                >
                  <Lock size={14} className="mr-1" />
                  {t('admin')}
                </a>
              </li>
            </ul>
            
            <LanguageSelector />

            <a
              href="#contact"
              className="px-5 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-md text-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
            >
              {t('reserve_now')}
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-neon-blue transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 bg-bar-black bg-opacity-95 backdrop-blur-lg transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="container mx-auto px-6 py-20">
            <ul className="flex flex-col gap-6 items-center">
              {[
                { id: 'home', label: t('home') },
                { id: 'menu', label: t('menu') },
                { id: 'about', label: t('about') },
                { id: 'contact', label: t('contact') }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl text-white/80 hover:text-neon-blue transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center text-xl text-neon-blue hover:text-neon-blue/80 transition-colors duration-300"
                >
                  <Lock size={16} className="mr-2" />
                  {t('admin')}
                </a>
              </li>
              <li className="mt-4">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 bg-neon-blue/10 border border-neon-blue/30 rounded-md text-neon-blue hover:bg-neon-blue/20 transition-all duration-300"
                >
                  {t('reserve_now')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

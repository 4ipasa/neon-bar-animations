
import React from 'react';
import { GradientText } from './Animations';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-bar-darker py-16 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-gradient bg-[length:200%_auto]"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <a href="#home" className="inline-block mb-4">
              <h1 className="text-2xl font-bold">
                <GradientText>NEON</GradientText>
                <span className="ml-1 font-light">BAR</span>
              </h1>
            </a>
            <p className="text-white/60 text-sm mb-4">
              {t('premium_experience_desc')}
            </p>
            <div className="flex space-x-4">
              {['instagram', 'facebook', 'twitter'].map((social, index) => (
                <a
                  key={index}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-bar-light flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${social}/ffffff`}
                    alt={social}
                    className="w-4 h-4"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: t('home_link') },
                { id: 'menu', label: t('menu_link') },
                { id: 'about', label: t('about_us') },
                { id: 'contact', label: t('contact_link') },
                { id: 'contact', label: t('reservations') }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.id}`}
                    className="text-white/70 hover:text-neon-blue transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t('contact')}</h4>
            <address className="not-italic text-white/70 text-sm space-y-2">
              <p>123 Nightlife Street</p>
              <p>Downtown, New York</p>
              <p>NY 10001</p>
              <p className="pt-2">+1 (555) 123-4567</p>
              <p>reservations@neonbar.com</p>
            </address>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-medium mb-4">{t('opening_hours')}</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li className="flex justify-between">
                <span>{t('monday')}</span>
                <span>{t('closed')}</span>
              </li>
              <li className="flex justify-between">
                <span>{t('tuesday_thursday')}</span>
                <span>18:00 - 01:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('friday_saturday')}</span>
                <span>18:00 - 03:00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('sunday')}</span>
                <span>18:00 - 00:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>{t('rights_reserved')}</p>
          <p className="mt-2 md:mt-0 flex items-center">
            {t('crafted_with_love')} <Heart size={14} className="mx-1 text-neon-pink" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

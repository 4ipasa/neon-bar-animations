
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

const AdminContent: React.FC = () => {
  const { t, language } = useLanguage();
  
  // State for hero section content
  const [heroContent, setHeroContent] = useState({
    title: "NEON BAR",
    subtitle: "Premium Cocktail Experience",
    description: "Experience the art of mixology in a vibrant atmosphere where every drink tells a story",
    buttonText: "Explore Menu"
  });
  
  // State for about section content
  const [aboutContent, setAboutContent] = useState({
    title: "About Our Bar",
    description: "Founded in 2020, NEON BAR quickly became the city's hotspot for cocktail enthusiasts. Our mixologists craft unique drinks that blend traditional techniques with innovative approaches.",
    showImages: true
  });
  
  // State for contact section content
  const [contactContent, setContactContent] = useState({
    address: "123 Nightlife Avenue, City Center",
    phone: "+1 (555) 123-4567",
    email: "info@neonbar.com",
    hours: "Monday-Sunday: 6 PM - 2 AM"
  });
  
  const handleSaveHero = () => {
    // Here you would typically save to a database or localStorage
    localStorage.setItem('heroContent', JSON.stringify(heroContent));
    toast.success(t('hero_content_saved'));
  };
  
  const handleSaveAbout = () => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    toast.success(t('about_content_saved'));
  };
  
  const handleSaveContact = () => {
    localStorage.setItem('contactContent', JSON.stringify(contactContent));
    toast.success(t('contact_content_saved'));
  };
  
  return (
    <div className="space-y-6">
      {/* Hero Section Content */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('hero_section')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('title')}</label>
            <Input
              value={heroContent.title}
              onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('subtitle')}</label>
            <Input
              value={heroContent.subtitle}
              onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('description')}</label>
            <Textarea
              value={heroContent.description}
              onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
              className="bg-bar-light border-white/10 text-white min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('button_text')}</label>
            <Input
              value={heroContent.buttonText}
              onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div className="pt-2">
            <button
              onClick={handleSaveHero}
              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
            >
              {t('save_changes')}
            </button>
          </div>
        </div>
      </div>
      
      {/* About Section Content */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('about_section')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('title')}</label>
            <Input
              value={aboutContent.title}
              onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('description')}</label>
            <Textarea
              value={aboutContent.description}
              onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
              className="bg-bar-light border-white/10 text-white min-h-24"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={aboutContent.showImages}
              onCheckedChange={(checked) => setAboutContent({...aboutContent, showImages: checked})}
              id="show-images"
            />
            <label htmlFor="show-images" className="text-sm text-white/70">
              {t('show_images')}
            </label>
          </div>
          <div className="pt-2">
            <button
              onClick={handleSaveAbout}
              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
            >
              {t('save_changes')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Section Content */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('contact_section')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('address')}</label>
            <Input
              value={contactContent.address}
              onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('phone')}</label>
            <Input
              value={contactContent.phone}
              onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('email')}</label>
            <Input
              value={contactContent.email}
              onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('hours')}</label>
            <Input
              value={contactContent.hours}
              onChange={(e) => setContactContent({...contactContent, hours: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div className="pt-2">
            <button
              onClick={handleSaveContact}
              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
            >
              {t('save_changes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;

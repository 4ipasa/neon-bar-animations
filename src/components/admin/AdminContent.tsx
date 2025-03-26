
import React, { useState, useEffect } from 'react';
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
    hours: {
      monday: { isOpen: false, start: "18:00", end: "01:00" },
      tuesday: { isOpen: true, start: "18:00", end: "01:00" },
      wednesday: { isOpen: true, start: "18:00", end: "01:00" },
      thursday: { isOpen: true, start: "18:00", end: "01:00" },
      friday: { isOpen: true, start: "18:00", end: "03:00" },
      saturday: { isOpen: true, start: "18:00", end: "03:00" },
      sunday: { isOpen: true, start: "18:00", end: "00:00" }
    }
  });

  // Load stored data on component mount
  useEffect(() => {
    const storedHeroContent = localStorage.getItem('heroContent');
    if (storedHeroContent) {
      setHeroContent(JSON.parse(storedHeroContent));
    }

    const storedAboutContent = localStorage.getItem('aboutContent');
    if (storedAboutContent) {
      setAboutContent(JSON.parse(storedAboutContent));
    }

    const storedContactContent = localStorage.getItem('contactContent');
    if (storedContactContent) {
      setContactContent(JSON.parse(storedContactContent));
    }
  }, []);
  
  const handleSaveHero = () => {
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

  const handleHoursChange = (day: string, field: 'isOpen' | 'start' | 'end', value: string | boolean) => {
    setContactContent({
      ...contactContent,
      hours: {
        ...contactContent.hours,
        [day]: {
          ...contactContent.hours[day as keyof typeof contactContent.hours],
          [field]: value
        }
      }
    });
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
          
          {/* Working Hours Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">{t('opening_hours')}</h3>
            <div className="space-y-3 bg-bar-black/30 p-4 rounded-md">
              {/* Monday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('monday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.monday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('monday', 'isOpen', checked)}
                    id="monday-open"
                  />
                  <label htmlFor="monday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.monday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.monday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.monday.start}
                        onChange={(e) => handleHoursChange('monday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.monday.end}
                        onChange={(e) => handleHoursChange('monday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Tuesday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('tuesday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.tuesday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('tuesday', 'isOpen', checked)}
                    id="tuesday-open"
                  />
                  <label htmlFor="tuesday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.tuesday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.tuesday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.tuesday.start}
                        onChange={(e) => handleHoursChange('tuesday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.tuesday.end}
                        onChange={(e) => handleHoursChange('tuesday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Wednesday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('wednesday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.wednesday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('wednesday', 'isOpen', checked)}
                    id="wednesday-open"
                  />
                  <label htmlFor="wednesday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.wednesday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.wednesday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.wednesday.start}
                        onChange={(e) => handleHoursChange('wednesday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.wednesday.end}
                        onChange={(e) => handleHoursChange('wednesday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Thursday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('thursday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.thursday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('thursday', 'isOpen', checked)}
                    id="thursday-open"
                  />
                  <label htmlFor="thursday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.thursday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.thursday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.thursday.start}
                        onChange={(e) => handleHoursChange('thursday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.thursday.end}
                        onChange={(e) => handleHoursChange('thursday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Friday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('friday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.friday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('friday', 'isOpen', checked)}
                    id="friday-open"
                  />
                  <label htmlFor="friday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.friday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.friday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.friday.start}
                        onChange={(e) => handleHoursChange('friday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.friday.end}
                        onChange={(e) => handleHoursChange('friday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Saturday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('saturday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.saturday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('saturday', 'isOpen', checked)}
                    id="saturday-open"
                  />
                  <label htmlFor="saturday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.saturday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.saturday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.saturday.start}
                        onChange={(e) => handleHoursChange('saturday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.saturday.end}
                        onChange={(e) => handleHoursChange('saturday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
              
              {/* Sunday */}
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-3 md:col-span-2">
                  <label className="block text-sm text-white/70">{t('sunday')}</label>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Switch
                    checked={contactContent.hours.sunday.isOpen}
                    onCheckedChange={(checked) => handleHoursChange('sunday', 'isOpen', checked)}
                    id="sunday-open"
                  />
                  <label htmlFor="sunday-open" className="ml-2 text-xs text-white/70">
                    {contactContent.hours.sunday.isOpen ? t('open') : t('closed')}
                  </label>
                </div>
                {contactContent.hours.sunday.isOpen && (
                  <>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.sunday.start}
                        onChange={(e) => handleHoursChange('sunday', 'start', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4">
                      <Input
                        type="time"
                        value={contactContent.hours.sunday.end}
                        onChange={(e) => handleHoursChange('sunday', 'end', e.target.value)}
                        className="bg-bar-light border-white/10 text-white text-sm h-8"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
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

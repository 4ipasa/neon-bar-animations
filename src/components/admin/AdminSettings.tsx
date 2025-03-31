
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

const AdminSettings: React.FC = () => {
  const { t } = useLanguage();
  
  // State for general settings
  const [settings, setSettings] = useState({
    siteName: "JD Bar",
    siteTagline: "Premium Cocktail Experience",
    enableNotifications: true,
    showPrices: true,
    maintenanceMode: false,
    analyticsEnabled: true
  });
  
  // State for color settings
  const [colors, setColors] = useState({
    primaryColor: "#00A3FF", // neon-blue
    secondaryColor: "#9D00FF", // neon-purple
    textColor: "#FFFFFF",
    backgroundColor: "#0A0A0C"
  });
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } else {
        // If no settings exist, save the defaults
        localStorage.setItem('siteSettings', JSON.stringify(settings));
      }
      
      const savedColors = localStorage.getItem('siteColors');
      if (savedColors) {
        setColors(prev => ({ ...prev, ...JSON.parse(savedColors) }));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    // Dispatch event to notify other components about the change
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteSettings',
      newValue: JSON.stringify(settings)
    }));
    toast.success(t('settings_saved'));
  };
  
  const handleSaveColors = () => {
    localStorage.setItem('siteColors', JSON.stringify(colors));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteColors',
      newValue: JSON.stringify(colors)
    }));
    toast.success(t('colors_saved'));
  };
  
  const handleResetDefault = () => {
    // Reset to default values
    const defaultSettings = {
      siteName: "JD Bar",
      siteTagline: "Premium Cocktail Experience",
      enableNotifications: true,
      showPrices: true,
      maintenanceMode: false,
      analyticsEnabled: true
    };
    
    const defaultColors = {
      primaryColor: "#00A3FF",
      secondaryColor: "#9D00FF",
      textColor: "#FFFFFF",
      backgroundColor: "#0A0A0C"
    };
    
    setSettings(defaultSettings);
    setColors(defaultColors);
    
    localStorage.setItem('siteSettings', JSON.stringify(defaultSettings));
    localStorage.setItem('siteColors', JSON.stringify(defaultColors));
    
    // Dispatch events to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteSettings',
      newValue: JSON.stringify(defaultSettings)
    }));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteColors',
      newValue: JSON.stringify(defaultColors)
    }));
    
    toast.success(t('settings_reset'));
  };
  
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('general_settings')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('site_name')}</label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('site_tagline')}</label>
            <Input
              value={settings.siteTagline}
              onChange={(e) => setSettings({...settings, siteTagline: e.target.value})}
              className="bg-bar-light border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70">{t('enable_notifications')}</label>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70">{t('show_prices')}</label>
              <Switch
                checked={settings.showPrices}
                onCheckedChange={(checked) => setSettings({...settings, showPrices: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70">{t('maintenance_mode')}</label>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70">{t('analytics_enabled')}</label>
              <Switch
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => setSettings({...settings, analyticsEnabled: checked})}
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
            >
              {t('save_settings')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Color Settings */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('color_settings')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('primary_color')}</label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded-md border border-white/10" 
                style={{ backgroundColor: colors.primaryColor }}
              />
              <Input
                type="text"
                value={colors.primaryColor}
                onChange={(e) => setColors({...colors, primaryColor: e.target.value})}
                className="bg-bar-light border-white/10 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('secondary_color')}</label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded-md border border-white/10" 
                style={{ backgroundColor: colors.secondaryColor }}
              />
              <Input
                type="text"
                value={colors.secondaryColor}
                onChange={(e) => setColors({...colors, secondaryColor: e.target.value})}
                className="bg-bar-light border-white/10 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('text_color')}</label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded-md border border-white/10" 
                style={{ backgroundColor: colors.textColor }}
              />
              <Input
                type="text"
                value={colors.textColor}
                onChange={(e) => setColors({...colors, textColor: e.target.value})}
                className="bg-bar-light border-white/10 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('background_color')}</label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded-md border border-white/10" 
                style={{ backgroundColor: colors.backgroundColor }}
              />
              <Input
                type="text"
                value={colors.backgroundColor}
                onChange={(e) => setColors({...colors, backgroundColor: e.target.value})}
                className="bg-bar-light border-white/10 text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex gap-3">
          <button
            onClick={handleSaveColors}
            className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
          >
            {t('save_colors')}
          </button>
          
          <button
            onClick={handleResetDefault}
            className="px-4 py-2 bg-bar-light border border-white/10 text-white rounded-md hover:bg-white/10"
          >
            {t('reset_to_default')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

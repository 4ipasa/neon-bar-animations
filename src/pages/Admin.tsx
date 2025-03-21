
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut } from 'lucide-react';
import { GradientText } from '../components/Animations';
import AdminCocktails from '../components/admin/AdminCocktails';
import AdminLogin from '../components/admin/AdminLogin';
import { useLanguage } from '../context/LanguageContext';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("cocktails");
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken === 'admin-secret-token') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };
  
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <div className="min-h-screen bg-bar-black text-white">
      {/* Admin Header */}
      <header className="bg-bar-dark border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="text-neon-blue mr-2" size={20} />
            <h1 className="text-xl font-bold">
              <GradientText>{t('admin_panel')}</GradientText>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-white/70 hover:text-white text-sm"
            >
              {t('view_site')}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center text-white/70 hover:text-white text-sm"
            >
              <LogOut size={16} className="mr-1" />
              {t('logout')}
            </button>
          </div>
        </div>
      </header>
      
      {/* Admin Content */}
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-bar-light border border-white/10 mb-8">
            <TabsTrigger value="cocktails" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              {t('cocktails')}
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              {t('site_content')}
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              {t('settings')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cocktails" className="mt-0">
            <AdminCocktails />
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">{t('site_content')}</h2>
              <p className="text-white/60">{t('content_management_coming_soon')}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">{t('settings')}</h2>
              <p className="text-white/60">{t('settings_coming_soon')}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

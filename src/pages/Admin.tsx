
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut, LayoutDashboard, Cocktail, FileText, Settings } from 'lucide-react';
import { GradientText } from '../components/Animations';
import AdminCocktails from '../components/admin/AdminCocktails';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminContent from '../components/admin/AdminContent';
import AdminSettings from '../components/admin/AdminSettings';
import { useLanguage } from '../context/LanguageContext';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
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
          <TabsList className="bg-bar-light border border-white/10 mb-8 grid grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              <div className="flex items-center">
                <LayoutDashboard size={14} className="mr-1 md:mr-2" />
                <span className="hidden md:inline">{t('dashboard')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="cocktails" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              <div className="flex items-center">
                <Cocktail size={14} className="mr-1 md:mr-2" />
                <span className="hidden md:inline">{t('cocktails')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              <div className="flex items-center">
                <FileText size={14} className="mr-1 md:mr-2" />
                <span className="hidden md:inline">{t('site_content')}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-bar-dark data-[state=active]:text-neon-blue">
              <div className="flex items-center">
                <Settings size={14} className="mr-1 md:mr-2" />
                <span className="hidden md:inline">{t('settings')}</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="cocktails" className="mt-0">
            <AdminCocktails />
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <AdminContent />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

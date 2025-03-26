
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart, User, Settings, Layers, LogOut, Home, Menu, ScrollText, Wine } from 'lucide-react';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminCocktails from '../components/admin/AdminCocktails';
import AdminContent from '../components/admin/AdminContent';
import AdminSettings from '../components/admin/AdminSettings';
import AdminLogin from '../components/admin/AdminLogin';
import { useLanguage } from '../context/LanguageContext';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-secret-token') {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/admin');
  };
  
  // Navigation items
  const navItems = [
    { path: '/admin/dashboard', name: t('dashboard'), icon: <BarChart size={20} /> },
    { path: '/admin/cocktails', name: t('cocktails'), icon: <Wine size={20} /> },
    { path: '/admin/content', name: t('site_content'), icon: <ScrollText size={20} /> },
    { path: '/admin/settings', name: t('settings'), icon: <Settings size={20} /> },
  ];
  
  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <div className="admin-layout min-h-screen bg-gradient-to-br from-bar-dark to-bar-darker text-white">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 glass-card border-r border-white/10 z-50 hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neon-blue tracking-wider">{t('admin_panel')}</h1>
        </div>
        <div className="px-4 py-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-neon-blue/20 text-neon-blue'
                    : 'hover:bg-white/5'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors mb-2"
          >
            <Home size={20} className="mr-3" />
            <span>{t('view_site')}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors w-full"
          >
            <LogOut size={20} className="mr-3" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden w-full glass-card border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-lg font-bold text-neon-blue">{t('admin_panel')}</h1>
        <div className="flex gap-2">
          <Link to="/" className="p-2 rounded-lg hover:bg-white/10">
            <Home size={20} />
          </Link>
          <button
            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden fixed inset-0 bg-black/90 z-40 pt-16">
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
                className={`flex items-center px-4 py-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-neon-blue/20 text-neon-blue'
                    : 'hover:bg-white/5'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors w-full mt-6"
            >
              <LogOut size={20} className="mr-3" />
              <span>{t('logout')}</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Admin Content */}
      <main className="md:ml-64 p-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cocktails" element={<AdminCocktails />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;


import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GradientText } from '../../components/Animations';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple authentication for demo purposes
    // In a real app, use proper authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('adminToken', 'admin-secret-token');
        toast.success(t('login_successful'));
        onLogin();
      } else {
        toast.error(t('invalid_credentials'));
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-bar-black flex items-center justify-center px-4">
      <div className="glass-card p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center">
              <Lock className="text-neon-blue" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>{t('admin_login')}</GradientText>
          </h1>
          <p className="text-white/60 text-sm">{t('admin_login_message')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('username')}</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-bar-light border-white/10 text-white"
              placeholder={t('enter_username')}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">{t('password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-bar-light border-white/10 text-white"
              placeholder={t('enter_password')}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? t('logging_in') : t('login')}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-neon-blue hover:underline text-sm">
            {t('return_to_site')}
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          {t('admin_credentials_hint')}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

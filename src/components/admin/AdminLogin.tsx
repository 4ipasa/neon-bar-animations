
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

// Define interface for component props
export interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple mock authentication for demo
    setTimeout(() => {
      setLoading(false);
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('adminToken', 'admin-secret-token');
        toast.success(t('login_successful'));
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        toast.error(t('invalid_credentials'));
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md glass-card p-8 backdrop-blur-lg">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-neon-blue mx-auto mb-2" />
          <h2 className="text-2xl font-bold">{t('admin_login')}</h2>
          <p className="text-white/60 mt-1">{t('admin_login_message')}</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('enter_username')}
              className="bg-bar-black/50 border-white/10"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enter_password')}
                className="bg-bar-black/50 border-white/10 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
          >
            {loading ? t('logging_in') : t('login')}
          </button>
          
          <p className="text-center text-white/40 text-sm">
            {t('admin_credentials_hint')}
          </p>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-neon-blue hover:underline text-sm">
            {t('return_to_site')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

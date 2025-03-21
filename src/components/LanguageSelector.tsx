
import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'ru', name: t('russian') },
    { code: 'en', name: t('english') },
    { code: 'kz', name: t('kazakh') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-white/80 hover:text-neon-blue transition-colors duration-300">
        <Globe size={18} className="mr-1" />
        <span className="uppercase text-sm tracking-wider">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-card">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`cursor-pointer ${language === lang.code ? 'text-neon-blue' : 'text-white/80'}`}
            onClick={() => setLanguage(lang.code as Language)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;


import React, { useState } from 'react';
import { GradientText } from './Animations';
import { useLanguage } from '../context/LanguageContext';

interface CocktailCardProps {
  title: string;
  price: string;
  ingredients: string;
  image: string;
  category: string;
  featured?: boolean;
}

const CocktailCard: React.FC<CocktailCardProps> = ({
  title,
  price,
  ingredients,
  image,
  category,
  featured = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={`glass-card overflow-hidden group transition-all duration-500 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full w-full relative flex flex-col">
        {/* Image Container */}
        <div 
          className="relative w-full aspect-[4/3] overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bar-black/90 via-bar-black/30 to-transparent"></div>
          
          {/* Category tag */}
          <div className="absolute top-4 left-4 bg-bar-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/70 uppercase tracking-wider">
            {category}
          </div>
          
          {/* Featured tag */}
          {featured && (
            <div className="absolute top-4 right-4 bg-neon-blue/10 backdrop-blur-sm border border-neon-blue/30 px-3 py-1 rounded-full text-xs text-neon-blue uppercase tracking-wider">
              {t('featured')}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-7 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl md:text-2xl font-medium">
              {featured ? <GradientText>{title}</GradientText> : title}
            </h3>
            <div className="text-lg md:text-xl font-medium text-neon-blue">{price}</div>
          </div>
          <p className="text-white/60 text-sm md:text-base">{ingredients}</p>
          
          {/* Button */}
          <div className={`mt-6 self-start transition-all duration-500 opacity-0 -translate-y-2 ${isHovered ? 'opacity-100 translate-y-0' : ''}`}>
            <button className="px-4 py-2 text-xs md:text-sm bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue hover:bg-neon-blue/20 transition-colors uppercase tracking-wider">
              {t('order_now')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;

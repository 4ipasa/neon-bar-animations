
import React, { useState, useEffect } from 'react';
import CocktailCard from './CocktailCard';
import { useRevealAnimation, GradientText } from './Animations';
import { useLanguage } from '../context/LanguageContext';
import { cocktails as initialCocktails } from '../data/cocktailsData';

const MenuSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cocktails, setCocktails] = useState(initialCocktails);
  
  useEffect(() => {
    // Load cocktails from localStorage if available (admin edits)
    const savedCocktails = localStorage.getItem('adminCocktails');
    if (savedCocktails) {
      setCocktails(JSON.parse(savedCocktails));
    }
  }, []);
  
  const categories = [
    { id: "All", label: t('all') },
    { id: "Signature", label: t('signature') },
    { id: "Classics", label: t('classics') },
    { id: "Premium", label: t('premium') },
    { id: "Tropical", label: t('tropical') }
  ];
  
  const filteredCocktails = activeCategory === "All" 
    ? cocktails 
    : cocktails.filter(cocktail => cocktail.category === activeCategory);

  // Get cocktail title and ingredients based on current language
  const getLocalizedTitle = (cocktail: any) => {
    if (language === 'ru' && cocktail.titleRu) return cocktail.titleRu;
    if (language === 'kz' && cocktail.titleKz) return cocktail.titleKz;
    return cocktail.title;
  };

  const getLocalizedIngredients = (cocktail: any) => {
    if (language === 'ru' && cocktail.ingredientsRu) return cocktail.ingredientsRu;
    if (language === 'kz' && cocktail.ingredientsKz) return cocktail.ingredientsKz;
    return cocktail.ingredients;
  };

  return (
    <section id="menu" className="section-padding bg-gradient-to-b from-bar-black to-bar-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="text-white/60 uppercase tracking-wider mb-3">{t('taste_experience')}</p>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('signature_cocktails').split(' ')[0]} <GradientText>{t('signature_cocktails').split(' ').slice(1).join(' ')}</GradientText>
            </h2>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="max-w-2xl mx-auto text-white/70 text-lg">
              {t('expertly_crafted_cocktails')}
            </p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="flex justify-center mb-12 gap-2 sm:gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-bar-light text-white/70 border border-white/5 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Cocktail Grid */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              title={getLocalizedTitle(cocktail)}
              price={cocktail.price}
              ingredients={getLocalizedIngredients(cocktail)}
              image={cocktail.image}
              category={cocktail.category}
              featured={cocktail.featured}
            />
          ))}
        </div>
        
        {/* Admin Link Button (only visible to authenticated users) */}
        {localStorage.getItem('adminToken') === 'admin-secret-token' && (
          <div className="mt-6 text-center">
            <a 
              href="/admin" 
              className="inline-flex items-center px-4 py-2 bg-bar-light border border-neon-blue/30 rounded-md text-neon-blue text-sm hover:bg-neon-blue/10 transition-all"
            >
              {t('edit_menu')}
            </a>
          </div>
        )}
        
        {/* View Full Menu Button */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="mt-12 md:mt-16 text-center">
          <button className="group relative px-8 py-3 bg-bar-light border border-white/10 rounded-lg text-white hover:border-neon-blue/30 transition-all duration-300">
            <span className="relative z-10">{t('view_full_menu')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-lg"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

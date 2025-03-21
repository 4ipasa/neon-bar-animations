
import React, { useState } from 'react';
import CocktailCard from './CocktailCard';
import { useRevealAnimation, GradientText } from './Animations';
import { useLanguage } from '../context/LanguageContext';

// Sample cocktail data
const cocktails = [
  {
    id: 1,
    title: "Neon Martini",
    titleRu: "Неон Мартини",
    titleKz: "Неон Мартини",
    price: "$16",
    ingredients: "Gin, Dry Vermouth, Electric Blue Curaçao, Lemon Twist",
    ingredientsRu: "Джин, сухой вермут, голубой кюрасао, лимонная цедра",
    ingredientsKz: "Джин, құрғақ вермут, көк кюрасао, лимон қабығы",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature",
    featured: true
  },
  {
    id: 2,
    title: "Smoky Whiskey Sour",
    titleRu: "Дымный Виски Сауэр",
    titleKz: "Түтінді Виски Сауэр",
    price: "$14",
    ingredients: "Bourbon, Fresh Lemon Juice, Simple Syrup, Egg White, Angostura Bitters",
    ingredientsRu: "Бурбон, свежий лимонный сок, сахарный сироп, яичный белок, биттер Ангостура",
    ingredientsKz: "Бурбон, жаңа сығылған лимон шырыны, қант шәрбаты, жұмыртқа ағы, Ангостура биттері",
    image: "https://images.unsplash.com/photo-1615887648205-20b0d813ae2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Classics"
  },
  {
    id: 3,
    title: "Velvet Cosmos",
    titleRu: "Бархатный Космос",
    titleKz: "Барқыт Космос",
    price: "$15",
    ingredients: "Vodka, Cranberry, Triple Sec, Fresh Lime, Edible Shimmer",
    ingredientsRu: "Водка, клюква, трипл сек, свежий лайм, съедобный шиммер",
    ingredientsKz: "Водка, мүкжидек, трипл сек, жаңа лайм, жеуге жарамды жылтыр",
    image: "https://images.unsplash.com/photo-1585621386257-ef0bb7026579?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature"
  },
  {
    id: 4,
    title: "Tokyo Drift",
    titleRu: "Токио Дрифт",
    titleKz: "Токио Дрифт",
    price: "$17",
    ingredients: "Japanese Whisky, Yuzu, Ginger Syrup, Shiso Leaf",
    ingredientsRu: "Японский виски, юдзу, имбирный сироп, лист шисо",
    ingredientsKz: "Жапон вискиі, юдзу, зімбір шәрбаты, шисо жапырағы",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Premium"
  },
  {
    id: 5,
    title: "Midnight Mojito",
    titleRu: "Полуночный Мохито",
    titleKz: "Түнгі Мохито",
    price: "$13",
    ingredients: "Aged Rum, Fresh Mint, Lime, Activated Charcoal, Soda Water",
    ingredientsRu: "Выдержанный ром, свежая мята, лайм, активированный уголь, содовая",
    ingredientsKz: "Ескірген ром, жаңа жалбыз, лайм, белсендірілген көмір, сода суы",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature"
  },
  {
    id: 6,
    title: "Exotic Passion",
    titleRu: "Экзотическая Страсть",
    titleKz: "Экзотикалық Құмарлық",
    price: "$15",
    ingredients: "Tequila, Passion Fruit, Lime, Agave, Chili Rim",
    ingredientsRu: "Текила, маракуйя, лайм, агава, ободок с чили",
    ingredientsKz: "Текила, маракуйя, лайм, агава, чили жиегі",
    image: "https://images.unsplash.com/photo-1583898350903-99fa829dad3d?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tropical"
  },
  {
    id: 7,
    title: "Electric Daiquiri",
    titleRu: "Электрический Дайкири",
    titleKz: "Электрлік Дайкири",
    price: "$14",
    ingredients: "White Rum, Fresh Lime, Demerara Sugar, Blue Pea Flower",
    ingredientsRu: "Белый ром, свежий лайм, сахар демерара, цветок синего гороха",
    ingredientsKz: "Ақ ром, жаңа лайм, демерара қанты, көк бұршақ гүлі",
    image: "https://images.unsplash.com/photo-1541107687188-ab674004c255?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Classics"
  }
];

const MenuSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  
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

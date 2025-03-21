
import React, { useState } from 'react';
import CocktailCard from './CocktailCard';
import { useRevealAnimation, GradientText } from './Animations';

// Sample cocktail data
const cocktails = [
  {
    id: 1,
    title: "Neon Martini",
    price: "$16",
    ingredients: "Gin, Dry Vermouth, Electric Blue Curaçao, Lemon Twist",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature",
    featured: true
  },
  {
    id: 2,
    title: "Smoky Whiskey Sour",
    price: "$14",
    ingredients: "Bourbon, Fresh Lemon Juice, Simple Syrup, Egg White, Angostura Bitters",
    image: "https://images.unsplash.com/photo-1615887648205-20b0d813ae2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Classics"
  },
  {
    id: 3,
    title: "Velvet Cosmos",
    price: "$15",
    ingredients: "Vodka, Cranberry, Triple Sec, Fresh Lime, Edible Shimmer",
    image: "https://images.unsplash.com/photo-1585621386257-ef0bb7026579?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature"
  },
  {
    id: 4,
    title: "Tokyo Drift",
    price: "$17",
    ingredients: "Japanese Whisky, Yuzu, Ginger Syrup, Shiso Leaf",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Premium"
  },
  {
    id: 5,
    title: "Midnight Mojito",
    price: "$13",
    ingredients: "Aged Rum, Fresh Mint, Lime, Activated Charcoal, Soda Water",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Signature"
  },
  {
    id: 6,
    title: "Exotic Passion",
    price: "$15",
    ingredients: "Tequila, Passion Fruit, Lime, Agave, Chili Rim",
    image: "https://images.unsplash.com/photo-1583898350903-99fa829dad3d?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tropical"
  },
  {
    id: 7,
    title: "Electric Daiquiri",
    price: "$14",
    ingredients: "White Rum, Fresh Lime, Demerara Sugar, Blue Pea Flower",
    image: "https://images.unsplash.com/photo-1541107687188-ab674004c255?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Classics"
  }
];

const categories = ["All", "Signature", "Classics", "Premium", "Tropical"];

const MenuSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredCocktails = activeCategory === "All" 
    ? cocktails 
    : cocktails.filter(cocktail => cocktail.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-gradient-to-b from-bar-black to-bar-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="text-white/60 uppercase tracking-wider mb-3">Taste the experience</p>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <GradientText>Signature</GradientText> Cocktails
            </h2>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="max-w-2xl mx-auto text-white/70 text-lg">
              Expertly crafted cocktails that blend classic techniques with innovative flavors, creating unforgettable sensory experiences.
            </p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="flex justify-center mb-12 gap-2 sm:gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-bar-light text-white/70 border border-white/5 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Cocktail Grid */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              title={cocktail.title}
              price={cocktail.price}
              ingredients={cocktail.ingredients}
              image={cocktail.image}
              category={cocktail.category}
              featured={cocktail.featured}
            />
          ))}
        </div>
        
        {/* View Full Menu Button */}
        <div ref={(el) => addToRefs(el as HTMLElement)} className="mt-12 md:mt-16 text-center">
          <button className="group relative px-8 py-3 bg-bar-light border border-white/10 rounded-lg text-white hover:border-neon-blue/30 transition-all duration-300">
            <span className="relative z-10">View Full Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-lg"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

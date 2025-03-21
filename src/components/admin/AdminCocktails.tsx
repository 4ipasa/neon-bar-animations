
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLanguage } from '../../context/LanguageContext';

// Import the initial cocktail data
import { cocktails as initialCocktails } from '../../data/cocktailsData';

interface Cocktail {
  id: number;
  title: string;
  titleRu: string;
  titleKz: string;
  price: string;
  ingredients: string;
  ingredientsRu: string;
  ingredientsKz: string;
  image: string;
  category: string;
  featured?: boolean;
}

const AdminCocktails: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCocktail, setEditingCocktail] = useState<Cocktail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cocktailToDelete, setCocktailToDelete] = useState<number | null>(null);
  const { language, t } = useLanguage();
  
  useEffect(() => {
    // Load cocktails from localStorage or use initial data
    const savedCocktails = localStorage.getItem('adminCocktails');
    if (savedCocktails) {
      setCocktails(JSON.parse(savedCocktails));
    } else {
      setCocktails(initialCocktails);
      localStorage.setItem('adminCocktails', JSON.stringify(initialCocktails));
    }
  }, []);
  
  // Save cocktails to localStorage whenever they change
  useEffect(() => {
    if (cocktails.length > 0) {
      localStorage.setItem('adminCocktails', JSON.stringify(cocktails));
    }
  }, [cocktails]);
  
  const filteredCocktails = cocktails.filter(cocktail => {
    const searchValue = searchTerm.toLowerCase();
    const titleToSearch = 
      language === 'ru' ? cocktail.titleRu.toLowerCase() :
      language === 'kz' ? cocktail.titleKz.toLowerCase() :
      cocktail.title.toLowerCase();
      
    return titleToSearch.includes(searchValue) || 
           cocktail.category.toLowerCase().includes(searchValue);
  });
  
  const handleEdit = (cocktail: Cocktail) => {
    setEditingCocktail(cocktail);
    setIsDialogOpen(true);
  };
  
  const handleAdd = () => {
    const newCocktail: Cocktail = {
      id: Math.max(0, ...cocktails.map(c => c.id)) + 1,
      title: '',
      titleRu: '',
      titleKz: '',
      price: '',
      ingredients: '',
      ingredientsRu: '',
      ingredientsKz: '',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Signature',
      featured: false
    };
    setEditingCocktail(newCocktail);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: number) => {
    setCocktailToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (cocktailToDelete !== null) {
      setCocktails(cocktails.filter(c => c.id !== cocktailToDelete));
      toast.success(t('cocktail_deleted'));
      setIsDeleteDialogOpen(false);
      setCocktailToDelete(null);
    }
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCocktail) {
      if (editingCocktail.id === 0 || !cocktails.some(c => c.id === editingCocktail.id)) {
        // Add new cocktail
        setCocktails([...cocktails, editingCocktail]);
        toast.success(t('cocktail_added'));
      } else {
        // Update existing cocktail
        setCocktails(cocktails.map(c => c.id === editingCocktail.id ? editingCocktail : c));
        toast.success(t('cocktail_updated'));
      }
      setIsDialogOpen(false);
      setEditingCocktail(null);
    }
  };
  
  const getTitleForDisplay = (cocktail: Cocktail) => {
    if (language === 'ru' && cocktail.titleRu) return cocktail.titleRu;
    if (language === 'kz' && cocktail.titleKz) return cocktail.titleKz;
    return cocktail.title;
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('manage_cocktails')}</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center px-3 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue text-sm"
        >
          <Plus size={16} className="mr-1" />
          {t('add_cocktail')}
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        <Input
          type="text"
          placeholder={t('search_cocktails')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-bar-light border-white/10 text-white"
        />
      </div>
      
      {/* Cocktails Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-3 py-3 text-left text-sm font-medium text-white/60">{t('cocktail')}</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-white/60">{t('category')}</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-white/60">{t('price')}</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-white/60">{t('featured')}</th>
              <th className="px-3 py-3 text-right text-sm font-medium text-white/60">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCocktails.length > 0 ? (
              filteredCocktails.map((cocktail) => (
                <tr key={cocktail.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-3 py-3">
                    <div className="flex items-center">
                      <img 
                        src={cocktail.image} 
                        alt={cocktail.title} 
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <span>{getTitleForDisplay(cocktail)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-1 bg-bar-dark rounded-full text-xs">
                      {cocktail.category}
                    </span>
                  </td>
                  <td className="px-3 py-3">{cocktail.price}</td>
                  <td className="px-3 py-3">
                    {cocktail.featured ? (
                      <Check size={16} className="text-neon-blue" />
                    ) : (
                      <X size={16} className="text-white/30" />
                    )}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button 
                      onClick={() => handleEdit(cocktail)}
                      className="p-1 text-white/60 hover:text-neon-blue transition-colors mr-2"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cocktail.id)}
                      className="p-1 text-white/60 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-white/40">
                  {searchTerm ? t('no_cocktails_found') : t('no_cocktails_yet')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Edit/Add Cocktail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-bar-dark border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCocktail && cocktails.some(c => c.id === editingCocktail.id) 
                ? t('edit_cocktail') 
                : t('add_cocktail')}
            </DialogTitle>
          </DialogHeader>
          
          {editingCocktail && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">{t('image_url')}</label>
                  <Input
                    type="text"
                    value={editingCocktail.image}
                    onChange={(e) => setEditingCocktail({...editingCocktail, image: e.target.value})}
                    className="bg-bar-light border-white/10 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">{t('price')}</label>
                  <Input
                    type="text"
                    value={editingCocktail.price}
                    onChange={(e) => setEditingCocktail({...editingCocktail, price: e.target.value})}
                    className="bg-bar-light border-white/10 text-white"
                    placeholder="$15"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">{t('category')}</label>
                  <select
                    value={editingCocktail.category}
                    onChange={(e) => setEditingCocktail({...editingCocktail, category: e.target.value})}
                    className="w-full bg-bar-light border border-white/10 rounded-md p-2 text-white"
                  >
                    <option value="Signature">{t('signature')}</option>
                    <option value="Classics">{t('classics')}</option>
                    <option value="Premium">{t('premium')}</option>
                    <option value="Tropical">{t('tropical')}</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCocktail.featured || false}
                      onChange={(e) => setEditingCocktail({...editingCocktail, featured: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-200 ease-in-out ${editingCocktail.featured ? 'bg-neon-blue' : 'bg-bar-light'}`}>
                      <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${editingCocktail.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="ml-2 text-sm text-white/70">{t('featured')}</span>
                  </label>
                </div>
              </div>
              
              {/* Multi-language fields */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="text-lg font-medium mb-3">{t('english')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('title')}</label>
                    <Input
                      type="text"
                      value={editingCocktail.title}
                      onChange={(e) => setEditingCocktail({...editingCocktail, title: e.target.value})}
                      className="bg-bar-light border-white/10 text-white"
                      placeholder="Cocktail name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('ingredients')}</label>
                    <Textarea
                      value={editingCocktail.ingredients}
                      onChange={(e) => setEditingCocktail({...editingCocktail, ingredients: e.target.value})}
                      className="bg-bar-light border-white/10 text-white min-h-24"
                      placeholder="Gin, Vermouth, etc."
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="text-lg font-medium mb-3">{t('russian')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('title')}</label>
                    <Input
                      type="text"
                      value={editingCocktail.titleRu}
                      onChange={(e) => setEditingCocktail({...editingCocktail, titleRu: e.target.value})}
                      className="bg-bar-light border-white/10 text-white"
                      placeholder="Название коктейля"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('ingredients')}</label>
                    <Textarea
                      value={editingCocktail.ingredientsRu}
                      onChange={(e) => setEditingCocktail({...editingCocktail, ingredientsRu: e.target.value})}
                      className="bg-bar-light border-white/10 text-white min-h-24"
                      placeholder="Джин, Вермут, и т.д."
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="text-lg font-medium mb-3">{t('kazakh')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('title')}</label>
                    <Input
                      type="text"
                      value={editingCocktail.titleKz}
                      onChange={(e) => setEditingCocktail({...editingCocktail, titleKz: e.target.value})}
                      className="bg-bar-light border-white/10 text-white"
                      placeholder="Коктейль атауы"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">{t('ingredients')}</label>
                    <Textarea
                      value={editingCocktail.ingredientsKz}
                      onChange={(e) => setEditingCocktail({...editingCocktail, ingredientsKz: e.target.value})}
                      className="bg-bar-light border-white/10 text-white min-h-24"
                      placeholder="Джин, Вермут, т.б."
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-bar-light border border-white/10 rounded-md text-white hover:bg-white/10"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-md hover:opacity-90"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-bar-dark border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{t('confirm_delete')}</DialogTitle>
          </DialogHeader>
          <p className="py-4">{t('delete_cocktail_confirmation')}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="px-4 py-2 bg-bar-light border border-white/10 rounded-md text-white hover:bg-white/10"
            >
              {t('cancel')}
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500/80 text-white rounded-md hover:bg-red-500"
            >
              {t('delete')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCocktails;

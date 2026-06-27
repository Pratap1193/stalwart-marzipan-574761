import { useState } from "react";
import { motion } from "framer-motion";
import { useSiteData } from "../DataContext";

const CATEGORIES = ['Starters', 'Indian', 'Chinese', 'Tandoor', 'Continental', 'Beverages', 'Desserts'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('Starters');
  const { data, loading } = useSiteData();

  if (loading || !data) return <div className="pt-28 pb-24 min-h-screen bg-stone-950 flex justify-center items-center text-amber-500">Loading...</div>;

  const filteredItems = data.menu.filter(item => item.category === activeCategory);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Our Menu</h1>
          <p className="text-stone-400 max-w-2xl mx-auto">Discover our carefully curated selection of exquisite dishes, designed to delight your palate.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 uppercase tracking-wider text-xs font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-amber-500 text-stone-950' 
                  : 'text-stone-400 border border-stone-800 hover:border-amber-500 hover:text-amber-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center text-stone-500 py-10">No items in this category currently.</div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 group">
                <div className="w-full sm:w-32 h-32 overflow-hidden rounded-sm shrink-0">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1544025162-8b321a48c6f1?auto=format&fit=crop&w=400&q=80"} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-2 border-b border-stone-800 pb-2">
                    <h3 className="text-xl font-serif text-stone-100">{item.name}</h3>
                    <span className="text-amber-500 font-medium">${Number(item.price).toFixed(2)}</span>
                  </div>
                  <p className="text-stone-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

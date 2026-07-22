// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [visibleCount, setVisibleCount] = useState(8);

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      const categoryMap = {
        'phone-cases': 'Phone Cases',
        'chargers-cables': 'Chargers & Cables',
        'power-banks': 'Power Banks',
        'earbuds-audio': 'Earbuds & Audio',
        'screen-protectors': 'Screen Protectors',
        'car-accessories': 'Car Accessories'
      };
      filtered = filtered.filter(p => p.category === categoryMap[selectedCategory]);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredProducts(filtered);
    setVisibleCount(8);
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (slug) => {
    setSearchParams(slug === 'all' ? {} : { category: slug });
    setIsFilterOpen(false);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Shop All</h1>
          <p className="text-brand-muted text-sm">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[240px] flex-shrink-0">
            <div className="sticky top-[76px]">
              <h3 className="font-medium text-sm mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-brand-gold/10 text-brand-gold font-medium'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-gold/10 text-brand-gold font-medium'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort & Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-brand-muted min-h-[44px] min-w-[44px]"
              >
                <span className="material-symbols-outlined">tune</span>
                Filter
              </button>
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-brand-muted hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-black/10 rounded-lg px-3 py-2 bg-white outline-none min-h-[44px]"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.slice(0, visibleCount).map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="btn-secondary"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-6" />
                <h3 className="font-heading text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left py-3 px-4 rounded-xl transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-brand-gold/10 text-brand-gold font-medium'
                        : 'text-brand-muted'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`block w-full text-left py-3 px-4 rounded-xl transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-brand-gold/10 text-brand-gold font-medium'
                          : 'text-brand-muted'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
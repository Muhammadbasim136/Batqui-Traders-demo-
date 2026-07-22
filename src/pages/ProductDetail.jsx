// src/pages/ProductDetail.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (imageRef.current) observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-brand-muted/30 mb-4">search_off</span>
        <p className="text-brand-muted">Product not found</p>
        <Link to="/shop" className="text-brand-gold mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, product.colors[selectedColor]);
  };

  return (
    <div className="pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <Link to="/" className="hover:text-brand-text">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/shop" className="hover:text-brand-text">Shop</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-brand-text">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div ref={imageRef}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-bg mb-4">
              <img
                src={currentImage === 0 ? product.image : product.hoverImage}
                alt={`${product.name} for smartphone - view ${currentImage + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Discount */}
              <span className="absolute top-4 left-4 bg-brand-cta text-white text-xs font-medium px-3 py-1.5 rounded-full">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[product.image, product.hoverImage].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    currentImage === i ? 'border-brand-gold' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-xs text-brand-gold font-medium tracking-wider uppercase">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl mt-2 mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-sm ${
                    i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'
                  }`}>star</span>
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-brand-muted">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">Rs {product.price.toLocaleString()}</span>
              <span className="text-lg text-brand-muted line-through">
                Rs {product.originalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save Rs {(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Color: <span className="text-brand-muted">{product.colors[selectedColor]}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all min-h-[44px] ${
                      selectedColor === i
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                        : 'border-black/10 text-brand-muted hover:border-black/20'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex-1"
              >
                Add to Cart — Rs {(product.price * quantity).toLocaleString()}
              </motion.button>
              <button className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-black/5">
              {[
                { icon: 'verified', text: '100% Original' },
                { icon: 'local_shipping', text: 'Free Delivery' },
                { icon: 'autorenew', text: 'Easy Returns' },
                { icon: 'shield', text: '1 Year Warranty' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-brand-muted">
                  <span className="material-symbols-outlined text-brand-gold text-sm">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-8 border-b border-black/5 mb-6">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab ? 'text-brand-text' : 'text-brand-muted'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-brand-muted leading-relaxed max-w-2xl"
            >
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'specifications' && (
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-brand-gold text-sm">check_circle</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold">{product.rating}</span>
                    <div>
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${
                            i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}>star</span>
                        ))}
                      </div>
                      <span className="text-xs">{product.reviews.toLocaleString()} reviews</span>
                    </div>
                  </div>
                  <p className="text-sm">Reviews will be displayed here once connected to a review system.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
              {relatedProducts.map((product, i) => (
                <div key={product.id} className="flex-shrink-0 w-[260px] md:w-auto">
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile Add to Cart */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 p-4 z-40 md:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-lg font-bold">Rs {product.price.toLocaleString()}</p>
              </div>
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
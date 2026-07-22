// src/components/ProductCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08 }}
      className="card group cursor-pointer"
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="relative aspect-square overflow-hidden bg-brand-bg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
        >
          <img
            src={isHovered ? product.hoverImage : product.image}
            alt={`${product.name} for smartphone`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-brand-cta text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 right-12 bg-brand-gold text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors min-w-[44px] min-h-[44px]"
          >
            <span className={`material-symbols-outlined text-lg ${isWishlisted ? 'text-red-500 filled' : ''}`}>
              favorite
            </span>
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-tight mb-1">{product.name}</h3>
          <p className="text-xs text-brand-muted mb-2">{product.category}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-brand-muted">({product.reviews.toLocaleString()})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-bold">Rs {product.price.toLocaleString()}</span>
            <span className="text-sm text-brand-muted line-through">
              Rs {product.originalPrice.toLocaleString()}
            </span>
          </div>
        </Link>
        
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-brand-gold text-white py-2.5 rounded-full text-sm font-medium hover:bg-brand-gold-dark transition-colors min-h-[44px]"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
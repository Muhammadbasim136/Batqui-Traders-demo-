import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Phone Cases', path: '/shop?category=phone-cases' },
    { name: 'Chargers & Cables', path: '/shop?category=chargers-cables' },
    { name: 'Power Banks', path: '/shop?category=power-banks' },
    { name: 'Earbuds & Audio', path: '/shop?category=earbuds-audio' },
    { name: 'Car Accessories', path: '/shop?category=car-accessories' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-text text-white overflow-hidden h-8 flex items-center relative z-[60]">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-xs px-4 opacity-90">
            Free Delivery All Over Pakistan • Cash on Delivery Available • 100% Original Products • 1 Year Warranty
          </span>
          <span className="text-xs px-4 opacity-90" aria-hidden="true">
            Free Delivery All Over Pakistan • Cash on Delivery Available • 100% Original Products • 1 Year Warranty
          </span>
        </div>
      </div>

      {/* Sticky Header */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-brand-bg/95 backdrop-blur-sm'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 h-[60px] flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold tracking-tight">
            Batqui Traders
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm text-brand-muted hover:text-brand-text transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Link
              to="/shop"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </Link>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-[300px] h-full shadow-xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading text-xl font-bold">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-brand-muted hover:text-brand-text transition-colors text-lg"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <hr className="my-6 border-black/5" />
                
                <div className="space-y-2">
                  <a href="#" className="block py-2 text-sm text-brand-muted hover:text-brand-text transition-colors">
                    About Us
                  </a>
                  <a href="#" className="block py-2 text-sm text-brand-muted hover:text-brand-text transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
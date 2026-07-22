// src/components/CartDrawer.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-6xl text-brand-muted/30 mb-4">
                    shopping_bag
                  </span>
                  <p className="text-brand-muted">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <motion.div
                      key={`${item.id}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-brand-bg rounded-2xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-brand-muted mt-1">{item.color}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium">Rs {item.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="min-w-[44px] min-h-[44px] flex items-start justify-center pt-1"
                      >
                        <span className="material-symbols-outlined text-brand-muted">delete</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-muted">Total</span>
                  <span className="text-xl font-bold">Rs {cartTotal.toLocaleString()}</span>
                </div>
                <button className="btn-primary w-full">
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
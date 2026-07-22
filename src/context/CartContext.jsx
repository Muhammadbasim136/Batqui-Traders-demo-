// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const addToCart = (product, quantity = 1, color = null) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && item.color === color
      );
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity, color: color || product.colors[0] }];
    });
    
    setToast(`Added ${product.name} to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromCart = (productId, color) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.color === color)));
  };

  const updateQuantity = (productId, color, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item =>
      item.id === productId && item.color === color
        ? { ...item, quantity }
        : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      toast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function addToCart(book, price, quantity = 1) {
  setItems(prev => {
    const idx = prev.findIndex(i => i.book.key === book.key);

    if (idx >= 0) {
      const copy = prev.slice();
      const oldItem = copy[idx];
      const updatedItem = Object.assign({}, oldItem, {
        quantity: oldItem.quantity + quantity
      });

      copy[idx] = updatedItem;
      return copy;
    }
    return prev.concat([{ book, price, quantity }]);
  });
}

  function removeFromCart(bookId) {
    setItems(prev => prev.filter(i => i.book.key !== bookId));
  }

function updateQuantity(bookId, quantity) {
  setItems(prev => {
    return prev.map(i => {
      if (i.book.key === bookId) {
        return Object.assign({}, i, { quantity: quantity });
      } else {
        return i;
      }
    });
  });
}

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((s, it) => s + (it.price ?? 0) * it.quantity, 0);
  const totalQty = items.reduce((s, it) => s + it.quantity, 0);
  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalQty
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

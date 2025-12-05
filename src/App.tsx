import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS, TESTIMONIALS } from './constants';
import { Navbar, CartSidebar } from './components/Shared';
import { Storefront } from './components/Storefront';
import { CollectionPage } from './components/CollectionPage';
import { OurStoryPage } from './components/OurStoryPage';
import { JournalPage } from './components/JournalPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AdminPanel } from './components/AdminPanel';

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-gold-500 selection:text-black">
        <Navbar
          toggleCart={() => setIsCartOpen(!isCartOpen)}
          cartItemCount={cartItemCount}
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
        />

        <main className="pt-0 animate-fade-in">
          <Routes>
            <Route path="/" element={
              <Storefront
                products={products}
                testimonials={TESTIMONIALS}
                addToCart={addToCart}
              />
            } />
            <Route path="/collection" element={
              <CollectionPage
                products={products}
                addToCart={addToCart}
              />
            } />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/checkout" element={
              <CheckoutPage
                cart={cart}
                clearCart={clearCart}
              />
            } />
            <Route path="/admin" element={
              <AdminPanel
                products={products}
                setProducts={setProducts}
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

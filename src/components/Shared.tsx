import React from 'react';
import { ShoppingBag, X, Menu, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CartItem } from '../types';

interface NavbarProps {
  toggleCart: () => void;
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleCart, cartItemCount }) => {
  const location = useLocation();
  const isStore = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950 lg:bg-zinc-950/80 lg:backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <div className="flex items-center space-x-8">
            <button
              className="text-zinc-400 hover:text-white lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                NOIR <span className="text-gold-400">ESSENCE</span>
              </span>
            </Link>
            <div className="hidden lg:flex space-x-8 ml-8">
              <Link to="/collection" className="text-zinc-400 hover:text-gold-400 text-sm tracking-widest uppercase transition-colors">Collection</Link>
              <Link to="/our-story" className="text-zinc-400 hover:text-gold-400 text-sm tracking-widest uppercase transition-colors">Our Story</Link>
              <Link to="/journal" className="text-zinc-400 hover:text-gold-400 text-sm tracking-widest uppercase transition-colors">Journal</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to={isStore ? '/admin' : '/'}
              className={`text-xs uppercase tracking-widest px-3 py-1 border rounded transition-all hidden sm:block ${!isStore ? 'border-gold-500 text-gold-500' : 'border-zinc-800 text-zinc-500 hover:text-white'}`}
            >
              {isStore ? 'Admin' : 'Store'}
            </Link>
            <button className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <div className="relative">
              <button onClick={toggleCart} className="text-zinc-400 hover:text-white transition-colors group">
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-zinc-950 transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-center">
            <Link
              to="/collection"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-gold-400 transition-colors"
            >
              Collection
            </Link>
            <Link
              to="/our-story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-gold-400 transition-colors"
            >
              Our Story
            </Link>
            <Link
              to="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-gold-400 transition-colors"
            >
              Journal
            </Link>
            <Link
              to={isStore ? '/admin' : '/'}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-gold-400 transition-colors pt-8 border-t border-zinc-900"
            >
              {isStore ? 'Admin Panel' : 'Storefront'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`absolute inset-y-0 right-0 w-full sm:max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-serif text-white">Your Selection</h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-zinc-500 py-12">
                <p>Your shopping bag is empty.</p>
                <button onClick={onClose} className="mt-4 text-gold-400 hover:text-gold-300 underline underline-offset-4">
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded bg-zinc-800" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-400">${item.price}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs text-zinc-500">Qty: {item.quantity}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-6 py-6 border-t border-zinc-800 bg-zinc-900">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-xl font-serif text-white">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className={`block w-full bg-gold-500 text-black font-semibold py-4 uppercase tracking-widest hover:bg-gold-400 transition-colors text-center ${cart.length === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

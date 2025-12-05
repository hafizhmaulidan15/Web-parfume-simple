import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Testimonial, ChatMessage } from '../types';
import { Star, Send, MessageSquare, X } from 'lucide-react';
import { createScentSommelierChat } from '../services/geminiService';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface StorefrontProps {
  products: Product[];
  testimonials: Testimonial[];
  addToCart: (product: Product) => void;
}

export const Storefront: React.FC<StorefrontProps> = ({ products, testimonials, addToCart }) => {
  // No state needed for now

  return (
    <div className="bg-zinc-950 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Perfume"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="block text-gold-400 uppercase tracking-[0.2em] mb-4 animate-fade-in-up">The New Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight animate-fade-in-up delay-100">
            Unveil Your <br /> <span className="italic text-zinc-400">Hidden Essence</span>
          </h1>
          <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
            Discover fragrances crafted with rare ingredients and artisanal precision.
            Scents that tell a story, yours.
          </p>
          <Link to="/collection" className="inline-block bg-transparent border border-white text-white px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 animate-fade-in-up delay-300">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Curated Selection</h2>
          <div className="w-24 h-px bg-gold-500 mx-auto opacity-50"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-white text-black text-[10px] uppercase font-bold px-2 py-1 tracking-widest">
                    New Arrival
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">{product.brand}</p>
                <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                <p className="text-zinc-500 text-sm mb-3 line-clamp-2 px-4">{product.description}</p>
                <p className="text-zinc-300 font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/collection" className="text-gold-400 hover:text-white uppercase tracking-widest text-sm border-b border-gold-400 hover:border-white pb-1 transition-all">
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Voices of Elegance</h2>
            <div className="w-24 h-px bg-gold-500 mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-zinc-950 p-8 border border-zinc-800 relative">
                <div className="flex text-gold-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "text-gold-400" : "text-zinc-700"} />
                  ))}
                </div>
                <p className="text-zinc-300 font-light leading-relaxed mb-8 italic">"{t.content}"</p>
                <div className="flex items-center">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover mr-4 grayscale" />
                  <div>
                    <p className="text-white text-sm font-medium uppercase tracking-wide">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="bg-black py-12 px-4 border-t border-zinc-900 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              NOIR <span className="text-gold-400">ESSENCE</span>
            </span>
          </div>
          <div className="text-zinc-500 text-sm">
            &copy; 2024 Noir Essence. All rights reserved.
          </div>
        </div>
      </footer>

      <AIChatBot />
    </div>
  );
};

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Bonjour. I am your personal Scent Sommelier. What kind of fragrance are you looking for today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null); // Storing the chat session

  useEffect(() => {
    // Initialize chat session on mount
    try {
      const session = createScentSommelierChat();
      setChatSession(session);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessageStream({ message: userMsg.text });

      let fullText = '';
      const botMsgId = (Date.now() + 1).toString();

      // Add placeholder message
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', timestamp: new Date() }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m));
        }
      }

    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Apologies, I seem to have lost the scent trail. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-gold-500 text-black p-4 rounded-full shadow-lg hover:bg-gold-400 transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-4 md:right-8 z-50 w-[90vw] md:w-96 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-zinc-800 p-4 flex justify-between items-center border-b border-zinc-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-white font-serif">Scent Sommelier</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                  ? 'bg-gold-600 text-white rounded-tr-none'
                  : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 p-3 rounded-lg text-xs italic">
                  Analyzing notes...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-zinc-800 border-t border-zinc-700 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="I like woody & spicy..."
              className="flex-1 bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold-500 placeholder-zinc-600"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="bg-gold-500 text-black p-2 rounded hover:bg-gold-400 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

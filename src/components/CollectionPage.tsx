import React, { useState } from 'react';
import { Product } from '../types';

interface CollectionPageProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ products, addToCart }) => {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Men' | 'Women' | 'Unisex'>('All');

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-zinc-950 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold-400 uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">Discover</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 animate-fade-in-up delay-100">The Collection</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
                        Explore our full range of artisanal fragrances, each crafted to tell a unique story.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center space-x-8 overflow-x-auto mb-16 border-b border-zinc-900 pb-4">
                    {['All', 'Women', 'Men', 'Unisex'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-colors whitespace-nowrap ${activeCategory === cat
                                    ? 'border-gold-500 text-white'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group relative animate-fade-in-up">
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
            </div>
        </div>
    );
};

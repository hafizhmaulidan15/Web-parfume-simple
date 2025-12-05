import React from 'react';

export const OurStoryPage: React.FC = () => {
    return (
        <div className="bg-zinc-950 min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop"
                        alt="Perfume Lab"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="block text-gold-400 uppercase tracking-[0.2em] mb-4 animate-fade-in-up">Est. 2024</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-fade-in-up delay-100">
                        The Art of <span className="italic text-zinc-400">Memory</span>
                    </h1>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4">
                {/* Chapter 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 animate-fade-in-up delay-200">
                    <div>
                        <h2 className="text-3xl font-serif text-white mb-6">Our Philosophy</h2>
                        <div className="w-16 h-px bg-gold-500 mb-6"></div>
                        <p className="text-zinc-300 leading-relaxed font-light mb-6">
                            At Noir Essence, we believe that fragrance is more than just a scent—it is an invisible accessory, a silent language, and a powerful trigger of memory.
                        </p>
                        <p className="text-zinc-300 leading-relaxed font-light">
                            Born from a desire to return to the roots of perfumery, we reject mass production in favor of patience, precision, and passion. Each bottle is a testament to the time-honored traditions of Grasse, reimagined for the modern connoisseur.
                        </p>
                    </div>
                    <div className="relative h-96 bg-zinc-900 rounded-sm overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop"
                            alt="Ingredients"
                            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Chapter 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 animate-fade-in-up delay-300">
                    <div className="order-2 md:order-1 relative h-96 bg-zinc-900 rounded-sm overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2070&auto=format&fit=crop"
                            alt="Craftsmanship"
                            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-serif text-white mb-6">Rare Ingredients</h2>
                        <div className="w-16 h-px bg-gold-500 mb-6"></div>
                        <p className="text-zinc-300 leading-relaxed font-light mb-6">
                            We travel the globe to source the finest raw materials. From the resinous Ouds of Southeast Asia to the delicate Rose de Mai of France, our palette is uncompromising.
                        </p>
                        <p className="text-zinc-300 leading-relaxed font-light">
                            We believe in the beauty of natural imperfections and the depth that only authentic ingredients can provide. Our formulations are clean, cruelty-free, and sustainably sourced.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="text-center py-16 border-t border-zinc-900 animate-fade-in-up delay-500">
                    <h2 className="text-2xl font-serif text-white mb-12">The Noir Standard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border border-zinc-800 bg-zinc-900/50">
                            <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Artisanal</h3>
                            <p className="text-zinc-400 text-sm">Hand-blended in small batches to ensure quality and consistency.</p>
                        </div>
                        <div className="p-6 border border-zinc-800 bg-zinc-900/50">
                            <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Sustainable</h3>
                            <p className="text-zinc-400 text-sm">Ethically sourced ingredients and recyclable packaging.</p>
                        </div>
                        <div className="p-6 border border-zinc-800 bg-zinc-900/50">
                            <h3 className="text-gold-400 uppercase tracking-widest text-sm mb-4">Timeless</h3>
                            <p className="text-zinc-400 text-sm">Scents designed to transcend trends and seasons.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

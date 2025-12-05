import React from 'react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'The Art of Layering Scents',
        excerpt: 'Discover how to create a signature fragrance that is uniquely yours by mastering the delicate art of perfume layering.',
        date: 'October 12, 2024',
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop',
        category: 'Guide'
    },
    {
        id: '2',
        title: 'Sourcing Oud: A Journey to the East',
        excerpt: 'Join us on our expedition to the dense forests of Southeast Asia in search of the "liquid gold" of perfumery.',
        date: 'September 28, 2024',
        image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop',
        category: 'Behind the Scenes'
    },
    {
        id: '3',
        title: 'Winter Fragrance Trends 2024',
        excerpt: 'From warm ambers to spicy leathers, explore the olfactory notes that will define the coming season.',
        date: 'November 05, 2024',
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2070&auto=format&fit=crop',
        category: 'Trends'
    }
];

export const JournalPage: React.FC = () => {
    return (
        <div className="bg-zinc-950 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-gold-400 uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">The Journal</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 animate-fade-in-up delay-100">Olfactory Notes</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto font-light animate-fade-in-up delay-200">
                        Stories, guides, and insights from the world of haute parfumerie.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {BLOG_POSTS.map((post, index) => (
                        <article key={post.id} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-sm px-3 py-1 text-xs text-gold-400 uppercase tracking-widest">
                                    {post.category}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-zinc-500 text-xs uppercase tracking-widest">{post.date}</div>
                                <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors">{post.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <button className="text-gold-400 text-xs uppercase tracking-widest border-b border-gold-400 pb-1 hover:text-white hover:border-white transition-all mt-2">
                                    Read Article
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-20 text-center border-t border-zinc-900 pt-16">
                    <h3 className="text-2xl font-serif text-white mb-4">Subscribe to our Newsletter</h3>
                    <p className="text-zinc-400 mb-8 font-light">Receive the latest notes, launches, and exclusive offers.</p>
                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-gold-500"
                        />
                        <button className="bg-gold-500 text-black px-6 py-3 uppercase tracking-widest font-bold hover:bg-gold-400 transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

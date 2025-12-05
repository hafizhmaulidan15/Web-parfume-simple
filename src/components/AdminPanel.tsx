import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Trash2, Wand2, Package, DollarSign, X } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: 'Noir Essence',
    price: 0,
    description: '',
    notes: [],
    category: 'Unisex',
    image: 'https://picsum.photos/400/600',
  });
  const [noteInput, setNoteInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to discontinue this fragrance?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddNote = () => {
    if (noteInput && newProduct.notes) {
      setNewProduct({ ...newProduct, notes: [...(newProduct.notes || []), noteInput] });
      setNoteInput('');
    } else if (noteInput) {
        setNewProduct({ ...newProduct, notes: [noteInput] });
        setNoteInput('');
    }
  };

  const handleGenerateDescription = async () => {
    if (!newProduct.name || !newProduct.notes || newProduct.notes.length === 0) {
      alert("Please provide a name and at least one note to generate a description.");
      return;
    }
    
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.notes.join(', '));
    setNewProduct({ ...newProduct, description: desc });
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        brand: newProduct.brand || 'Noir Essence',
        price: Number(newProduct.price),
        description: newProduct.description || '',
        notes: newProduct.notes || [],
        image: newProduct.image || 'https://picsum.photos/400/600',
        category: newProduct.category as any,
        isNew: true
      };
      setProducts(prev => [...prev, product]);
      setIsAdding(false);
      setNewProduct({ name: '', brand: 'Noir Essence', price: 0, description: '', notes: [], category: 'Unisex', image: 'https://picsum.photos/400/600' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-white">Admin Dashboard</h1>
            <p className="text-zinc-500 mt-1">Manage inventory and curate collections.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-2 bg-gold-500 text-black px-4 py-2 rounded font-medium hover:bg-gold-400 transition-colors"
          >
            <Plus size={20} />
            <span>{isAdding ? 'Cancel' : 'Add Perfume'}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-sm uppercase tracking-wider">Total Products</p>
                <h3 className="text-3xl text-white font-serif mt-2">{products.length}</h3>
              </div>
              <Package className="text-gold-500" />
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-sm uppercase tracking-wider">Avg. Price</p>
                <h3 className="text-3xl text-white font-serif mt-2">
                  ${(products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(0)}
                </h3>
              </div>
              <DollarSign className="text-green-500" />
            </div>
          </div>
        </div>

        {/* Add Product Form */}
        {isAdding && (
          <div className="bg-zinc-900 p-8 rounded border border-zinc-800 mb-12 animate-fade-in-up">
            <h2 className="text-xl font-serif text-white mb-6">New Creation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                    placeholder="e.g. Amber Nuit"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    required
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">Fragrance Notes (Press Enter to Add)</label>
                <div className="flex space-x-2 mb-2">
                  <input 
                    type="text" 
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddNote())}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                    placeholder="e.g. Sandalwood"
                  />
                  <button type="button" onClick={handleAddNote} className="bg-zinc-800 text-white px-4 rounded hover:bg-zinc-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProduct.notes?.map((note, idx) => (
                    <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm flex items-center">
                      {note}
                      <button type="button" onClick={() => setNewProduct({...newProduct, notes: newProduct.notes?.filter((_, i) => i !== idx)})} className="ml-2 hover:text-white"><X size={14} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-zinc-400 text-sm">Description</label>
                  <button 
                    type="button" 
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="text-xs flex items-center space-x-1 text-gold-400 hover:text-gold-300 disabled:opacity-50"
                  >
                    <Wand2 size={12} />
                    <span>{isGenerating ? 'Drafting...' : 'Generate with AI'}</span>
                  </button>
                </div>
                <textarea 
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none h-32"
                  placeholder="Enter manually or generate with AI..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-zinc-400 text-sm mb-2">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Image URL</label>
                   <input 
                    type="text" 
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-white text-black px-8 py-3 uppercase font-bold tracking-widest hover:bg-gold-500 transition-colors">
                  Launch Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product List */}
        <div className="bg-zinc-900 rounded border border-zinc-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 flex items-center space-x-4">
                    <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-zinc-500 text-xs">{product.notes.slice(0, 3).join(', ')}...</p>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300 text-sm">{product.category}</td>
                  <td className="p-4 text-zinc-300 text-sm">${product.price}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
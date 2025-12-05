import React, { useState } from 'react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface CheckoutPageProps {
    cart: CartItem[];
    clearCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, clearCart }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
                <div className="text-center max-w-lg animate-fade-in-up">
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={64} className="text-gold-500" />
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-4">Order Confirmed</h1>
                    <p className="text-zinc-400 mb-8">
                        Thank you for your purchase. Your order has been received and is being prepared with care. You will receive a confirmation email shortly.
                    </p>
                    <Link to="/" className="inline-block bg-white text-black px-8 py-3 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 pt-32 px-4 text-center">
                <h1 className="text-3xl font-serif text-white mb-4">Your bag is empty</h1>
                <Link to="/collection" className="text-gold-400 hover:text-white border-b border-gold-400 hover:border-white pb-1 transition-all">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-20 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Order Summary */}
                <div className="order-2 lg:order-1">
                    <h2 className="text-2xl font-serif text-white mb-8">Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">First Name</label>
                                <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">Last Name</label>
                                <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">Email</label>
                            <input required type="email" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">Address</label>
                            <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">City</label>
                                <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-2">Postal Code</label>
                                <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 focus:border-gold-500 outline-none" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-gold-500 text-black font-bold uppercase tracking-widest py-4 hover:bg-gold-400 transition-colors mt-8">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Cart Items */}
                <div className="order-1 lg:order-2 bg-zinc-900 p-8 h-fit">
                    <h2 className="text-xl font-serif text-white mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 border-b border-zinc-800 pb-4 last:border-0">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="text-white font-medium">{item.name}</h3>
                                        <p className="text-zinc-400">${item.price * item.quantity}</p>
                                    </div>
                                    <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-zinc-800 pt-4 space-y-2">
                        <div className="flex justify-between text-zinc-400">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-white font-serif text-xl pt-4 border-t border-zinc-800 mt-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

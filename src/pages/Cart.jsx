import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const delivery = total > 10000 ? 0 : 1500;
  const grandTotal = total + delivery;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="section-container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <span className="text-8xl">🛒</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-6">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">
              Discover fresh products from Rwanda's best farmers.
            </p>
            <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2 mt-6">
              <ArrowLeft size={16} />
              Browse Marketplace
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="section-container py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Shopping Cart
              <span className="ml-2 badge-green">{cart.length} items</span>
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-600 flex items-center gap-1
                       transition-colors duration-200"
          >
            <Trash2 size={14} />
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="card p-5 flex items-center gap-5"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-forest-50 to-cream-100
                                  rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.image}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">👨‍🌾 {item.farmer} · {item.district}</p>
                    <p className="text-forest-600 font-bold text-sm mt-1">
                      {item.price.toLocaleString()} RWF/{item.unit}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-forest-50
                                 flex items-center justify-center text-gray-600
                                 hover:text-forest-600 transition-all duration-200"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-forest-50
                                 flex items-center justify-center text-gray-600
                                 hover:text-forest-600 transition-all duration-200"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right flex-shrink-0 min-w-[80px]">
                    <p className="font-bold text-gray-900 text-sm">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">RWF</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center
                               justify-center text-gray-400 hover:text-red-500
                               transition-all duration-200 flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-sm text-forest-600
                         hover:text-forest-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="card p-6 space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>

              {/* Promo code */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200
                               text-sm focus:outline-none focus:border-forest-400
                               focus:ring-2 focus:ring-forest-100"
                  />
                </div>
                <button className="px-4 py-2.5 bg-gray-100 hover:bg-forest-50
                                   text-gray-600 hover:text-forest-600 rounded-xl
                                   text-sm font-medium transition-all duration-200">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{total.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-forest-600 font-medium' : 'font-medium'}>
                    {delivery === 0 ? 'Free 🎉' : `${delivery.toLocaleString()} RWF`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-gray-400">
                    Add {(10000 - total).toLocaleString()} RWF more for free delivery
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-forest-600 text-lg">{grandTotal.toLocaleString()} RWF</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              {/* Payment methods */}
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">Secure payment via</p>
                <div className="flex justify-center gap-3">
                  {['MTN MoMo', 'Airtel Money', 'Cash'].map((method) => (
                    <span key={method}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, CreditCard, CheckCircle, ArrowLeft, Smartphone, Wallet } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const districts = ['Kigali', 'Musanze', 'Huye', 'Rubavu', 'Rwamagana', 'Nyanza', 'Kayonza', 'Muhanga', 'Rusizi', 'Gicumbi'];

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    district: user?.district || '',
    sector: '',
    details: '',
    phone: user?.phone || '',
    paymentMethod: 'cash_on_delivery',
    notes: '',
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Simulate MoMo payment for MTN/Airtel
    if (form.paymentMethod === 'mtn_momo' || form.paymentMethod === 'airtel_money') {
      await simulateMoMoPayment(form.phone, grandTotal, form.paymentMethod);
    }

    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    await api.post('/orders', {
      items: orderItems,
      deliveryAddress: {
        district: form.district,
        sector: form.sector,
        details: form.details,
      },
      paymentMethod: form.paymentMethod,
      notes: form.notes,
    });

    setSuccess(true);
    clearCart();
    toast.success('Order placed successfully! 🎉');
  } catch (err) {
    toast.error(err.message || err.response?.data?.message || 'Failed to place order');
  } finally {
    setLoading(false);
  }
};

const simulateMoMoPayment = async (phone, amount, method) => {
  return new Promise((resolve, reject) => {
    toast.loading(`📱 Sending ${method === 'mtn_momo' ? 'MTN MoMo' : 'Airtel Money'} request to ${phone}...`, { id: 'momo' });
    setTimeout(() => {
      toast.dismiss('momo');
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        toast.success(`✅ Payment of ${amount.toLocaleString()} RWF confirmed!`, { id: 'momo-success' });
        resolve({ status: 'success', transactionId: `TXN${Date.now()}` });
      } else {
        toast.error('Payment failed. Please try again.', { id: 'momo-error' });
        reject(new Error('Mobile Money payment failed. Please try again.'));
      }
    }, 3000); // 3 second simulation
  });
};

  });

  const delivery = total > 10000 ? 0 : 1500;
  const grandTotal = total + delivery;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = cart.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      await api.post('/orders', {
        items: orderItems,
        deliveryAddress: {
          district: form.district,
          sector: form.sector,
          details: form.details,
        },
        paymentMethod: form.paymentMethod,
        notes: form.notes,
      });

      setSuccess(true);
      clearCart();
      toast.success('Order placed successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="section-container py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center card p-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center
                         mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-forest-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-500 mt-2">
              Your order has been placed successfully. The farmer will prepare
              your fresh products and arrange delivery.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <Link to="/dashboard/customer" className="btn-primary">
                View My Orders
              </Link>
              <Link to="/marketplace" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="section-container py-10">

        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500
                                     hover:text-forest-600 mb-6 transition-colors duration-200">
          <ArrowLeft size={14} />
          Back to cart
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">

          {/* Left: forms */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery address */}
            <div className="card p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin size={18} className="text-forest-600" />
                Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">District</label>
                  <select
                    name="district" value={form.district} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                               text-sm focus:outline-none focus:border-forest-400
                               focus:ring-2 focus:ring-forest-100 text-gray-700"
                  >
                    <option value="">Select district</option>
                    {districts.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Sector</label>
                  <input
                    type="text" name="sector" value={form.sector} onChange={handleChange}
                    placeholder="e.g. Kimironko" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                               text-sm focus:outline-none focus:border-forest-400
                               focus:ring-2 focus:ring-forest-100"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Address Details</label>
                <textarea
                  name="details" value={form.details} onChange={handleChange}
                  placeholder="Street, house number, landmarks..." rows={3} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                             text-sm focus:outline-none focus:border-forest-400
                             focus:ring-2 focus:ring-forest-100 resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+250 788 000 000" required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white
                               text-sm focus:outline-none focus:border-forest-400
                               focus:ring-2 focus:ring-forest-100"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard size={18} className="text-forest-600" />
                Payment Method
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'mtn_momo', label: 'MTN MoMo', icon: <Smartphone size={20} />, color: 'text-yellow-600 bg-yellow-50' },
                  { id: 'airtel_money', label: 'Airtel Money', icon: <Smartphone size={20} />, color: 'text-red-600 bg-red-50' },
                  { id: 'cash_on_delivery', label: 'Cash on Delivery', icon: <Wallet size={20} />, color: 'text-forest-600 bg-forest-50' },
                ].map((method) => (
                  <button
                    key={method.id} type="button"
                    onClick={() => setForm({ ...form, paymentMethod: method.id })}
                    className={`p-4 rounded-2xl border-2 text-center transition-all duration-200
                      ${form.paymentMethod === method.id
                        ? 'border-forest-600 bg-forest-50'
                        : 'border-gray-200 hover:border-forest-200'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${method.color}`}>
                      {method.icon}
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{method.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card p-6 space-y-3">
              <h2 className="font-bold text-gray-900">Order Notes (optional)</h2>
              <textarea
                name="notes" value={form.notes} onChange={handleChange}
                placeholder="Any special instructions for the farmer or delivery..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                           text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 resize-none"
              />
            </div>
          </div>

          {/* Right: order summary */}
          <div className="space-y-4">
            <div className="card p-6 space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center text-xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
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
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-forest-600 text-lg">{grandTotal.toLocaleString()} RWF</span>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Place Order — {grandTotal.toLocaleString()} RWF</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
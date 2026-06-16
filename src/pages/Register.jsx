import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const districts = [
  'Kigali', 'Musanze', 'Huye', 'Rubavu', 'Rwamagana',
  'Nyanza', 'Kayonza', 'Muhanga', 'Rusizi', 'Gicumbi',
];

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    role: 'customer', phone: '', district: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register(form);
      if (user.role === 'farmer') navigate('/dashboard/farmer');
      else if (user.role === 'admin') navigate('/dashboard/admin');
      else navigate('/dashboard/customer');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100/40 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center shadow-glow">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">
            AgriLink <span className="text-forest-600">AI</span>
          </span>
        </Link>

        <div className="card p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-500 text-sm mt-1">Join Rwanda's agricultural marketplace</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600
                            text-sm rounded-xl px-4 py-3 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {['customer', 'farmer'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setForm({ ...form, role: r })}
                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                  ${form.role === r
                    ? 'border-forest-600 bg-forest-50 text-forest-600'
                    : 'border-gray-200 text-gray-500 hover:border-forest-200'
                  }`}
              >
                {r === 'customer' ? '🛒 Customer' : '👨‍🌾 Farmer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" name="name" value={form.name}
                onChange={handleChange} placeholder="Full name" required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="Email address" required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password" value={form.password}
                onChange={handleChange} placeholder="Password (min 6 chars)" required
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400
                           hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel" name="phone" value={form.phone}
                onChange={handleChange} placeholder="Phone (+250...)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="district" value={form.district}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200
                           appearance-none text-gray-700"
              >
                <option value="">Select district</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white
                                rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
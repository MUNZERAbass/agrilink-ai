import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin,
  LogOut, Leaf, ChevronRight, Star, Package,
  Clock, CheckCircle, Truck, Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const myOrders = [
  { id: '#ORD-081', items: 'Tomatoes x5kg, Beans x2kg', total: 6400, status: 'delivered', date: 'Jun 10, 2026', farmer: 'Jean Baptiste' },
  { id: '#ORD-074', items: 'Arabica Coffee x1kg', total: 3500, status: 'processing', date: 'Jun 12, 2026', farmer: 'Marie Claire' },
  { id: '#ORD-068', items: 'Fresh Milk x5L', total: 3000, status: 'pending', date: 'Jun 13, 2026', farmer: 'Claudine U.' },
];

const savedFarms = [
  { name: 'Musanze Farm', farmer: 'Jean Baptiste', district: 'Musanze', rating: 4.9, products: 8, image: '🌱' },
  { name: 'Huye Hills Farm', farmer: 'Marie Claire', district: 'Huye', rating: 5.0, products: 3, image: '☕' },
  { name: 'Kayonza Fruits', farmer: 'Solange M.', district: 'Kayonza', rating: 4.9, products: 6, image: '🍌' },
];

const statusConfig = {
  delivered: { color: 'bg-green-50 text-green-600 border-green-100', icon: <CheckCircle size={12} /> },
  processing: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <Truck size={12} /> },
  pending: { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: <Clock size={12} /> },
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> },
  { id: 'saved', label: 'Saved Farms', icon: <Heart size={18} /> },
];

export default function CustomerDashboard() {
  const [active, setActive] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">AgriLink <span className="text-forest-600">AI</span></span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-forest-50 rounded-2xl">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center text-white font-bold">
              {user?.name?.[0] || 'C'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user?.name || 'Customer'}</p>
              <p className="text-xs text-gray-400">{user?.district || 'Rwanda'}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                          transition-all duration-200
                          ${active === item.id
                            ? 'bg-forest-600 text-white shadow-glow'
                            : 'text-gray-600 hover:bg-forest-50 hover:text-forest-600'
                          }`}
            >
              {item.icon}
              {item.label}
              {active === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
          <Link
            to="/marketplace"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                       text-gray-600 hover:bg-forest-50 hover:text-forest-600 transition-all duration-200"
          >
            <Package size={18} />
            Browse Marketplace
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                             font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
            <Settings size={18} />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                       font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 ml-64">
        <div className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-30">
          <h1 className="font-bold text-gray-900 capitalize">{active}</h1>
          <p className="text-xs text-gray-400">Welcome back, {user?.name?.split(' ')[0]} 👋</p>
        </div>

        <div className="p-8">

          {/* ── Overview ── */}
          {active === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: '12', icon: '📦' },
                  { label: 'Total Spent', value: '48,200 RWF', icon: '💰' },
                  { label: 'Saved Farms', value: '3', icon: '❤️' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-5 text-center"
                  >
                    <span className="text-3xl">{s.icon}</span>
                    <p className="text-xl font-bold text-gray-900 mt-2">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Recent Orders</h3>
                  <button onClick={() => setActive('orders')}
                    className="text-xs text-forest-600 hover:underline font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {myOrders.map((order) => (
                    <div key={order.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center
                                      justify-center text-forest-600">
                        <Package size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{order.items}</p>
                        <p className="text-xs text-gray-400">{order.date} · {order.farmer}</p>
                      </div>
                      <span className="text-sm font-bold text-forest-600">
                        {order.total.toLocaleString()} RWF
                      </span>
                      <span className={`badge border text-xs flex items-center gap-1 ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].icon}
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="card p-6 bg-gradient-to-br from-forest-600 to-forest-700 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🤖</span>
                  <h3 className="font-bold">AI Recommendations for You</h3>
                </div>
                <p className="text-forest-100 text-sm mb-4">
                  Based on your order history, you might love:
                </p>
                <div className="flex gap-3 flex-wrap">
                  {['🥑 Avocados', '🥕 Carrots', '🍯 Honey', '🌽 Maize'].map((item) => (
                    <span key={item}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl
                                 text-sm font-medium cursor-pointer hover:bg-white/30
                                 transition-all duration-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Orders ── */}
          {active === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-bold text-gray-900">My Orders</h2>
              {myOrders.map((order) => (
                <div key={order.id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-400">{order.id}</span>
                      <p className="font-bold text-gray-900 text-sm mt-0.5">{order.items}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        👨‍🌾 {order.farmer} · {order.date}
                      </p>
                    </div>
                    <span className={`badge border text-xs flex items-center gap-1 ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].icon}
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-forest-600">
                      {order.total.toLocaleString()} RWF
                    </span>
                    {order.status === 'delivered' && (
                      <button className="flex items-center gap-1 text-xs text-amber-500
                                         hover:text-amber-600 font-medium transition-colors">
                        <Star size={12} />
                        Rate & Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Saved Farms ── */}
          {active === 'saved' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-bold text-gray-900">Saved Farms</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedFarms.map((farm) => (
                  <div key={farm.name} className="card p-5 space-y-3">
                    <div className="w-12 h-12 bg-forest-50 rounded-2xl flex items-center
                                    justify-center text-3xl">
                      {farm.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{farm.name}</h3>
                      <p className="text-xs text-gray-500">👨‍🌾 {farm.farmer}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        {farm.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {farm.district}
                      </span>
                      <span>{farm.products} products</span>
                    </div>
                    <button className="w-full btn-primary py-2 text-xs">
                      Shop This Farm
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
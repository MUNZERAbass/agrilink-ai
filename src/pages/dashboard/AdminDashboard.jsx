import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Package, ShoppingBag,
  LogOut, Leaf, ChevronRight, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Eye, Trash2, Settings, Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 120000, orders: 45 },
  { month: 'Feb', revenue: 180000, orders: 67 },
  { month: 'Mar', revenue: 150000, orders: 58 },
  { month: 'Apr', revenue: 220000, orders: 89 },
  { month: 'May', revenue: 195000, orders: 76 },
  { month: 'Jun', revenue: 310000, orders: 124 },
];

const users = [
  { id: 1, name: 'Jean Baptiste', email: 'farmer@agrilink.rw', role: 'farmer', district: 'Musanze', status: 'active', joined: 'Jun 1, 2026' },
  { id: 2, name: 'Alice Uwimana', email: 'customer@agrilink.rw', role: 'customer', district: 'Kigali', status: 'active', joined: 'Jun 5, 2026' },
  { id: 3, name: 'Marie Claire', email: 'marie@agrilink.rw', role: 'farmer', district: 'Huye', status: 'pending', joined: 'Jun 10, 2026' },
  { id: 4, name: 'Emmanuel K.', email: 'emmanuel@agrilink.rw', role: 'farmer', district: 'Rubavu', status: 'active', joined: 'Jun 12, 2026' },
  { id: 5, name: 'Claudine U.', email: 'claudine@agrilink.rw', role: 'customer', district: 'Rwamagana', status: 'active', joined: 'Jun 14, 2026' },
];

const products = [
  { id: 1, name: 'Fresh Tomatoes', farmer: 'Jean Baptiste', category: 'Vegetables', price: 800, stock: 150, status: 'approved' },
  { id: 2, name: 'Arabica Coffee', farmer: 'Marie Claire', category: 'Coffee', price: 3500, stock: 45, status: 'pending' },
  { id: 3, name: 'Irish Potatoes', farmer: 'Emmanuel K.', category: 'Vegetables', price: 400, stock: 8, status: 'approved' },
  { id: 4, name: 'Sweet Honey', farmer: 'Agnes K.', category: 'Organic', price: 4500, stock: 20, status: 'pending' },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'users', label: 'User Management', icon: <Users size={18} /> },
  { id: 'products', label: 'Product Moderation', icon: <Package size={18} /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-white">AgriLink</span>
              <span className="text-forest-400 font-bold ml-1">AI</span>
            </div>
          </div>
          <div className="mt-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-xs font-semibold text-red-400">⚙️ Admin Panel</p>
          </div>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
            <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center text-white font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">Super Admin</p>
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
                            ? 'bg-forest-600 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
            >
              {item.icon}
              {item.label}
              {active === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                             font-medium text-gray-400 hover:bg-white/5 transition-all">
            <Settings size={18} />Settings
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                       font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64">
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center
                        justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-bold text-gray-900 capitalize">{
              navItems.find(n => n.id === active)?.label
            }</h1>
            <p className="text-xs text-gray-400">AgriLink AI Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-gray-50 flex items-center
                               justify-center text-gray-500">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        <div className="p-8">

          {/* Overview */}
          {active === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: '1,247', trend: '+12%', up: true, icon: '👥' },
                  { label: 'Active Farmers', value: '486', trend: '+8%', up: true, icon: '👨‍🌾' },
                  { label: 'Total Revenue', value: '1.2M RWF', trend: '+24%', up: true, icon: '💰' },
                  { label: 'Pending Approvals', value: '14', trend: '-3', up: false, icon: '⏳' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className={`flex items-center gap-0.5 text-xs font-semibold
                        ${stat.up ? 'text-forest-600' : 'text-red-500'}`}>
                        {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Platform Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F6B45" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1F6B45" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#E5E7EB" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis stroke="#E5E7EB" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="revenue" name="Revenue (RWF)"
                      stroke="#1F6B45" strokeWidth={2.5} fill="url(#adminGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Farmers Verified', value: '312', icon: '✅' },
                  { label: 'Products Listed', value: '1,847', icon: '🌿' },
                  { label: 'Orders Completed', value: '4,209', icon: '📦' },
                ].map((s) => (
                  <div key={s.label} className="card p-5 text-center">
                    <span className="text-3xl">{s.icon}</span>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* User Management */}
          {active === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-gray-900">All Users ({users.length})</h2>
                <div className="flex gap-2">
                  {['All', 'Farmers', 'Customers'].map((f) => (
                    <button key={f}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100
                                 text-gray-600 hover:bg-forest-50 hover:text-forest-600
                                 transition-all duration-200">
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Name', 'Email', 'Role', 'District', 'Status', 'Joined', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold
                                               text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900 text-sm">{u.name}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{u.email}</td>
                        <td className="px-5 py-4">
                          <span className={`badge text-xs border ${
                            u.role === 'farmer'
                              ? 'bg-forest-50 text-forest-600 border-forest-100'
                              : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {u.role === 'farmer' ? '👨‍🌾' : '🛒'} {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-500">{u.district}</td>
                        <td className="px-5 py-4">
                          <span className={`badge border text-xs ${
                            u.status === 'active'
                              ? 'bg-green-50 text-green-600 border-green-100'
                              : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400">{u.joined}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button className="w-7 h-7 rounded-lg hover:bg-forest-50 hover:text-forest-600
                                               text-gray-400 flex items-center justify-center transition-all">
                              <Eye size={14} />
                            </button>
                            <button className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500
                                               text-gray-400 flex items-center justify-center transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Product Moderation */}
          {active === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-bold text-gray-900">Product Moderation</h2>
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Product', 'Farmer', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold
                                               text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900 text-sm">{p.name}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{p.farmer}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{p.category}</td>
                        <td className="px-5 py-4 text-sm font-bold text-forest-600">
                          {p.price.toLocaleString()} RWF
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-500">{p.stock} kg</td>
                        <td className="px-5 py-4">
                          <span className={`badge border text-xs ${
                            p.status === 'approved'
                              ? 'bg-green-50 text-green-600 border-green-100'
                              : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {p.status === 'pending' && (
                              <>
                                <button className="w-7 h-7 rounded-lg hover:bg-green-50 hover:text-green-600
                                                   text-gray-400 flex items-center justify-center transition-all">
                                  <CheckCircle size={14} />
                                </button>
                                <button className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500
                                                   text-gray-400 flex items-center justify-center transition-all">
                                  <XCircle size={14} />
                                </button>
                              </>
                            )}
                            <button className="w-7 h-7 rounded-lg hover:bg-gray-100
                                               text-gray-400 flex items-center justify-center transition-all">
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {active === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-bold text-gray-900">Platform Orders</h2>
              <div className="card p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" stroke="#E5E7EB" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis stroke="#E5E7EB" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                    <Bar dataKey="orders" name="Orders" fill="#1F6B45" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Pending', value: '23', color: 'bg-amber-50 text-amber-600' },
                  { label: 'Processing', value: '45', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Delivered', value: '312', color: 'bg-green-50 text-green-600' },
                  { label: 'Cancelled', value: '8', color: 'bg-red-50 text-red-600' },
                ].map((s) => (
                  <div key={s.label} className={`card p-5 text-center ${s.color}`}>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs font-semibold mt-1">{s.label}</p>
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
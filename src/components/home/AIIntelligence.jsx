import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Brain, BarChart3,
  Zap, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const priceData = [
  { month: 'Jan', tomatoes: 500, potatoes: 350, beans: 900 },
  { month: 'Feb', tomatoes: 550, potatoes: 380, beans: 850 },
  { month: 'Mar', tomatoes: 650, potatoes: 360, beans: 920 },
  { month: 'Apr', tomatoes: 480, potatoes: 400, beans: 880 },
  { month: 'May', tomatoes: 720, potatoes: 420, beans: 950 },
  { month: 'Jun', tomatoes: 800, potatoes: 390, beans: 1000 },
];

const demandData = [
  { product: 'Tomatoes', demand: 92, trend: 'up' },
  { product: 'Potatoes', demand: 78, trend: 'up' },
  { product: 'Coffee', demand: 95, trend: 'up' },
  { product: 'Beans', demand: 61, trend: 'down' },
  { product: 'Maize', demand: 74, trend: 'up' },
  { product: 'Milk', demand: 88, trend: 'down' },
];

const forecastData = [
  { week: 'W1', actual: 4200, forecast: 4100 },
  { week: 'W2', actual: 3800, forecast: 4000 },
  { week: 'W3', actual: 5100, forecast: 4800 },
  { week: 'W4', actual: 4700, forecast: 5000 },
  { week: 'W5', actual: null, forecast: 5400 },
  { week: 'W6', actual: null, forecast: 5800 },
];

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs shadow-card">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value?.toLocaleString()} RWF
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── AI Intelligence Section ─────────────────────────────────────────────────
export default function AIIntelligence() {
  const [activeTab, setActiveTab] = useState('forecast');

  const tabs = [
    { id: 'forecast', label: 'Demand Forecast', icon: <Brain size={14} /> },
    { id: 'prices', label: 'Price Trends', icon: <BarChart3 size={14} /> },
    { id: 'demand', label: 'Top Demanded', icon: <TrendingUp size={14} /> },
  ];

  return (
    <section className="section-padding bg-gray-950 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                      bg-forest-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 badge bg-forest-900 text-forest-400
                           border border-forest-800 mb-4">
            <Zap size={12} />
            AI Intelligence Center
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Data-Driven
            <span className="text-gradient"> Agricultural</span>
            <br />Insights
          </h2>
          <p className="text-gray-400 mt-4">
            Real-time market intelligence powered by machine learning
            to help farmers maximize profits.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-300
                          ${activeTab === tab.id
                            ? 'bg-forest-600 text-white shadow-glow'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-dark rounded-3xl p-6 lg:p-8"
        >

          {/* Forecast Tab */}
          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Weekly Order Forecast</h3>
                  <p className="text-gray-400 text-sm">Actual vs AI predicted orders</p>
                </div>
                <span className="badge bg-forest-900/50 text-forest-400 border border-forest-800">
                  Next 2 weeks predicted
                </span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F6B45" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1F6B45" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8A6E4B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8A6E4B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="actual" name="Actual"
                    stroke="#1F6B45" strokeWidth={2} fill="url(#actualGrad)" connectNulls={false} />
                  <Area type="monotone" dataKey="forecast" name="Forecast"
                    stroke="#8A6E4B" strokeWidth={2} strokeDasharray="5 5" fill="url(#forecastGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Price Trends Tab */}
          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Price Trends (RWF/kg)</h3>
                  <p className="text-gray-400 text-sm">January — June 2026</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={priceData}>
                  <XAxis dataKey="month" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="tomatoes" name="Tomatoes"
                    stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
                  <Line type="monotone" dataKey="potatoes" name="Potatoes"
                    stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
                  <Line type="monotone" dataKey="beans" name="Beans"
                    stroke="#1F6B45" strokeWidth={2} dot={{ fill: '#1F6B45', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Demanded Tab */}
          {activeTab === 'demand' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold text-lg">Top Demanded Products</h3>
                <p className="text-gray-400 text-sm">Based on order patterns this month</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {demandData.map((item, i) => (
                  <div key={item.product}
                    className="flex items-center gap-4 bg-white/5 rounded-2xl p-4
                               hover:bg-white/10 transition-colors duration-200">
                    <span className="text-2xl font-black text-white/10 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{item.product}</span>
                        <span className={`flex items-center gap-1 text-xs font-bold
                          ${item.trend === 'up' ? 'text-forest-400' : 'text-red-400'}`}>
                          {item.trend === 'up'
                            ? <ArrowUpRight size={12} />
                            : <ArrowDownRight size={12} />
                          }
                          {item.demand}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.demand}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            item.trend === 'up' ? 'bg-forest-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Prediction Accuracy', value: '94.2%', icon: '🎯' },
            { label: 'Farmers Using AI', value: '1,204', icon: '🧠' },
            { label: 'Revenue Optimized', value: '+28%', icon: '📈' },
            { label: 'Waste Reduced', value: '41%', icon: '♻️' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-5 text-center border border-white/5"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
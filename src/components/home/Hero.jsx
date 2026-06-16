import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, TrendingUp, Users, ShoppingBag, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Floating Stat Card ──────────────────────────────────────────────────────
function StatCard({ icon, label, value, trend, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={`glass rounded-2xl p-4 min-w-[160px] ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 bg-forest-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span className="text-xs font-semibold text-forest-600 flex items-center gap-0.5">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Animated Map Placeholder ────────────────────────────────────────────────
function MapVisual() {
  const farmers = [
    { top: '20%', left: '30%', label: 'Kigali', products: 'Tomatoes' },
    { top: '40%', left: '55%', label: 'Musanze', products: 'Potatoes' },
    { top: '60%', left: '35%', label: 'Huye', products: 'Coffee' },
    { top: '30%', left: '70%', label: 'Rwamagana', products: 'Maize' },
    { top: '70%', left: '60%', label: 'Nyanza', products: 'Beans' },
  ];

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-3xl overflow-hidden
                    bg-gradient-to-br from-forest-50 via-cream-100 to-forest-100
                    border border-forest-100 shadow-card">

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(31,107,69,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,107,69,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Rwanda outline glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-forest-600/5 border border-forest-200/30
                        flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-forest-600/10 border border-forest-300/40
                          flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-forest-600/20 border border-forest-400/50
                            flex items-center justify-center">
              <Leaf size={24} className="text-forest-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Farmer location markers */}
      {farmers.map((farmer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.4, ease: 'backOut' }}
          className="absolute"
          style={{ top: farmer.top, left: farmer.left }}
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 -m-3">
            <div className="w-8 h-8 rounded-full bg-forest-400/30 animate-ping" />
          </div>

          {/* Marker */}
          <div className="relative w-8 h-8 bg-forest-600 rounded-full border-2 border-white
                          shadow-glow flex items-center justify-center cursor-pointer
                          hover:scale-110 transition-transform duration-200 group">
            <MapPin size={14} className="text-white" />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                            bg-white rounded-xl shadow-card px-3 py-2 min-w-[120px]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            pointer-events-none z-10">
              <p className="text-xs font-bold text-gray-900">{farmer.label}</p>
              <p className="text-xs text-forest-600">{farmer.products}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connection lines between markers */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="30%" y1="20%" x2="55%" y2="40%" stroke="#1F6B45" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="55%" y1="40%" x2="35%" y2="60%" stroke="#1F6B45" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="55%" y1="40%" x2="70%" y2="30%" stroke="#1F6B45" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="35%" y1="60%" x2="60%" y2="70%" stroke="#1F6B45" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass rounded-xl px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">
            🇷🇼 Rwanda Agricultural Network
          </span>
          <span className="badge-green text-[10px]">Live</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function Hero() {
  const [count, setCount] = useState({ farmers: 0, products: 0, orders: 0 });

  // Animate counters on mount
  useEffect(() => {
    const targets = { farmers: 2847, products: 12650, orders: 486 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic

      setCount({
        farmers: Math.round(targets.farmers * eased),
        products: Math.round(targets.products * eased),
        orders: Math.round(targets.orders * eased),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right blob */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
                        bg-gradient-radial from-forest-100 to-transparent opacity-60" />
        {/* Bottom left blob */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full
                        bg-gradient-radial from-cream-200 to-transparent opacity-80" />
        {/* Center subtle pattern */}
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)] py-12">

          {/* ── Left: Text Content ── */}
          <div className="space-y-8">

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 badge-green px-4 py-2 text-sm">
                <Sparkles size={14} className="text-forest-600" />
                AI-Powered Agricultural Marketplace
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="space-y-2"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900">
                Connecting
                <br />
                <span className="text-gradient">Rwanda's Farms</span>
                <br />
                to the Future
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-500 leading-relaxed max-w-lg"
            >
              Buy directly from verified farmers, discover fresh local produce,
              and leverage AI-powered agricultural insights across Rwanda.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/marketplace" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                <ShoppingBag size={18} />
                Explore Marketplace
                <ArrowRight size={16} />
              </Link>
              <Link to="/map" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                <MapPin size={18} />
                Find Farmers Near Me
              </Link>
            </motion.div>

            {/* Live stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-6 pt-4 border-t border-gray-100"
            >
              {[
                { label: 'Verified Farmers', value: count.farmers.toLocaleString(), icon: '👨‍🌾' },
                { label: 'Fresh Products', value: count.products.toLocaleString(), icon: '🌿' },
                { label: 'Orders Today', value: count.orders.toLocaleString(), icon: '📦' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Map Visual + Floating Cards ── */}
          <div className="relative">

            {/* Floating stat cards */}
            <StatCard
              icon={<Users size={14} className="text-forest-600" />}
              label="Active Farmers"
              value="2,847"
              trend="+12%"
              delay={1.0}
              className="absolute -top-4 -left-4 z-10 animate-float"
            />

            <StatCard
              icon={<ShoppingBag size={14} className="text-earth-500" />}
              label="Products Listed"
              value="12,650"
              trend="+8%"
              delay={1.2}
              className="absolute -bottom-4 -left-8 z-10 animate-float-delayed"
            />

            <StatCard
              icon={<TrendingUp size={14} className="text-forest-600" />}
              label="AI Forecast"
              value="↑ Tomatoes"
              delay={1.4}
              className="absolute -top-4 -right-4 z-10 animate-float"
            />

            {/* Main map visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <MapVisual />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
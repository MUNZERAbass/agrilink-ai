import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'RAB', label: 'Rwanda Agriculture Board', emoji: '🏛️' },
  { name: 'Cooperatives', label: 'Farm Cooperatives', emoji: '🤝' },
  { name: 'Restaurants', label: 'Top Restaurants', emoji: '🍽️' },
  { name: 'Hotels', label: 'Kigali Hotels', emoji: '🏨' },
  { name: 'Retailers', label: 'Retail Chains', emoji: '🏪' },
  { name: 'NGOs', label: 'Agricultural NGOs', emoji: '🌍' },
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-gray-100 bg-cream-100/40">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10"
        >
          Trusted by Rwanda's leading agricultural partners
        </motion.p>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-card
                         hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <p className="text-sm font-bold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-400">{p.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
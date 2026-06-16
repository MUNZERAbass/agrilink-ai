import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, ShoppingCart, Truck, CreditCard, Star } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: 'Farmers List Products',
    desc: 'Verified farmers register and list fresh produce with real-time inventory updates.',
    color: 'bg-forest-50 text-forest-600',
    step: '01',
  },
  {
    icon: <Search size={24} />,
    title: 'Customers Discover',
    desc: 'Browse by location, category, or let AI recommend what\'s fresh near you.',
    color: 'bg-blue-50 text-blue-600',
    step: '02',
  },
  {
    icon: <ShoppingCart size={24} />,
    title: 'Place Your Order',
    desc: 'Add to cart, choose quantity, and checkout in seconds.',
    color: 'bg-purple-50 text-purple-600',
    step: '03',
  },
  {
    icon: <Truck size={24} />,
    title: 'Delivery Arranged',
    desc: 'Choose pickup or delivery. Track your order in real-time.',
    color: 'bg-amber-50 text-amber-600',
    step: '04',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Payment Completed',
    desc: 'Pay securely via MTN MoMo, Airtel Money, or cash on delivery.',
    color: 'bg-emerald-50 text-emerald-600',
    step: '05',
  },
  {
    icon: <Star size={24} />,
    title: 'Rate & Review',
    desc: 'Share your experience and help others discover the best farmers.',
    color: 'bg-rose-50 text-rose-600',
    step: '06',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-cream-100/40">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="badge-green mb-4">⚡ Simple Process</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            How <span className="text-gradient">AgriLink AI</span> Works
          </h2>
          <p className="text-gray-500 mt-4">
            From farm to your table in a few simple steps.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color}`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-gray-100">{step.step}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
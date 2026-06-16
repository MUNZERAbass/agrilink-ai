import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Globe, Share2, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const links = {
  Platform: ['Marketplace', 'Find Farmers', 'AI Insights', 'Bulk Orders', 'Pricing'],
  Farmers: ['Register Farm', 'List Products', 'Analytics', 'Verification', 'Success Stories'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5">
      <div className="section-container py-16">

        {/* Top row */}
        <div className="grid lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">AgriLink</span>
                <span className="text-xs font-semibold text-forest-400 tracking-widest uppercase ml-1">AI</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Connecting Rwanda's farms to the future through intelligent
              technology and direct farmer-to-consumer commerce.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-forest-500" />
                Kigali, Rwanda
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-forest-500" />
                hello@agrilinkai.rw
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-forest-500" />
                +250 788 000 000
              </div>
            </div>
            <div className="flex gap-3">
              {[Globe, Share2, MessageCircle].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/5 hover:bg-forest-600 rounded-xl
                             flex items-center justify-center text-gray-400
                             hover:text-white transition-all duration-300">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link to="#"
                      className="text-gray-400 hover:text-forest-400 text-sm
                                 transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 AgriLink AI. Built with ❤️ for Rwanda's farmers.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
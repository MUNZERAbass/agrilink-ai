import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ShoppingCart, Heart, Zap } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    farmer: 'Jean Baptiste',
    farm: 'Musanze Farm',
    district: 'Musanze',
    price: 800,
    unit: 'kg',
    rating: 4.9,
    reviews: 124,
    stock: 'In Stock',
    delivery: true,
    distance: '12 km',
    image: '🍅',
    category: 'Vegetables',
    verified: true,
  },
  {
    id: 2,
    name: 'Arabica Coffee',
    farmer: 'Marie Claire',
    farm: 'Huye Hills Farm',
    district: 'Huye',
    price: 3500,
    unit: 'kg',
    rating: 5.0,
    reviews: 89,
    stock: 'In Stock',
    delivery: true,
    distance: '45 km',
    image: '☕',
    category: 'Coffee & Tea',
    verified: true,
  },
  {
    id: 3,
    name: 'Irish Potatoes',
    farmer: 'Emmanuel K.',
    farm: 'Rubavu Highlands',
    district: 'Rubavu',
    price: 400,
    unit: 'kg',
    rating: 4.7,
    reviews: 203,
    stock: 'Low Stock',
    delivery: false,
    distance: '8 km',
    image: '🥔',
    category: 'Vegetables',
    verified: true,
  },
  {
    id: 4,
    name: 'Fresh Milk',
    farmer: 'Claudine U.',
    farm: 'Eastern Dairy',
    district: 'Rwamagana',
    price: 600,
    unit: 'liter',
    rating: 4.8,
    reviews: 67,
    stock: 'In Stock',
    delivery: true,
    distance: '22 km',
    image: '🥛',
    category: 'Dairy',
    verified: false,
  },
  {
    id: 5,
    name: 'Organic Beans',
    farmer: 'Pierre N.',
    farm: 'Southern Organics',
    district: 'Nyanza',
    price: 1200,
    unit: 'kg',
    rating: 4.6,
    reviews: 45,
    stock: 'In Stock',
    delivery: true,
    distance: '31 km',
    image: '🫘',
    category: 'Grains',
    verified: true,
  },
  {
    id: 6,
    name: 'Sweet Bananas',
    farmer: 'Solange M.',
    farm: 'Kayonza Fruits',
    district: 'Kayonza',
    price: 500,
    unit: 'bunch',
    rating: 4.9,
    reviews: 156,
    stock: 'In Stock',
    delivery: true,
    distance: '18 km',
    image: '🍌',
    category: 'Fruits',
    verified: true,
  },
];

// ─── Single Product Card ─────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card p-0 overflow-hidden group cursor-pointer"
    >
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-forest-50 to-cream-100
                      flex items-center justify-center overflow-hidden">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </span>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge-green text-[10px]">{product.category}</span>
          {product.verified && (
            <span className="badge bg-blue-50 text-blue-600 border border-blue-100 text-[10px]">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm
                           rounded-xl flex items-center justify-center
                           hover:bg-white hover:text-red-500 transition-all duration-200
                           text-gray-400 shadow-sm">
          <Heart size={14} />
        </button>

        {/* Stock status */}
        <div className="absolute bottom-3 right-3">
          <span className={`badge text-[10px] ${
            product.stock === 'In Stock'
              ? 'bg-green-50 text-green-600 border border-green-100'
              : 'bg-amber-50 text-amber-600 border border-amber-100'
          }`}>
            {product.stock === 'Low Stock' && '⚠️ '}{product.stock}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        {/* Product name + price */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-5 h-5 bg-forest-100 rounded-full flex items-center justify-center">
                <span className="text-[10px]">👨‍🌾</span>
              </div>
              <span className="text-xs text-gray-500">{product.farmer}</span>
              {product.verified && (
                <span className="text-forest-600 text-[10px]">✓</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-forest-600">
              {product.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-400"> RWF</span>
            </p>
            <p className="text-xs text-gray-400">per {product.unit}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <strong className="text-gray-700">{product.rating}</strong>
            ({product.reviews})
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {product.distance}
          </span>
          {product.delivery && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1 text-forest-600">
                <Zap size={11} />
                Delivery
              </span>
            </>
          )}
        </div>

        {/* Add to cart */}
        <button className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2">
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// ─── Smart Marketplace Section ───────────────────────────────────────────────
export default function ProductCards() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-green mb-3">🌿 Smart Marketplace</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Fresh from the
              <span className="text-gradient"> Farm</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg">
              Discover verified, fresh produce directly from Rwanda's best farmers.
              AI-matched to your preferences and location.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap"
          >
            {['All', 'Vegetables', 'Fruits', 'Dairy', 'Coffee', 'Grains'].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${cat === 'All'
                    ? 'bg-forest-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-forest-50 hover:text-forest-600'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-secondary px-10 py-4 text-base">
            View All Products →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
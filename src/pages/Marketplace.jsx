import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, Zap, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';

const allProducts = [
  { _id: '1', name: 'Fresh Tomatoes', farmer: 'Jean Baptiste', farm: 'Musanze Farm', district: 'Musanze', price: 800, unit: 'kg', rating: 4.9, reviews: 124, stock: 'In Stock', delivery: true, distance: '12 km', image: '🍅', category: 'Vegetables', verified: true },
  { _id: '2', name: 'Arabica Coffee', farmer: 'Marie Claire', farm: 'Huye Hills Farm', district: 'Huye', price: 3500, unit: 'kg', rating: 5.0, reviews: 89, stock: 'In Stock', delivery: true, distance: '45 km', image: '☕', category: 'Coffee', verified: true },
  { _id: '3', name: 'Irish Potatoes', farmer: 'Emmanuel K.', farm: 'Rubavu Highlands', district: 'Rubavu', price: 400, unit: 'kg', rating: 4.7, reviews: 203, stock: 'Low Stock', delivery: false, distance: '8 km', image: '🥔', category: 'Vegetables', verified: true },
  { _id: '4', name: 'Fresh Milk', farmer: 'Claudine U.', farm: 'Eastern Dairy', district: 'Rwamagana', price: 600, unit: 'liter', rating: 4.8, reviews: 67, stock: 'In Stock', delivery: true, distance: '22 km', image: '🥛', category: 'Dairy', verified: false },
  { _id: '5', name: 'Organic Beans', farmer: 'Pierre N.', farm: 'Southern Organics', district: 'Nyanza', price: 1200, unit: 'kg', rating: 4.6, reviews: 45, stock: 'In Stock', delivery: true, distance: '31 km', image: '🫘', category: 'Grains', verified: true },
  { _id: '6', name: 'Sweet Bananas', farmer: 'Solange M.', farm: 'Kayonza Fruits', district: 'Kayonza', price: 500, unit: 'bunch', rating: 4.9, reviews: 156, stock: 'In Stock', delivery: true, distance: '18 km', image: '🍌', category: 'Fruits', verified: true },
  { _id: '7', name: 'Green Avocados', farmer: 'Diane H.', farm: 'Northern Farms', district: 'Gicumbi', price: 1500, unit: 'dozen', rating: 4.8, reviews: 92, stock: 'In Stock', delivery: true, distance: '28 km', image: '🥑', category: 'Fruits', verified: true },
  { _id: '8', name: 'Fresh Eggs', farmer: 'Robert M.', farm: 'Kigali Poultry', district: 'Kigali', price: 2000, unit: 'tray', rating: 4.7, reviews: 188, stock: 'In Stock', delivery: true, distance: '5 km', image: '🥚', category: 'Livestock', verified: true },
  { _id: '9', name: 'Sweet Honey', farmer: 'Agnes K.', farm: 'Nyungwe Honey', district: 'Rusizi', price: 4500, unit: 'kg', rating: 5.0, reviews: 34, stock: 'Low Stock', delivery: false, distance: '67 km', image: '🍯', category: 'Organic', verified: true },
  { _id: '10', name: 'Green Tea', farmer: 'Felix N.', farm: 'Mulindi Tea', district: 'Rulindo', price: 2800, unit: 'kg', rating: 4.9, reviews: 71, stock: 'In Stock', delivery: true, distance: '35 km', image: '🍵', category: 'Tea', verified: true },
  { _id: '11', name: 'Maize Flour', farmer: 'Vestine U.', farm: 'Eastern Plains', district: 'Kayonza', price: 700, unit: 'kg', rating: 4.5, reviews: 143, stock: 'In Stock', delivery: true, distance: '41 km', image: '🌽', category: 'Grains', verified: false },
  { _id: '12', name: 'Fresh Carrots', farmer: 'Innocent B.', farm: 'Volcanic Farms', district: 'Musanze', price: 600, unit: 'kg', rating: 4.6, reviews: 88, stock: 'In Stock', delivery: true, distance: '14 km', image: '🥕', category: 'Vegetables', verified: true },
];

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Coffee', 'Tea', 'Grains', 'Livestock', 'Organic'];
const districts = ['All Districts', 'Kigali', 'Musanze', 'Huye', 'Rubavu', 'Rwamagana', 'Nyanza', 'Kayonza', 'Gicumbi', 'Rusizi', 'Rulindo'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Nearest'];

function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-0 overflow-hidden group cursor-pointer"
    >
      <div className="relative h-44 bg-gradient-to-br from-forest-50 to-cream-100
                      flex items-center justify-center overflow-hidden">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </span>
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="badge-green text-[10px]">{product.category}</span>
          {product.verified && (
            <span className="badge bg-blue-50 text-blue-600 border border-blue-100 text-[10px]">✓</span>
          )}
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm
                           rounded-xl flex items-center justify-center hover:text-red-500
                           text-gray-400 transition-all duration-200">
          <Heart size={14} />
        </button>
        <div className="absolute bottom-3 right-3">
          <span className={`badge text-[10px] ${
            product.stock === 'In Stock'
              ? 'bg-green-50 text-green-600 border border-green-100'
              : 'bg-amber-50 text-amber-600 border border-amber-100'
          }`}>
            {product.stock}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">👨‍🌾 {product.farmer}</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-forest-600">
              {product.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-400"> RWF</span>
            </p>
            <p className="text-xs text-gray-400">/{product.unit}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <strong className="text-gray-700">{product.rating}</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1"><MapPin size={10} />{product.distance}</span>
          {product.delivery && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-forest-600 flex items-center gap-1"><Zap size={10} />Delivery</span>
            </>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [district, setDistrict] = useState('All Districts');
  const [sort, setSort] = useState('Latest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allProducts
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => district === 'All Districts' || p.district === district)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
                   p.farmer.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Top Rated') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="badge-green mb-3">🌿 Fresh & Local</span>
            <h1 className="text-3xl font-bold text-gray-900">
              Rwanda's Agricultural Marketplace
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {filtered.length} products from verified farmers across Rwanda
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="flex gap-3 mt-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, farmers, districts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200
                           bg-white text-sm focus:outline-none focus:border-forest-400
                           focus:ring-2 focus:ring-forest-100 transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium
                          transition-all duration-200
                          ${showFilters
                            ? 'bg-forest-600 text-white border-forest-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-forest-300'
                          }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid sm:grid-cols-3 gap-3 mt-4"
            >
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                           text-sm focus:outline-none focus:border-forest-400 text-gray-700"
              >
                {districts.map((d) => <option key={d}>{d}</option>)}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                           text-sm focus:outline-none focus:border-forest-400 text-gray-700"
              >
                {sortOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setDistrict('All Districts'); setSort('Latest'); }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white
                           text-sm text-gray-500 hover:text-red-500 hover:border-red-200
                           transition-all duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                            transition-all duration-200 flex-shrink-0
                            ${category === cat
                              ? 'bg-forest-600 text-white'
                              : 'bg-white text-gray-600 border border-gray-200 hover:border-forest-300'
                            }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="section-container py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🌾</span>
            <p className="text-gray-500 mt-4 font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Heart, Truck, CreditCard } from 'lucide-react';

const orderData = [
  { month: 'Jan', orders: 4, spent: 24000 },
  { month: 'Feb', orders: 3, spent: 18000 },
  { month: 'Mar', orders: 5, spent: 32000 },
  { month: 'Apr', orders: 3, spent: 21000 },
  { month: 'May', orders: 6, spent: 38000 },
];

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingBag className="w-10 h-10 text-blue-600" />
            My Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Track orders, favorites, and delivery history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">12</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Favorites</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">8</p>
              </div>
              <Heart className="w-12 h-12 text-red-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Spent (RWF)</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">85K</p>
              </div>
              <CreditCard className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Deliveries</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">10</p>
              </div>
              <Truck className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="spent" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Items</th>
                  <th className="px-4 py-3 text-left font-semibold">Total (RWF)</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD001</td>
                  <td className="px-4 py-3">Fresh Tomatoes, Cabbage</td>
                  <td className="px-4 py-3">12,500</td>
                  <td className="px-4 py-3"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Delivered</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD002</td>
                  <td className="px-4 py-3">Bananas, Avocado</td>
                  <td className="px-4 py-3">8,000</td>
                  <td className="px-4 py-3"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">In Transit</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD003</td>
                  <td className="px-4 py-3">Organic Milk, Eggs</td>
                  <td className="px-4 py-3">15,000</td>
                  <td className="px-4 py-3"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Products You May Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Fresh Lettuce', price: '3,500 RWF', rating: 4.8 },
              { name: 'Raw Honey', price: '8,000 RWF', rating: 4.9 },
              { name: 'Coffee Beans', price: '12,000 RWF', rating: 4.7 },
            ].map((product, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition">
                <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-green-600 font-bold">{product.price}</p>
                <p className="text-xs text-yellow-500 mt-2">⭐ {product.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

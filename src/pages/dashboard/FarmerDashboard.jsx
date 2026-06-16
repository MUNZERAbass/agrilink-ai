import React from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Leaf,
  Plus,
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 180000 },
  { month: 'Mar', revenue: 260000 },
  { month: 'Apr', revenue: 210000 },
  { month: 'May', revenue: 340000 },
  { month: 'Jun', revenue: 420000 },
];

const orders = [
  {
    id: '#AG1001',
    customer: 'Jean Claude',
    amount: '25,000',
    status: 'Delivered',
  },
  {
    id: '#AG1002',
    customer: 'Marie Uwase',
    amount: '18,500',
    status: 'Processing',
  },
  {
    id: '#AG1003',
    customer: 'Eric Mugisha',
    amount: '42,000',
    status: 'Pending',
  },
];

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-cream-100/40">
      <div className="section-container py-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <span className="badge-green mb-3">
              🌱 Farmer Portal
            </span>

            <h1 className="text-4xl font-bold text-gray-900">
              Farmer Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage products, orders, customers and revenue.
            </p>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Products
                </p>
                <h2 className="text-3xl font-bold mt-2">
                  12
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center">
                <Package className="text-forest-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Orders
                </p>
                <h2 className="text-3xl font-bold mt-2">
                  48
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <ShoppingBag className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Revenue
                </p>
                <h2 className="text-3xl font-bold mt-2">
                  425K
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                <TrendingUp className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Customers
                </p>
                <h2 className="text-3xl font-bold mt-2">
                  35
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                <Users className="text-purple-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Revenue Chart */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="text-forest-600" />
            <h3 className="text-xl font-semibold">
              Revenue Analytics
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6B45" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1F6B45" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1F6B45"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-6">
            Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">
                    Order
                  </th>
                  <th className="text-left py-4">
                    Customer
                  </th>
                  <th className="text-left py-4">
                    Amount
                  </th>
                  <th className="text-left py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4">
                      {order.id}
                    </td>

                    <td className="py-4">
                      {order.customer}
                    </td>

                    <td className="py-4">
                      {order.amount} RWF
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
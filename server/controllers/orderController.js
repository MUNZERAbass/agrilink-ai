const Order = require('../models/Order');
const Product = require('../models/Product');

// @POST /api/orders
const createOrder = async (req, res) => {
  const { items, deliveryAddress, paymentMethod, notes } = req.body;

  if (!items?.length) return res.status(400).json({ message: 'No items in order' });

  // Calculate total
  let totalAmount = 0;
  for (const item of items) {
    totalAmount += item.price * item.quantity;
  }

  const order = await Order.create({
    customer: req.user._id,
    items,
    totalAmount,
    deliveryAddress,
    paymentMethod,
    notes,
  });

  res.status(201).json(order);
};

// @GET /api/orders/my
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id })
    .populate('items.product', 'name images')
    .sort({ createdAt: -1 });
  res.json(orders);
};

// @GET /api/orders/:id
const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('customer', 'name email phone')
    .populate('items.product', 'name images price');

  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

// @PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status;
  await order.save();
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getOrder, updateOrderStatus };

const Product = require('../models/Product');

// @GET /api/products
const getProducts = async (req, res) => {
  const { category, district, search, page = 1, limit = 12 } = req.query;

  const query = { isAvailable: true };
  if (category) query.category = category;
  if (district) query.district = district;
  if (search) query.name = { $regex: search, $options: 'i' };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate('farmer', 'name district avatar')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
};

// @GET /api/products/:id
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('farmer', 'name district avatar phone');

  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// @POST /api/products
const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, farmer: req.user._id });
  res.status(201).json(product);
};

// @PUT /api/products/:id
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (product.farmer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.deleteOne();
  res.json({ message: 'Product removed' });
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

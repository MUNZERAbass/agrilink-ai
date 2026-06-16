const express = require('express');
const router = express.Router();
const {
  getProducts, getProduct,
  createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');
const { protect, farmerOnly } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, farmerOnly, createProduct);
router.put('/:id', protect, farmerOnly, updateProduct);
router.delete('/:id', protect, farmerOnly, deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
// controller functions load
const {
  getAllProducts,
  getProductById,
  addProduct,
} = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth');

// Define routes for products
router.get('/', requireAuth, getAllProducts);
router.get('/:productId', requireAuth, getProductById);
// add products
router.post('/', requireAuth, addProduct);
// Add more routes as needed

module.exports = router;

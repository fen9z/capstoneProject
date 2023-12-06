const express = require('express');
const router = express.Router();
// controller functions load
const {
  getAllProducts,
  getProductById,
  addProduct,
  allProducts,
  updateProduct,
} = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth');

// Define routes for products
router.get('/', requireAuth, getAllProducts);

// add products
router.post('/', requireAuth, addProduct);

router.get('/all', allProducts);

router.get('/:productId', requireAuth, getProductById);

// update a product
router.patch('/:productId', requireAuth, updateProduct);

// Add more routes as needed

module.exports = router;

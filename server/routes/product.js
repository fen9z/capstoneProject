const express = require('express');
const router = express.Router();
// controller functions load
const {
  getAllProducts,
  getProductById,
  addProduct,
  allProducts,
  updateProduct,
  threeNewProducts,
} = require('../controllers/productController');
const requireAuth = require('../middleware/requireAuth');

// Define routes for products
router.get('/', requireAuth, getAllProducts);

// add products
router.post('/', requireAuth, addProduct);

router.get('/all', allProducts);

// get 3 new products
router.get('/threeNewProducts', requireAuth, threeNewProducts);

router.get('/:productId', requireAuth, getProductById);

// update a product
router.patch('/:productId', requireAuth, updateProduct);

// Add more routes as needed

module.exports = router;

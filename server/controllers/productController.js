const Product = require('../models/productModel');

//  get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    if (search) {
      const products = await Product.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      });
      if (category != 'all') {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        return res.json(filteredProducts);
      }
      return res.json(products);
    } else {
      const products = await Product.find();
      if (category != 'all') {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        return res.json(filteredProducts);
      }
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get a single product
const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// add products
const addProduct = async (req, res) => {
  const {
    itemId,
    name,
    price,
    description,
    image,
    category,
    storageNumber,
    holdedNumber,
    realUrl,
  } = req.body;
  try {
    const product = new Product({
      itemId,
      name,
      price,
      description,
      image,
      category,
      storageNumber,
      holdedNumber,
      realUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Add more controller functions as needed

module.exports = { getAllProducts, getProductById, addProduct };

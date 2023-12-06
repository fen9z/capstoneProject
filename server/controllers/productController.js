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
      }).sort({ createdAt: -1 });
      if (category != 'all') {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        return res.json(filteredProducts);
      }
      return res.json(products);
    } else {
      const products = await Product.find().sort({ createdAt: -1 });
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
  try {
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// adminAllProducts
const allProducts = async (req, res) => {
  try {
    let filter = req.query.filter || ''; // from url get filter parameter
    let filterRegex = new RegExp(filter, 'i'); // create regex for filter

    const products = await Product.find({
      $or: [
        { name: filterRegex },
        { category: filterRegex },
        { storePlace: filterRegex },
        { description: filterRegex },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    // update product
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.body,
      },
      {
        new: true, // return updated product, if false return old product
      }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add more controller functions as needed

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  allProducts,
  updateProduct,
};

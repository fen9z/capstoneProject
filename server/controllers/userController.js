const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create token for login and signup
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // call User model static login method
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, isAdmin: user.isAdmin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, name, address, postalCode } = req.body;

  try {
    const user = await User.signup(email, password, name, address, postalCode);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users
const getUsers = async (req, res) => {
  try {
    let filter = req.query.filter || ''; // from url get filter parameter
    let filterRegex = new RegExp(filter, 'i'); // create regex for filter

    // use filterRegex to find users with matching name, email, or address
    const users = await User.find({
      $or: [
        { name: filterRegex },
        { email: filterRegex },
        { address: filterRegex },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUsers };

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
  const { email, password, firstName, lastName, address, postalCode } =
    req.body;

  try {
    const user = await User.signup(
      email,
      password,
      firstName,
      lastName,
      address,
      postalCode
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users and filter, but only for admin
const getUsers = async (req, res) => {
  try {
    let filter = req.query.filter || ''; // from url get filter parameter
    let filterRegex = new RegExp(filter, 'i'); // create regex for filter

    // use filterRegex to find users with matching name, email, or address
    const users = await User.find({
      $or: [
        { firstName: filterRegex },
        { email: filterRegex },
        { address: filterRegex },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single user information
const getUserInfo = async (req, res) => {
  try {
    // loaded user info stored in req.user，this is requireAuth middleware set
    const userInfo = req.user;
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user by id
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, address, postalCode, isAdmin } = req.body;
    // update user
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, address, postalCode, isAdmin },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  getUserInfo,
  updateUserById,
};

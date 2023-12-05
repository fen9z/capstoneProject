const express = require('express');

// controller functions load
const {
  loginUser,
  signupUser,
  getUsers,
  getUserInfo,
  updateUserById,
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const { updateMany } = require('../models/userModel');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all users
router.get('/', getUsers);

// get a single user
router.get('/userInfo', requireAuth, getUserInfo);

// edit a single user with id
router.patch('/:id', requireAuth, updateUserById);

module.exports = router;

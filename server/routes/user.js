const express = require('express');

// controller functions load
const {
  loginUser,
  signupUser,
  getUsers,
  getUserInfo,
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all users
router.get('/', getUsers);

// get a single user
router.get('/userInfo', requireAuth, getUserInfo);

module.exports = router;

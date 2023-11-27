const express = require('express');

// controller functions load
const {
  loginUser,
  signupUser,
  getUsers,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all users
router.get('/', getUsers);

module.exports = router;

const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createBooking,
  getUserBookings,
} = require('../controllers/bookingController');

const router = express.Router();

// Create a new booking
router.post('/', requireAuth, createBooking);

// Get all bookings for a user
router.get('/', requireAuth, getUserBookings);

// Add more routes as needed

module.exports = router;

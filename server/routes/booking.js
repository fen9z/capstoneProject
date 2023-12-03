const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createBooking,
  getUserBookings,
  getFutureBookings,
} = require('../controllers/bookingController');

const router = express.Router();

// get booking information about future 7 days from database
router.get('/bookingsInFuture', getFutureBookings);

// Create a new booking
router.post('/', requireAuth, createBooking);

// Get all bookings for a user
router.get('/', requireAuth, getUserBookings);

// Add more routes as needed

module.exports = router;

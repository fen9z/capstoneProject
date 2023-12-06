const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
  createBooking,
  getUserBookings,
  getFutureBookings,
  getAllBookings,
  updateBooking,
} = require('../controllers/bookingController');
const { get } = require('mongoose');

const router = express.Router();

// get booking information about future 7 days from database
router.get('/bookingsInFuture', getFutureBookings);

// Create a new booking
router.post('/', requireAuth, createBooking);

// Get bookings for a user
router.get('/', requireAuth, getUserBookings);

// get all bookings
router.get('/allBookings', getAllBookings);

// update a booking
router.patch('/:id', requireAuth, updateBooking);

// Add more routes as needed

module.exports = router;

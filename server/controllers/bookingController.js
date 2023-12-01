const Booking = require('../models/bookingModel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, date, time } = req.body;

    const newBooking = new Booking({
      userId: req.user._id,
      firstName,
      lastName,
      email,
      phone,
      service,
      date,
      time,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controller functions as needed

module.exports = { createBooking, getUserBookings };

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
// get booking information about future 7 days from database
const getFutureBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      // only get bookings in the future startint from today and up to 7 days including today
      date: {
        $gte: new Date(),
        $lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      },
      // fields time change to On the hour, no seconds
      // start at 08:00:00 and end at 16:00:00
      time: {
        $gte: '08:00:00',
        $lte: '16:00:00',
      },
    }).select('date time service -_id');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBooking, getUserBookings, getFutureBookings };

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
        $gte: '07:59:00',
        $lte: '16:01:00',
      },
      // filter by isCancelled: false
      isCancelled: false,
    }).select('date time service email -_id');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all bookings
const getAllBookings = async (req, res) => {
  try {
    let filter = req.query.filter || ''; // from url get filter parameter
    let filterRegex = new RegExp(filter, 'i'); // create regex for filter

    const bookings = await Booking.find({
      $or: [
        { firstName: filterRegex },
        { lastName: filterRegex },
        { email: filterRegex },
        { phone: filterRegex },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update booking by booking id
const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    // update action must pay attention to isCancelled ture or false
    // if isCancelled is true, cancelTime and whoCancelled will be set, if iscancelled is false, cancelTime and whoCancelled will be null
    const cancelInfo = req.body.isCancelled
      ? { cancelTime: new Date(), whoCancelled: req.user._id }
      : { cancelTime: null, whoCancelled: null };

    // update the booking
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { ...req.body, ...cancelInfo },
      { new: true } // return updated booking, if false return old booking
    );
    if (!booking) {
      return res.status(400).json({ error: 'No such booking' });
    }
    // return updated booking
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getFutureBookings,
  getAllBookings,
  updateBooking,
};

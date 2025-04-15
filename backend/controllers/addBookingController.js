const { Bookings } = require('../Models/User');

const addBookingController = async (req, res, next) => {
  const { email, carId, startDate, endDate } = req.body;

  try {
    // Create a new booking
    const newBooking = await Bookings.create({
      email,
      carId,
      startDate,
      endDate
    });

    return res.status(201).json({
      msg: 'Booking successful!',
      booking: newBooking
    });
  } catch (error) {
    console.error('Booking Error:', error);
    return res.status(500).json({ msg: 'Failed to create booking. Try again later.' });
  }
};

module.exports=addBookingController
const { Bookings } = require('../Models/User');

const checkExistingActiveBooking = async (req, res, next) => {
  const { email } = req.body;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const existingBookings = await Bookings.findAll({ where: { email } });

    const hasActiveBooking = existingBookings.some((booking) => {
      const bookingEnd = new Date(booking.endDate);
      bookingEnd.setHours(0, 0, 0, 0); 

      return bookingEnd >= today;
    });

    if (hasActiveBooking) {
      return res.status(409).json({ msg: "You already have an active or upcoming booking." });
    }

    next();
  } catch (error) {
    console.error("Booking Overlap Check Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = checkExistingActiveBooking;

const { Bookings } = require('../Models/User');

const updateBookingStatus = async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ msg: 'Missing booking ID or status' });
  }

  try {
    const booking = await Bookings.findByPk(id);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({ msg: `Booking ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = updateBookingStatus;

const { Bookings } = require('../Models/User');  

const cancelBookingController = async (req, res) => {
  const { id } = req.body; 
  
  

  try {
    
    const booking = await Bookings.findOne({ where: { bookingId: id } });

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    
    if (booking.status === 'Cancelled' || booking.status === 'Rejected') {
      return res.status(400).json({ msg: 'Booking already cancelled or rejected' });
    }

    
    await booking.update({ status: 'Cancelled' });

    return res.status(200).json({ msg: 'Booking cancelled successfully' });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports =  cancelBookingController ;

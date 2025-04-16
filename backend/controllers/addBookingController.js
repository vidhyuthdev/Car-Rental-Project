const { Bookings,Cars } = require('../Models/User');

const addBookingController = async (req, res, next) => {
  const { email, carId, startDate, endDate } = req.body;

  try {
    // Create a new booking
       
    const carDetails=await Cars.findByPk(req.body.carId);
    const price=carDetails.dataValues.price;  
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const bookingValue = price * durationInDays;
    
    
    const newBooking = await Bookings.create({
      email,
      carId,
      startDate,
      endDate,
      status:'Not Approved',
      bookingValue
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
const { Bookings,Cars } = require('../Models/User');

const getUserBookings = async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await Bookings.findAll({
        include:{
            model:Cars,
            attributes:['model',"registrationNumber",]
        },
        attributes:['carId','startDate','endDate','status','bookingValue'],
      where: { email: email }
    });

    //HERE

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports =  getUserBookings ;

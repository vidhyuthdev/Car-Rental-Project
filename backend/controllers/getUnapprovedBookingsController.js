const { Bookings, User, Cars } = require('../Models/User'); // Adjust path
const { Op } = require('sequelize');

const getUnapprovedBookings = async (req, res) => {
  try {
    const today = new Date();

    // Unapproved bookings
    const unapprovedBookings = await Bookings.findAll({
      where: { status: 'Not Approved' },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Cars,
          attributes: ['model', 'registrationNumber']
        }
      ],
      attributes: ['bookingId', 'startDate', 'endDate']
    });

    // Completed bookings (endDate < today, status === 'Completed'), limit 3 most recent
    const completedBooking = await Bookings.findAll({
      where: {
        status: 'Approved',
        endDate: { [Op.lt]: today }
      },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Cars,
          attributes: ['model', 'registrationNumber']
        }
      ],
      order: [['endDate', 'DESC']],
      
      attributes: ['bookingId', 'startDate', 'endDate', 'status']
    });

    res.status(200).json({
      bookings: unapprovedBookings,
      completedBooking
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = getUnapprovedBookings;

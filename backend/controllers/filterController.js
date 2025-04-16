const { Cars, Bookings } = require('../Models/User');
const { Op } = require('sequelize');
const filterController = async (req, res, next) => {
    const { location, startDate, endDate, type } = req.body.parameters;
  
    try {
      //Overlapping
      const conflictingBookings = await Bookings.findAll({
        attributes: ['carId'],
        where: {
          [Op.not]: {
            [Op.or]: [
              { endDate: { [Op.lt]: startDate } },
              { startDate: { [Op.gt]: endDate } }
            ]
          }
        }
      });
  
      const unavailableCarIds = conflictingBookings.map(b => b.carId);
  
      //Not Overlapping
      const whereCondition = {
        location,
        id: { [Op.notIn]: unavailableCarIds }
      };
  
      if (type !== '*') {
        whereCondition.type = type;
      }
  
      const cars = await Cars.findAll({
        attributes: ['model', 'location', 'type', 'price', 'imageURL', 'id'],
        where: whereCondition
      });
  
      return res.status(200).json({ msg: "DONE", cars });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ msg: "Internal Error" });
    }
  };
  module.exports=filterController
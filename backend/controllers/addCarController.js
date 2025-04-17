const { Cars } = require('../Models/User');

const addCarController = async (req, res) => {
  try {
    const { model, location, registrationNumber, type, price, imageURL } = req.body.form;

    if (!model || !location || !registrationNumber || !type || !price || !imageURL) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const existingCar = await Cars.findOne({ where: { registrationNumber } });
    if (existingCar) {
      return res.status(400).json({ msg: 'Car with this registration number already exists' });
    }

    const newCar = await Cars.create({
      model,
      location,
      registrationNumber,
      type,
      price: Number(price),
      imageURL
    });

    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (err) {
    

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      const firstError = err.errors[0]?.message || 'Validation error';
      return res.status(400).json({ msg: firstError });
    }

    res.status(500).json({ msg: 'Server error while adding car' });
  }
};

module.exports = addCarController;

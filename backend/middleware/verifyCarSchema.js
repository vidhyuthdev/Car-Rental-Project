const { carSchema } = require('../Models/carSchema');

const verifyCarSchema = (req, res, next) => {
  
  
  const { model,location,registrationNumber,type,imageURL, price } = req.body.form;

  // Set dummy values for required fields not sent by frontend
  const dummyCarData = {
    id: 100000000,
    model,
    location,
    registrationNumber,
    type,
    price,
    imageURL
  };

  const { error } = carSchema.validate(dummyCarData);

  if (error) {
    
    
    return res.status(400).json({ msg: error.details[0].message });
  }

  // Optionally attach validated data if needed: req.validatedCar = dummyCarData;
  next();
};

module.exports = verifyCarSchema;

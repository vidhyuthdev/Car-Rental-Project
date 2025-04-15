const Joi = require('joi');

const todayDate = new Date().toISOString().split('T')[0]; 


const filterSchema = Joi.object({
  location: Joi.string().valid('Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Visakhapatnam', 'Nagpur', 'Coimbatore').required(),
  startDate: Joi.date().iso().min(todayDate).required(), 
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
 
  type: Joi.string().valid('Petrol', 'Diesel', 'Electric', '*').required(),
});

const filterSchemaValidator = (req, res, next) => {
  const { parameters } = req.body;
  if (!parameters) {
    return res.status(400).json({ msg: 'Parameters field is required.' });
  }

  const { error } = filterSchema.validate(parameters, { abortEarly: true });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  next()
};

module.exports = filterSchemaValidator;

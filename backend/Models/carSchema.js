const Joi = require('joi');


const allowedLocations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Chandigarh', 'Indore',
  'Bhopal', 'Visakhapatnam', 'Nagpur', 'Coimbatore'
];


const stateCodes = [
  'AP', 'AR', 'AS', 'BR', 'CH', 'CT', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JH', 'JK',
  'KA', 'KL', 'LA', 'LD', 'MH', 'ML', 'MN', 'MP', 'MZ', 'NL', 'OD', 'PB', 'PY',
  'RJ', 'SK', 'TN', 'TS', 'TR', 'UK', 'UP', 'WB'
];


const registrationRegex = new RegExp(
  `^(${stateCodes.join('|')})\\d{2}[A-Z]{2}\\d{4}$`
);

const carSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required(),

  model: Joi.string()
    .required(),

  location: Joi.string()
    .valid(...allowedLocations)
    .required(),

  registrationNumber: Joi.string()
    .pattern(registrationRegex)
    .required()
    .messages({
      'string.pattern.base': 'Registration number must be like TN34AB1234.'
    }),

  type: Joi.string()
    .valid('Electric', 'Petrol', 'Diesel')
    .required(),

  price: Joi.number()
    .greater(0)
    .required()
});

module.exports = { carSchema };

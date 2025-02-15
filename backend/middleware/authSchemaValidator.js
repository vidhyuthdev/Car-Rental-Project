const { emailSchema, passwordSchema } = require('../Models/authSchema');

const validateEmail = (req, res, next) => {
  const { error } = emailSchema.validate({email:req.body.email}, { abortEarly: true });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { error } = passwordSchema.validate({password:req.body.password}, { abortEarly: true });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  next();
};

module.exports = { validateEmail, validatePassword };

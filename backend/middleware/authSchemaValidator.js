const { emailSchema, passwordSchema, nameSchema, phoneSchema } = require('../Models/authSchema');

const validateEmail = (req, res, next) => {
  const { error } = emailSchema.validate({ email: req.body.email }, { abortEarly: true });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  next();
};

const validateUserFields = (req, res, next) => {
  const errors = [];

  const emailValidation = emailSchema.validate({ email: req.body.email }, { abortEarly: true });
  if (emailValidation.error) errors.push(emailValidation.error.details[0].message);

  const passwordValidation = passwordSchema.validate({ password: req.body.password }, { abortEarly: true });
  if (passwordValidation.error) errors.push(passwordValidation.error.details[0].message);

  const nameValidation = nameSchema.validate({ name: req.body.name }, { abortEarly: true });
  if (nameValidation.error) errors.push(nameValidation.error.details[0].message);

  const phoneValidation = phoneSchema.validate({ mobile: req.body.mobile }, { abortEarly: true });
  if (phoneValidation.error) errors.push(phoneValidation.error.details[0].message);

  if (errors.length > 0) {
    return res.status(400).json({ msg: errors[0] });
  }

  next();
};

module.exports = { validateEmail, validateUserFields };

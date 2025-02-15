const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'string.empty': 'Email is required.',
    }),
});

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/(?=.*[A-Z])/, 'uppercase')
    .pattern(/(?=.*[0-9])/, 'number')
    .pattern(/(?=.*[\W_])/, 'special character')
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.empty': 'Password is required.',
      'string.pattern.name': 'Password must contain at least one {#name}.',
    }),
});

const nameSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/, 'letters')
    .required()
    .messages({
      'string.pattern.name': 'Name can only contain letters and spaces.',
      'string.empty': 'Name is required.',
    }),
});

const phoneSchema = Joi.object({
  mobile: Joi.string()
    .length(10)
    .pattern(/^\d+$/, 'digits')
    .required()
    .messages({
      'string.length': 'Mobile number must be exactly 10 digits.',
      'string.pattern.name': 'Mobile number can only contain digits.',
      'string.empty': 'Mobile number is required.',
    }),
});

module.exports = { emailSchema, passwordSchema, nameSchema, phoneSchema };

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

module.exports = { emailSchema, passwordSchema };

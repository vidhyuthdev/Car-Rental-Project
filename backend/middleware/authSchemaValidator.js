
authSchema=require('../Models/authSchema')
  
  const authSchemaValidator = (req, res, next) => {
    const { error } = authSchema.validate(req.body, { abortEarly: true });
  
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }
  
    next();
  };
  
  module.exports = authSchemaValidator;
  
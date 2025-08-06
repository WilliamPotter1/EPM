const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.details[0].message 
      });
    }
    next();
  };
};

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required()
});

module.exports = {
  validate,
  userSchema
}; 
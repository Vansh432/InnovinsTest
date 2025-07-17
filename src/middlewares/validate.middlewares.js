// middlewares/validate.middleware.js
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });


  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: error.details.map(d => d.message),
    });
  }

  next();
};

export default validate;

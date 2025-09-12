import Joi from "joi";
// register user--->
export const registerUser = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'Password should be at least 6 characters long',
      'string.empty': 'Password is required'
    })
});

//login user --->
export const userLoginSchema=Joi.object({
    email:Joi.string().required().messages({
        'string.email':'Please provied valid email id',
        'string.empty':'email is required'
    }),
      password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
})


//verified OTP and resetPassword--->
export const verifyOtpAndResetPassword = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),

  otp: Joi.string()
    .required()
    .messages({
      'string.empty': 'OTP is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});


//add product--->
export const createProductSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Name is required',
    }),

  description: Joi.string()
    .required()
    .messages({
      'string.base': 'Description should be a string',
      'string.empty': 'Description is required',
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Price should be a number',
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required'
    })
});

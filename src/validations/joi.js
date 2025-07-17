// validations/admin.validation.js
import Joi from 'joi';
import mongoose from 'mongoose';

export const adminLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  password: Joi.string().min(4).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 4 characters',
  }),
});
// validations/companyProfile.validation.js


export const companyProfileSchema = Joi.object({


  profileImage: Joi.string().uri().required().messages({
    'string.empty': 'image is required',
    'string.uri': 'profile image must be a valid URL',
  }),

  ownerName: Joi.string().required().messages({
    'string.empty': 'owner name is required',
  }),

  companyName: Joi.string().required().messages({
    'string.empty': 'company name is required',
  }),

  employeeSizeCompany: Joi.string()
    .valid('0-50', '51-100', '101-300', '501-1000', '1000 above')
    .required()
    .messages({
      'any.only': 'employee size must be one of the allowed values',
      'any.required': 'employee size of company is required',
    }),

  isConsultantStaffAgency: Joi.boolean()
    .required()
    .messages({
      'any.required': 'consultancy (hiring or staffing agency) is required',
    }),

  isTermAndCondition: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      'any.only': 'You must accept the terms & conditions',
      'any.required': 'Allow the term & condition',
    }),

  workEmail: Joi.string().email().optional().messages({
    'string.email': 'work email must be a valid email address',
  }),
});


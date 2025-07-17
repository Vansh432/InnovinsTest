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

export const step1ValidationSchema = Joi.object({
  companyId: Joi.string().required(),

  designation: Joi.string().required().messages({
    'any.required': 'Designation is required',
  }),

  jobRoleCategory: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Job role category is required',
  }),

  typeOfJob: Joi.string()
    .valid('full time', 'part time', 'both(full time and part time)')
    .required()
    .messages({
      'any.required': 'Type of job is required',
    }),

  nightShift: Joi.boolean().default(false),

  workLocationType: Joi.string()
    .valid('work from home', 'work from office', 'field job', 'hybrid', 'rotational')
    .required()
    .messages({
      'any.required': 'Work location type is required',
    }),

  city: Joi.alternatives().conditional('workLocationType', {
    is: 'work from home',
    then: Joi.string().required().messages({
      'any.required': 'City is required for Work From Home jobs.',
    }),
    otherwise: Joi.string().allow('', null),
  }),

  address: Joi.alternatives().conditional('workLocationType', {
    is: Joi.valid('work from office', 'field job', 'hybrid', 'rotational'),
    then: Joi.string().required().messages({
      'any.required': 'Address is required for Office, Field, Hybrid or Rotational jobs.',
    }),
    otherwise: Joi.string().allow('', null),
  }),

  // Compensation
  payType: Joi.string()
    .valid('Fixed Only', 'Fixed + Incentive', 'Incentive Only')
    .required()
    .messages({
      'any.required': 'Pay type is required',
    }),

  fixedSalaryMin: Joi.alternatives().conditional('payType', {
    is: Joi.valid('Fixed Only', 'Fixed + Incentive'),
    then: Joi.number().required().messages({
      'any.required': 'Minimum fixed salary is required',
    }),
    otherwise: Joi.number().optional().allow(null),
  }),

  fixedSalaryMax: Joi.alternatives().conditional('payType', {
    is: Joi.valid('Fixed Only', 'Fixed + Incentive'),
    then: Joi.number().required().messages({
      'any.required': 'Maximum fixed salary is required',
    }),
    otherwise: Joi.number().optional().allow(null),
  }),

  averageIncentiveMonth: Joi.alternatives().conditional('payType', {
    is: 'Fixed + Incentive',
    then: Joi.number().required().messages({
      'any.required': 'Average incentive per month is required',
    }),
    otherwise: Joi.number().optional().allow(null),
  }),

  additionalPerks: Joi.array().items(Joi.string()).default([]),

  joiningFeeRequired: Joi.boolean().required().messages({
    'any.required': 'Joining fee required field is mandatory',
  }),

  joiningFeeAmount: Joi.alternatives().conditional('joiningFeeRequired', {
    is: true,
    then: Joi.number().required().messages({
      'any.required': 'Joining fee amount is required',
    }),
    otherwise: Joi.number().optional().allow(null),
  }),

  feePurpose: Joi.alternatives().conditional('joiningFeeRequired', {
    is: true,
    then: Joi.string()
      .valid(
        'Asset/ Inventory Charge',
        'Security Deposit (Refundable)',
        'Registration/ Training Fees',
        'Commission',
        'IRDA Exam',
        'Other Reason'
      )
      .required()
      .messages({
        'any.required': 'Purpose of fee is required when joining fee is enabled',
      }),
    otherwise: Joi.string().optional().allow(null),
  }),

  mentionAssetInventryCharges: Joi.alternatives().conditional('feePurpose', {
    is: 'Asset/ Inventory Charge',
    then: Joi.string().required().messages({
      'any.required': 'Please mention Asset/Inventory Charges',
    }),
    otherwise: Joi.string().optional().allow(null),
  }),

  registrationTrainingFees: Joi.alternatives().conditional('feePurpose', {
    is: 'Registration/ Training Fees',
    then: Joi.string().required().messages({
      'any.required': 'Please mention Registration/Training Fees',
    }),
    otherwise: Joi.string().optional().allow(null),
  }),

  otherReason: Joi.alternatives().conditional('feePurpose', {
    is: 'Other Reason',
    then: Joi.string().required().messages({
      'any.required': 'Please specify Other Reason',
    }),
    otherwise: Joi.string().optional().allow(null),
  }),

  feePaymentTime: Joi.alternatives().conditional('joiningFeeRequired', {
    is: true,
    then: Joi.string()
      .valid('Before The Interview', 'After Job Confirmation', 'Deducted From Salary')
      .required()
      .messages({
        'any.required': 'When the fee should be paid is required',
      }),
    otherwise: Joi.string().optional().allow(null),
  }),
});





export const step2ValidationSchema = Joi.object({
  companyId: Joi.string().required().messages({
    'any.required': 'Company ID is required',
  }),

  step1Id: Joi.string().required().messages({
    'any.required': 'Step1 ID is required',
  }),

  // 🔹 Basic Requirements
  minimumEducation: Joi.array()
    .items(
      Joi.string().valid(
        'Below 10th',
        '10th Pass',
        '12th Pass',
        'Diploma',
        'ITI',
        'Graduate',
        'Post Graduate'
      )
    )
    .min(1)
    .required()
    .messages({
      'any.required': 'Minimum education is required',
      'any.only': 'Invalid education option',
    }),

  englishLevel: Joi.string()
    .valid('No English', 'Basic English', 'Good English')
    .required()
    .messages({
      'any.required': 'English level is required',
      'any.only': 'Invalid English level',
    }),

  totalExperienceRequired: Joi.string()
    .valid('Fresher Only', 'Experienced Only', 'Both')
    .required()
    .messages({
      'any.required': 'Experience requirement is required',
      'any.only': 'Invalid experience type',
    }),

  minimumExperience: Joi.alternatives().conditional('totalExperienceRequired', {
    is: 'Experienced Only',
    then: Joi.string()
      .valid('6 Months', '1 Year', '2 Years', '3 Years', '5 Years', '10 Years')
      .required()
      .messages({
        'any.required': "Minimum experience is required when 'Experienced Only' is selected",
        'any.only': 'Invalid minimum experience value',
      }),
    otherwise: Joi.string().valid('6 Months', '1 Year', '2 Years', '3 Years', '5 Years', '10 Years').optional().allow(null, ''),
  }),

  // 🔹 Additional Requirements
  skills: Joi.array().items(Joi.string()).default([]),

  regionalLanguages: Joi.array().items(Joi.string()).default([]),

  ageRange: Joi.object({
    min: Joi.number().integer().min(18).messages({
      'number.min': 'Minimum age must be at least 18',
    }),
    max: Joi.number().integer().max(99).messages({
      'number.max': 'Maximum age cannot exceed 99',
    }),
  }),

  gender: Joi.string()
    .valid('Male', 'Female', 'Both')
    .required()
    .messages({
      'any.required': 'Gender selection is required',
      'any.only': 'Gender must be Male, Female or Both',
    }),

  previousIndustryExperience: Joi.array().items(Joi.string()).default([]),

  jobDescription: Joi.string().required().messages({
    'any.required': 'Job description is required',
  }),
});



export const step3ValidationSchema = Joi.object({
  companyId: Joi.string().required().messages({
    'any.required': 'Company ID is required',
  }),

  step1Id: Joi.string().required().messages({
    'any.required': 'Step1 ID is required',
  }),

  // 🔹 Interview Details
  isWalkInInterview: Joi.boolean().required().messages({
    'any.required': 'Walk-in interview status is required',
  }),

  walkInInterviewAddress: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.string().required().messages({
      'any.required': 'Walk-in interview address is required',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  floorOrShopNo: Joi.string().optional().allow('', null),

  walkInStartDate: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.date().required().messages({
      'any.required': 'Walk-in start date is required',
    }),
    otherwise: Joi.date().optional().allow(null),
  }),

  walkInEndDate: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.date().required().messages({
      'any.required': 'Walk-in end date is required',
    }),
    otherwise: Joi.date().optional().allow(null),
  }),

  walkInStartTime: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.string().required().messages({
      'any.required': 'Walk-in start time is required',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  walkInEndTime: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.string().required().messages({
      'any.required': 'Walk-in end time is required',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  otherInstructions: Joi.alternatives().conditional('isWalkInInterview', {
    is: true,
    then: Joi.string().max(200).required().messages({
      'any.required': 'Other instructions are required',
      'string.max': 'Instructions must be under 200 characters',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  companyAddress: Joi.alternatives().conditional('isWalkInInterview', {
    is: false,
    then: Joi.string().required().messages({
      'any.required': 'Company address is required if not a walk-in interview',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  // 🔹 Communication Preferences
  contactPreference: Joi.string()
    .valid('Yes, to myself', 'Yes, to other recruiter', 'No, I will contact candidates first')
    .required()
    .messages({
      'any.required': 'Candidate contact preference is required',
      'any.only': 'Invalid contact preference',
    }),

  recruiterName: Joi.alternatives().conditional('contactPreference', {
    is: 'Yes, to other recruiter',
    then: Joi.string().required().messages({
      'any.required': 'Recruiter name is required',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  recruiterWhatsapp: Joi.alternatives().conditional('contactPreference', {
    is: 'Yes, to other recruiter',
    then: Joi.string().required().messages({
      'any.required': 'Recruiter WhatsApp number is required',
    }),
    otherwise: Joi.string().optional().allow(null, ''),
  }),

  recruiterEmail: Joi.alternatives().conditional('contactPreference', {
    is: 'Yes, to other recruiter',
    then: Joi.string().email().required().messages({
      'any.required': 'Recruiter email is required',
      'string.email': 'Recruiter email must be valid',
    }),
    otherwise: Joi.string().email().optional().allow(null, ''),
  }),

  // 🔹 Notification Preferences
  whatsappAlertPreference: Joi.string()
    .valid('Yes, to other recruiter', 'No, send me summary once a day')
    .required()
    .messages({
      'any.required': 'Notification preference is required',
      'any.only': 'Invalid notification preference',
    }),
});
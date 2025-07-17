import mongoose from "mongoose";

const step2Schema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companyprofile",
    required: [true, "Company ID is required"]
  },
  step1Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Step1',
    required:[true,'step1 Id is required']
  },

  // 🔹 Basic Requirements
  minimumEducation: {
    type: [String],
    enum: {
      values: ['Below 10th', '10th Pass', '12th Pass', 'Diploma', 'ITI', 'Graduate', 'Post Graduate'],
      message: "Invalid education option"
    },
    required: [true, "Minimum education is required"]
  },

  englishLevel: {
    type: String,
    enum: {
      values: ['No English', 'Basic English', 'Good English'],
      message: "Invalid English level"
    },
    required: [true, "English level is required"]
  },

  totalExperienceRequired: {
    type: String,
    enum: {
      values: ['Fresher Only', 'Experienced Only', 'Both'],
      message: "Invalid experience type"
    },
    required: [true, "Experience requirement is required"]
  },

  minimumExperience: {
    type: String,
    enum: {
      values: [
        '6 Months',
        '1 Year',
        '2 Years',
        '3 Years',
        '5 Years',
        '10 Years'
      ],
      message: "Invalid minimum experience value"
    },
    validate: {
      validator: function (v) {
        if (this.totalExperienceRequired === 'Experienced Only') {
          return !!v;
        }
        return true;
      },
      message: "Minimum experience is required when 'Experienced Only' is selected"
    }
  },

  // 🔹 Additional Requirements
  skills: {
    type: [String],
    default: []
  },

  regionalLanguages: {
    type: [String],
    default: []
  },

  ageRange: {
    min: {
      type: Number,
      min: [18, "Minimum age must be at least 18"],
    },
    max: {
      type: Number,
      max: [99, "Maximum age cannot exceed 99"]
    }
  },

  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Both'],
      message: "Gender must be Male, Female or Both"
    },
    required: [true, "Gender selection is required"]
  },

  previousIndustryExperience: {
    type: [String],
    default: []
  },

  jobDescription: {
    type: String,
    required: [true, "Job description is required"]
  }

}, { timestamps: true });

const StepTwo= mongoose.model("Step2", step2Schema);
export default StepTwo
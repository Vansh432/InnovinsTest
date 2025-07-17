import mongoose from "mongoose";

const step3Schema = new mongoose.Schema({

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
  // 🔹 Interview Details
  isWalkInInterview: {
    type: Boolean,
    required: [true, "Walk-in interview status is required"]
  },

  walkInInterviewAddress: {
    type: String,
    required: function () {
      return this.isWalkInInterview === true;
    }
  },

  floorOrShopNo: {
    type: String
  },

  walkInStartDate: {
    type: Date,
    required: function () {
      return this.isWalkInInterview === true;
    }
  },

  walkInEndDate: {
    type: Date,
    required: function () {
      return this.isWalkInInterview === true;
    }
  },

  walkInStartTime: {
    type: String,
    required: function () {
      return this.isWalkInInterview === true;
    }
  },

  walkInEndTime: {
    type: String,
    required: function () {
      return this.isWalkInInterview === true;
    }
  },

  otherInstructions: {
    type: String,
     required: function () {
      return this.isWalkInInterview === true;
    },
    maxlength: [200, "Instructions must be under 200 characters"]
  },
  companyAddress:{
    type:String,
     required: function () {
      return this.isWalkInInterview === false;
    }
  },

  // 🔹 Communication Preferences
  contactPreference: {
    type: String,
    enum: ['Yes, to myself', 'Yes, to other recruiter', 'No, I will contact candidates first'],
    required: [true, "Candidate contact preference is required"]
  },

  recruiterName: {
    type: String,
    required: function () {
      return this.contactPreference === 'Yes, to other recruiter';
    }
  },

  recruiterWhatsapp: {
    type: String,
    required: function () {
      return this.contactPreference === 'Yes, to other recruiter';
    }
  },

  recruiterEmail: {
    type: String,
     required: function () {
      return this.contactPreference === 'Yes, to other recruiter';
    }
    // optional
  },

  // 🔹 Notification Preferences
  whatsappAlertPreference: {
    type: String,
    enum: ['Yes, to other recruiter', 'No, send me summary once a day'],
    required: [true, "Notification preference is required"]
  }

}, { timestamps: true });

const StepThree= mongoose.model("Step3", step3Schema);

export default StepThree

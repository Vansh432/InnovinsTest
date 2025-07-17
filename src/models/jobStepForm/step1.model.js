import mongoose from "mongoose";

const step1Schema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyprofile',
    required: true,
  },

  designation: {
    type: String,
    required: [true, "Designation is required"]
  },

  jobRoleCategory:{
   type:String,
   required:[true,"job role category is required"]
  },

  typeOfJob: {
    type: String,
    enum: ['full time', 'part time', 'both(full time and part time)'],
    required: [true, "Type of job is required"]
  },

  nightShift: {
    type: Boolean,
    default: false
  },

  workLocationType: {
    type: String,
    enum: ["work from home", "work from office", "field job", "hybrid", "rotational"],
    required: [true, "Work location type is required"]
  },

  city: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.workLocationType === 'work from home') {
          return !!v;
        }
        return true;
      },
      message: "City is required for Work From Home jobs."
    }
  },

  address: {
    type: String,
    validate: {
      validator: function (v) {
        const requiredTypes = ['work from office', 'field job', 'hybrid', 'rotational'];
        if (requiredTypes.includes(this.workLocationType)) {
          return !!v;
        }
        return true;
      },
      message: "Address is required for Work From Office, Field Job, Hybrid, or Rotational jobs."
    }
  },

  floorOrShopNo: {
    type: String,
  },

  // Compensation Fields
  payType: {
    type: String,
    enum: ['Fixed Only', 'Fixed + Incentive', 'Incentive Only'],
    required: [true, "Pay type is required"]
  },

  fixedSalaryMin: {
    type: Number,
    validate: {
      validator: function (v) {
        return (this.payType === 'Fixed Only' || this.payType === 'Fixed + Incentive') ? v != null : true;
      },
      message: "Minimum fixed salary is required for Fixed or Fixed + Incentive pay type."
    }
  },

  fixedSalaryMax: {
    type: Number,
    validate: {
      validator: function (v) {
        return (this.payType === 'Fixed Only' || this.payType === 'Fixed + Incentive') ? v != null : true;
      },
      message: "Maximum fixed salary is required for Fixed or Fixed + Incentive pay type."
    }
  },

  averageIncentiveMonth: {
    type: Number,
    validate: {
      validator: function (v) {
        return this.payType === 'Fixed + Incentive' ? v != null : true;
      },
      message: "Average incentive per month is required for Fixed + Incentive pay type."
    }
  },

  additionalPerks: {
    type: [String],
    default: []
  },

  joiningFeeRequired: {
    type: Boolean,
    required: [true, "Joining fee required field is mandatory"]
  },

  joiningFeeAmount: {
    type: Number,
    validate: {
      validator: function (v) {
        return this.joiningFeeRequired ? v != null : true;
      },
      message: "Joining fee amount is required"
    }
  },

  feePurpose: {
    type: String,
    enum: [
      "Asset/ Inventory Charge",
      "Security Deposit (Refundable)",
      "Registration/ Training Fees",
      "Commission",
      "IRDA Exam",
      "Other Reason"
    ],
    validate: {
      validator: function (v) {
        return this.joiningFeeRequired ? !!v : true;
      },
      message: "Purpose of fee is required when joining fee is enabled"
    }
  },

  mentionAssetInventryCharges: {
    type: String,
    validate: {
      validator: function (v) {
        return this.feePurpose === "Asset/ Inventory Charge" ? !!v : true;
      },
      message: "Please mention Asset/Inventory Charges"
    }
  },

  registrationTrainingFees: {
    type: String,
    validate: {
      validator: function (v) {
        return this.feePurpose === "Registration/ Training Fees" ? !!v : true;
      },
      message: "Please mention Registration/Training Fees"
    }
  },

  otherReason: {
    type: String,
    validate: {
      validator: function (v) {
        return this.feePurpose === "Other Reason" ? !!v : true;
      },
      message: "Please specify Other Reason"
    }
  },

  feePaymentTime: {
    type: String,
    enum: ['Before The Interview', 'After Job Confirmation', 'Deducted From Salary'],
    validate: {
      validator: function (v) {
        return this.joiningFeeRequired ? !!v : true;
      },
      message: "When the fee should be paid is required"
    }
  }

}, { timestamps: true });

export default mongoose.model("Step1", step1Schema);

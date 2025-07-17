import mongoose from "mongoose";

const stepInformationSchema=new mongoose.Schema({

    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'companyprofile',
        required:[true,"company id is required"]
    },
    step1Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Step1'
    },
    stepsCount:{
        type:Number,
        default:0
    },
    finalSubmite:{
        type:Boolean,
        default:false,
    }
})

const StepsInformation=mongoose.model('stepInformation',stepInformationSchema);
export default StepsInformation;
import mongoose from "mongoose";


const companyProfileSchema=new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin',
        required:[true,"admin id is required"]
    },
    profileImage:{
        type:String,
        required:[true,"image is required"]
    },
    ownerNumber:{
     type:Number,
     required:[true,"owner number is required"],
     unique:[true,"owner number should be unique"]
    },
    ownerName:{
        type:String,
        required:[true,"owner name is required"]
    },
    companyName:{
        type:String,
        required:[true,'company name is required']
    },
    employeeSizeCompany:{
        type:String,
        enum:["0-50","51-100","101-300","501-1000","1000 above"],
        required:[true,"employee size of company is required"]
    },
    isConsultantStaffAgency:{
        type:Boolean,
        default:false,
        required:["consultancy (hiring or staffing agency ) is required "]
    },
    isTermAndCondition:{
        type:Boolean,
        required:[true,"alow the term & condition"]
    },
    workEmail:{
        type:String,
    },
    
},{timestamps:true})

const CompanyProfile=mongoose.model('companyprofile',companyProfileSchema);
export default CompanyProfile;


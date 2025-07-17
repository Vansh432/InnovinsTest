import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email id is required"],
        unique:[true,'email is unique always']
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
},{timestamps:true})


const Admin=mongoose.model('admin',adminSchema);
export default Admin;
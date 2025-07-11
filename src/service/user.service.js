import UserModel from "../models/user.model.js";


export const create=async(data)=>{
    const user=await UserModel.create(data);
    return await user.save();
}
import {create} from "../service/user.service.js";


export const createUser=async(req,res,next)=>{
    try{
     const userData=req.body;
     const newUser=await create(userData);
     return res.status(201).json({
        status:true,
        message:"user created successfully"
     })
    }catch(err){
        next(err);
    }
}
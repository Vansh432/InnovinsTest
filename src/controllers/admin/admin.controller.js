import jwt from 'jsonwebtoken'
import Admin from '../../models/admin.model.js'
import { generateToken } from '../../utils/generatesToken.js';


export const login=async(req,res)=>{
   try{
     const {email,password}=req?.body;
     if(!email || !password)return res.status(402).json(
        {
            status:false,
            message:"all field Missing"
        }
     )
     console.log(email);
     const existUser=await Admin.findOne({email});
     if(!existUser)return res.status(404).json({
      status:false,
      message:"admin is not exist"
     })
     if(existUser?.password!==password)return res.status(401).json({
      status:false,
      message:"password is wrong"
     })
     const obje={
          id:existUser?._id,
          email,
          password,
          isAdmin:true
     }
     const token=generateToken(obje,'1d')
      return res.status(200).json({
        status:true,
        message:"admin login successfully",
        token
      })
   }catch(err){
    return res.status(500).json({
      status:false,
      message:"Internal Server Error",
      error:err.message
    })
   }
}
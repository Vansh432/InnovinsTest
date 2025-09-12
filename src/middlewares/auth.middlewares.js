import jwt from 'jsonwebtoken'
import { tokenVerify } from '../utils/generatesToken.js';

export const userAuth=async(req,res,next)=>{
   try{
    const authHeader=req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith("Bearer ")){
  
        return res.status(401).json({status:false,message:"No token"})
    }
    const token=authHeader.split(' ')[1];
    const decode=tokenVerify(token)
    console.log(decode)
    
    req.user=decode;
    next();
   }catch(err){
    return res.status(403).json({
        status:false,
        message:"Invalid credential",
        err:err.message
    })
   }
}
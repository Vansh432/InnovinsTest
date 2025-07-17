import jwt from 'jsonwebtoken'
import { tokenVerify } from '../utils/generatesToken.js';

export const adminAuth=async(req,res,next)=>{
   try{
    const authHeader=req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith("Bearer ")){
        console.log(authHeader);
        return res.status(401).json({status:false,message:"No token"})
    }
    const token=authHeader.split(' ')[1];
    const decode=tokenVerify(token)
    console.log(decode)
    if(!decode?.isAdmin){
        return res.status(403).json({
            status:false,
            message:"Access denied. Admin Only",
        })
    }
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
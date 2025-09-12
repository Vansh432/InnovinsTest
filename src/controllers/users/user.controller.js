import { queryPromis } from "../../utils/dboperation.js";
import { generateToken } from "../../utils/generatesToken.js";


//register users-->
export const userRegisteration=async(req,res)=>{

    try{
        const {name,email,password}=req?.body;
        
        const queryExistUser="SELECT id FROM users WHERE email = ?"
        const [existingUser] = await queryPromis(queryExistUser,[email]);
         if (existingUser) {
           return res.status(409).json({
        status: false,
        message: "User already exists with this email",
      });
         }
        const queryRegisteration=`INSERT INTO users (name,email,password) VALUES (?,?,?)`
        const response=await queryPromis(queryRegisteration,[name,email,password]);
        console.log(response);
        if(response?.affectedRows!=1)return res.status(403).json({
            status:false,
            message:"something went wrong!"
        })
   
        return res.status(201).json({
            status:true,
            message:"user register successfully",
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
    }
}

//login user-->
export const userLogin=async(req,res)=>{
    try{
       const {email,password}=req?.body;
       const existUser=`SELECT * FROM  users WHERE email=?`
       const response=await queryPromis(existUser,[email]);
    
       if(response?.length==0)return res.status(404).json({
        status:false,
        message:"user does not exist"
       })
        if(response[0]?.password!=password)return res.status(403).json({
            status:false,
            message:'wrong password'
        })
       const token=generateToken({email,password},'1h')
       return res.status(200).json({
        status:true,
        message:"user login successfully",
        token
       }) 
    }catch(err){
         return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
    }
}


//forget password of user --->

export const forgetPasswordUser=async(req,res)=>{
    try{
      const {email,otp,password}=req?.body;
      if(otp!=1111)return res.status(403).json({
        status:false,
        message:"OTP is not verified"
      })
 
      const updateExistUser=`UPDATE users SET password=? WHERE email=?`
      const response=await queryPromis(updateExistUser,[password,email]);
    
      if(response?.affectedRows!==1)return res.status(500).json({
        status:false,
        message:"User not found "
      })


      return res.status(200).json({
        status:true,
        message:"password updated successfully"
      })
    }catch(err){
          return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
    }
}

//get list of  users


export const getListUsers=async(req,res)=>{
  try{
    const queryAllUsers=`SELECT * FROM users`;
    const existUsers=await queryPromis(queryAllUsers);
    return res.status(200).json({
      status:true,
      messsage:"users fetched successfully",
      existUsers
    })
  }catch(err){
     return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
  }
}

export const updateProfileUsers=async(req,res)=>{
  try{
    const {userId}=req.params;
    const {name}=req?.body
    if(!userId)return res.status(404).json({
      status:false,
      message:"userId is required"
    })
       const updateExistUser=`UPDATE users SET name=? WHERE id=?`
      const response=await queryPromis(updateExistUser,[name,userId]);
    
      if(response?.affectedRows!==1)return res.status(500).json({
        status:false,
        message:"User not found "
      })
      return res.status(200).json({
        status:true,
        message:"User profile updated successfully"
      })
  }catch(err){
     return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
  }
}


export const deleteUsers=async(req,res)=>{

  try{
    const {userId}=req?.params;
  if(!userId)return res.status(404).json({
      status:false,
      message:"userId is required"
    })
    const queryExistUsers=`DELETE FROM users WHERE id=?`
  
    const response=await queryPromis(queryExistUsers,[userId]);
      if(response?.affectedRows!==1)return res.status(404).json({
      status:false,
      messsage:"user not found"
    })
    return res.status(200).json({
      status:true,
      message:"user deleted successfully"
    })
  }catch(err){
 return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })

  }
}

//single users-->
export const getsingleUser=async(req,res)=>{
  try{
      const {userId}=req?.params;
  if(!userId)return res.status(404).json({
      status:false,
      message:"userId is required"
    })

    const queryExistUser=`SELECT * FROM users WHERE id=?`;
    const response=await queryPromis(queryExistUser,[userId]);
    if(response?.length==0)return res.status(404).json({status:false, message:"user not found"})
      return res.status(200).json({
         status:true,
         message:"user found successfully",
        existUser:response
      })
  }catch(err){
     return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
  }
}
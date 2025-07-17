import CompanyProfile from "../../models/company.model.js";

export const companyProfileCreate=async(req,res)=>{
    try{
    const data=req.body;
    const adminId=req?.user?.id;
    const image=req?.file?.filename;
   
    // if(!image)return res.status(404).json({status:false,message:"image"})
    const newCompany=await CompanyProfile.create({...data,adminId,profileImage:image});
     return res.status(201).json({
        status:true,
        message:"company created successfully",
        newCompany
     })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

export const getCompanyProfile=async(req,res)=>{
    try{
     const allCompany=await CompanyProfile.find({})
     return res.status(200).json({
        status:true,
        message:"all company details fetched successfully",
        allCompany
     })
    }catch(err){
         return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}


export const jobProfile=async(req,res)=>{

    
}
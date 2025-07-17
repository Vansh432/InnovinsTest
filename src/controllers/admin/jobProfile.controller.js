import StepOne from "../../models/jobStepForm/step1.model.js"
import StepsInformation from "../../models/jobStepForm/stepInformation.model.js";
import StepTwo from "../../models/jobStepForm/step2.model.js";
import StepThree from "../../models/jobStepForm/step3.model.js";
export const jobProfileStepOneCreate=async(req,res)=>{
   try{
    const data={...req.body}

    const newStep=await StepOne.create({...data});
    const companyId=data?.companyId;
    const step1Id=newStep?._id
    const stepOneInfor=await StepsInformation.create({
     companyId,
     step1Id,
     stepsCount:1
    })
    return res.status(201).json({
        status:true,
        message:"step 1 form created successfully",
        stepOne:newStep
    })

   }catch(err){

    return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
   }
    
}


export const jobProfileStepSecondCreate=async(req,res)=>{
    try{
    const data={...req.body}
    const newStep=await StepTwo.create({...data});
    const companyId=data?.companyId;
    const step1Id=data?.step1Id
    const stepOneInfor=await StepsInformation.findOneAndUpdate({step1Id},{
     stepsCount:2
    })
    return res.status(201).json({
        status:true,
        message:"step 2 form created successfully",
        stepOne:newStep
    })
    }catch(err){
return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}


export const jobProfileStepThreeCreate=async(req,res)=>{
    try{
    const data={...req.body}
    const newStep=await StepThree.create({...data});
    const companyId=data?.companyId;
    const step1Id=data?.step1Id
    const stepOneInfor=await StepsInformation.findOneAndUpdate({step1Id},{
     stepsCount:3
    })
    return res.status(201).json({
        status:true,
        message:"step 3 form created successfully",
        stepOne:newStep
    })
    }catch(err){
return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}


export const getJobProfileDetailsAllSteps=async(req,res)=>{
    try{
      const {stepOneId}=req.params;
      if(!stepOneId) return res.status(404).json({
        status:false,
        message:"step1 id is required"
      })

      const step1Details=await StepOne.findById(stepOneId);
      const step2Details=await StepTwo.findOne({step1Id:stepOneId});
      const step3Details=await StepThree.findOne({step1Id:stepOneId});
      return res.status(200).json({
        status:true,
        step1Details,
        step2Details,
        step3Details
      })
    }catch(err){
return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

export const submiteJobProfileForm=async(req,res)=>{
    try{
    const {stepOneId}=req.params;
      if(!stepOneId) return res.status(404).json({
        status:false,
        message:"step1 id is required"
      })
     const formSubmitted= await StepsInformation.findOneAndUpdate({step1Id:stepOneId},{finalSubmite:true},{new:true})
     return res.status(200).json({
        status:true,
        message:"form submitted successfully",
        formSubmitted
     })
  
    }catch(err){
return res.status(500).json({
            status:false,
            message:"Internal server error",
            error:err.message
        })
    }
}
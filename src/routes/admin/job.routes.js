import { Router } from "express";
import validate from "../../middlewares/validate.middlewares.js";
import {step1ValidationSchema,step2ValidationSchema,step3ValidationSchema} from '../../validations/joi.js'
import {jobProfileStepOneCreate,jobProfileStepSecondCreate,jobProfileStepThreeCreate,getJobProfileDetailsAllSteps,submiteJobProfileForm} from '../../controllers/admin/jobProfile.controller.js'
const route=Router();

route.post('/stepOne',validate(step1ValidationSchema),jobProfileStepOneCreate)
.post('/stepTwo',validate(step2ValidationSchema),jobProfileStepSecondCreate)
.post('/stepThree',validate(step3ValidationSchema),jobProfileStepThreeCreate)
.get('/allStepDetails',getJobProfileDetailsAllSteps)
.post('/submiteJobProfile',submiteJobProfileForm)
export default route;
import { Router } from "express";
import { companyProfileCreate,getCompanyProfile } from "../../controllers/admin/company.controller.js";
import validate from "../../middlewares/validate.middlewares.js";
import { companyProfileSchema } from "../../validations/joi.js";
import uploads from "../../middlewares/multer.middlewares.js";
import job from './job.routes.js'
const route=Router();


route.post('/',validate(companyProfileSchema),uploads.single('image'),companyProfileCreate)
route.get('/',getCompanyProfile)
route.use('/job',job)


export default route;
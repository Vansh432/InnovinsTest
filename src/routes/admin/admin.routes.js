import { Router } from "express";
import {login} from '../../controllers/admin/admin.controller.js'
import { adminLoginSchema } from "../../validations/joi.js";
import validate from "../../middlewares/validate.middlewares.js";
import {adminAuth} from '../../middlewares/auth.middlewares.js'
import company from './company.routes.js'
const route=Router();

route.post('/login',validate(adminLoginSchema),login)
route.use('/company',adminAuth,company);


export default route;
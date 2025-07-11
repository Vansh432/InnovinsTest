import { Router } from "express";
import {createUser} from '../controllers/user.controller.js'
import { validateUser } from "../validations/user.validation.js";

const routes=Router();

routes.post('/',validateUser,createUser)

export default routes;
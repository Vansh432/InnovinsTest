import { Router } from "express";
import { userRegisteration,userLogin,forgetPasswordUser,getListUsers, updateProfileUsers, deleteUsers,getsingleUser } from "../controllers/users/user.controller.js";
import { userAuth } from "../middlewares/auth.middlewares.js";
import validate from "../middlewares/validate.middlewares.js";
import { registerUser,userLoginSchema,verifyOtpAndResetPassword } from "../validations/joi.js";
import product from './products.route.js'

const routes=Router();

routes.post('/register',validate(registerUser),userRegisteration)
.post('/login',validate(userLoginSchema),userLogin)
.post('/forget_password',validate(verifyOtpAndResetPassword),forgetPasswordUser)
.use(userAuth)

// after authentication routes
.get('/all',getListUsers)
.get('/:userId',getsingleUser)
.put('/:userId',updateProfileUsers)
.delete('/:userId',deleteUsers)

//products-->
routes.use('/products',product)



export default routes;
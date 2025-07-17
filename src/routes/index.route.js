import { Router } from "express";
import Admin from "./admin/admin.routes.js";

const routes=Router();

routes.use('/admin',Admin)

export default routes;
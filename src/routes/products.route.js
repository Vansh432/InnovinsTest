import { Router } from "express";
import { createProduct, deleteSpecificProduct, getAllProducts, getSpecificProduct, updatedProducts } from "../controllers/products/product.controller.js";
import validate from "../middlewares/validate.middlewares.js";
import { createProductSchema } from "../validations/joi.js";
const route=Router();

route.post('/',validate(createProductSchema),createProduct)
.get('/all',getAllProducts)
.get('/:productId',getSpecificProduct)
.delete('/:productId',deleteSpecificProduct)
.put('/:productId',updatedProducts)
export default route;
import express from "express";
import index from './routes/index.route.js'
import { errorHandler,notFound } from "./middlewares/error.middlewares.js";
const app=express();

app.use('/api',index);

app.use(errorHandler)
app.use(notFound)

export default app;
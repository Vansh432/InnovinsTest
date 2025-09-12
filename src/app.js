import express from "express";
import cors from 'cors'
import index from './routes/users.route.js'
import { errorHandler,notFound } from "./middlewares/error.middlewares.js";
const app=express();

app.use(cors())
app.use(express.json());

app.use('/api/users/',index);


app.use(errorHandler)
app.use(notFound)

export default app;
import app from './src/app.js'
import { configDotenv } from 'dotenv'
import connectDB from './src/config/dbConfig.js';
configDotenv();
const port=process.env.PORT || 8000
connectDB();
app.listen(port,(err)=>{

    if(err){
        console.log("Server show the error, ",err)
        return
    }
    console.log("Server is runing on port:  ",port)
})
import app from './src/app.js'
import { configDotenv } from 'dotenv'
import pool from './src/config/dbConfig.js'
configDotenv();
const port=process.env.PORT || 8000

app.listen(port,(err)=>{

    if(err){
        console.log("Server show the error, ",err)
        return
    }
    console.log("Server is runing on port:  ",port)
})
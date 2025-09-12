import pool from "../config/dbConfig.js"

export const queryPromis=(query,value=[])=>{
    return new Promise((resolved,rejected)=>{
        pool.query(query,value,(err,result)=>{
            if(err){
                rejected(err)
            }
            resolved(result)
        })
    })
}
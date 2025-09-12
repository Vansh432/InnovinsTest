import mysql from 'mysql'
import { configDotenv } from 'dotenv';
configDotenv()
console.log(process.env.DB_HOST)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD ||  '',
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
    connection.release(); // Release the connection back to the pool
});
export default pool;

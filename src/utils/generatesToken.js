import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();
const jwtSecret=process.env.JWT_SECRET

export const generateToken = (user,expired) => {
  console.log("jwt sec",user)
  return jwt.sign({...user}, jwtSecret, { expiresIn:expired });
};

export const tokenVerify=(token)=>{
  return jwt.verify(token,jwtSecret)
}

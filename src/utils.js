import path from 'path';
import url from 'url';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const __filename = url.fileURLToPath(import.meta.url);

export const JWT_secret='ASD156 aDdds 22j1$#@d115s4dAA {"!2d4561'

export const __dirname = path.dirname(__filename);

export const createHash=(pass)=> bcrypt.hashSync(pass,bcrypt.genSaltSync(10));

export const verifyPassword= (pass,user)=>bcrypt.compareSync(pass,user.password)

export const createToken=(user)=>{
    const {
        _id,
        role,
        
    }=user

    const payload={
        id:_id,
        role
       
    }
    
    const token =jwt.sign(payload, JWT_secret, {expiresIn:'60m'})
}

export const verifyToken=(token)=>{
    return new promise((resolve,reject)=>{
        jwt.verify(token,JWT_secret,(error,payload)=>{
            if(error){
                return reject(error)
            }
            resolve(payload)
        })
    })
}
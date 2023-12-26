import {Router} from 'express';

import userManager from '../../userManager.js'
import { createToken } from '../../utils.js';

const router=Router()

router.post('/auth/register', async (req,res)=>{

    const user= await userManager.createUser(req)

    if(user===1){return res.status(400).json({message:'Todos los campos son requeridos'})}
    if(user===2){return res.status(400).json({message:'Usuario ya registrado'})}
   
    return res.status(200).json(user)
})

router.post('/auth/login', async(req,res)=>{
    const user = await userManager.verifyUser(req)
    if(user===1){return res.status(401).json({message:'Correo o Constrasenia son invalidos'})}
    
   const {email, password}= req.body

   if(!email || !password){
    res.status(401).json({message:'Correo o Constrasenia son invalidos'})
   }
   
   const token=createToken(user)
   

   res.cookie('access_token', token, {maxAge: 1000*60*60*24, httpOnly:true , signed:true}).status(200).json({message:"Inicio de secion exitoso"})
})


export default router;
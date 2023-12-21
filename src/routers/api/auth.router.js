import {Router} from 'express';

import userManager from '../../userManager.js'

const router=Router()

router.post('/auth/register', async (req,res)=>{

    const user= await userManager.createUser(req)

    if(user==="1"){res.status(400).json({message:'Todos los campos son requeridos'})}
    if(user==="2"){res.status(400).json({message:'Usuario ya registrado'})}
   
    res.status(200).json(user)
})

/* router.post('/auth/login', async(req,res)=>{
   
})
 */
export default router;
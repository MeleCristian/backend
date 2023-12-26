import userModel from './models/user.model.js'
import cartManager from './cartManager.js'
import {createHash, verifyPassword} from "./utils.js"

class userManager{
    static async createUser(req){
        const {
            body:{
                first_name,
                last_name,
                dni,
                email,
                password,
                role
            }
            }=req
        
            if(
                !first_name||
                !last_name||
                !dni||
                !email||
                !password
                ){
                    return 1
            }
        
            let user= await userModel.findOne({email})
        
            if(user){
                return 2
            }
        
            let newCart= await cartManager.addCart()
            
            const createdUser=userModel.create({
                first_name,
                last_name,
                dni,
                email,
                password:createHash(password),
                role,
                cart: newCart._id,
            })
            
            return createdUser
    }
    
    static async verifyUser (req){
        const {email, password}= req.body

        if(!email || !password){
            return 1
        }
        const user = await userModel.findOne({email})
        
        if(!user){
            return 1
        }

        const isNotValidPass=!verifyPassword(password,user)

        if(isNotValidPass){
            return 1
        }

        return user
    }
}

export default userManager
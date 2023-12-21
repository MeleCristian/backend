import userModel from './dao/models/user.model.js'
import cartManager from './cartManager.js'
import {createHash} from "./utils.js"

class userManager{
    static async createUser(req){
        const {
            body:{
                first_name,
                last_name,
                dni,
                email,
                password,
            }
            }=req
        
            if(
                !first_name||
                !last_name||
                !dni||
                !email||
                !password
                ){
                    return "1"
            }
        
            let user= await userModel.findOne({email})
        
            if(user){
                return "2"
            }
        
            let newCart= await cartManager.addCart()
            
            const createdUser=userModel.create({
                first_name,
                last_name,
                dni,
                email,
                password:createHash(password),
                cart: newCart._id,
            })
            
            return createdUser
    }
}

export default userManager
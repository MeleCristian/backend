import fs from  "fs"
import cartModels from "./models/cart.models.js";

class CartManager {

  //Declaro addCart
  static async addCart() {
    const cart=await cartModels.create({

    })
   return cart
  }

  //Declarao GetProducts by id
  static async getCartById(id) {
    const cart = await cartModels.findOne({_id:id})
    .populate({
      path:'productsList',
      populate:{
        path:'product'
      }
    })
    console.log('cart', cart.productsList)
    if (!cart) {
      throw new Error('Producto no encontrado')
    }
    return cart
  }

  //Declaro Update cart by id
  static async updateCartById(cartId, productId, quantity=1) {
    let aux=true
    const cart=await cartModels.findOne({_id:cartId})
    
    cart.productsList.forEach(e =>{
      if(e.product==productId){
        e.quantity=quantity
        aux=false  
      }
    })
    
    if(aux){
      cart.productsList.push({product:productId, quantity:quantity})
    }
    
    await cartModels.updateOne({_id:cartId},cart)
    return cart
  }

  static async deletAllProducts(cartId){
    const cart=await cartModels.findOne({_id:cartId})
    cart.productsList=[]
    
    await cartModels.updateOne({_id:cartId},cart)
  }

  static async deletproductFromCart(cartId,productId){
    const cart=await cartModels.findOne({_id:cartId})
    console.log("cart",cart.productsList)
    const newCart=cart.productsList.filter((element)=>element.product!=productId)
    console.log("newcart",newCart)
    //await cartModels.updateOne({_id:cartId},newCart)
  }
}


export default CartManager

import fs from  "fs"
import cartModels from "./dao/models/cart.models.js";
import { stringify } from "querystring";


class CartManager {
  //Declaro constructor

  //Declaro addCart
  static async addCart() {
    const cart=await cartModels.create({

    })
   return cart
  }

  //Declarao GetProducts by id
  static async getCartById(id) {
    const cart = await cartModels.find({_id:id})
    console.log('cart', JSON.stringify(cart))
    if (!cart) {
      throw new Error('Producto no encontrado')
    }
    return cart
  }

  //Declaro Update cart by id
  static async updateCartById(cartId, productId) {
    const cid= '6567dd25851c36b9f9b9f5d3'
    const cart=await cartModels.findOne({_id:cartId})
    
    cart.products.push({product:cid})
    console.log(cart)
    await cartModels.updateOne({_id:cartId},cart)

  }
}


export default CartManager

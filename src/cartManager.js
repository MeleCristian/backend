import fs from  "fs"
import cartModels from "./dao/models/cart.models.js";
import { stringify } from "querystring";


class CartManager {
  //Declaro constructor

  //Declaro addCart
  static addCart() {
    return cartModels.create()
  }

  //Declarao GetProducts by id
  static async getCartById(id) {
    const cart = await cartModels.findById(id)
    if (!cart) {
      throw new Error('Producto no encontrado')
    }
    return cart
  }

  //Declaro Update cart by id
  static async updateCartById(cartId, productId) {
    const addedProduct={id:productId,quantity:1}
    const cart=await CartManager.getCartById(cartId)
    
    const updatedCart=cart.products.map(product=>product.toJSON())
    updatedCart.push(addedProduct)
    await cartModels.updateOne({_id:cartId},{$set:updatedCart})

  }
}


export default CartManager

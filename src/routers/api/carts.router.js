import  { Router } from "express"
import CM from "../../cartManager.js"
import { __dirname } from "../../utils.js";
import path from "path"

const router = Router();


router.post("/carts", async (req, res) => {
  const cart= await CM.addCart();
  res.status(200).json(cart)
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  const cart = await CM.updateCartById(cid,pid);
 
  if (cart) {
    res.status(201).end()
  } else {
    res.status(501).json({ error: `cart con id: ${cid} no encontrado ` });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await CM.getCartById(cid);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(501).json({ error: `cart con id: ${cid} no encontrado ` });
  }
});

router.delete("/carts/:cid/products/:pid", async(req , res)=>{
  const {cid ,pid}=req.params
  await CM.deletproductFromCart(cid,pid)
  res.status(201).end()
})

router.delete("/carts/:cid", async (req,res)=>{
  const {cid}=req.params
  await CM.deletAllProducts(cid)
  res.status(201).end()
})

router.put("/carts/:cid", async(req,res)=>{
  const {cid}=ret.params
})

router.put("/carts/:cid/products/:pid", async (req,res)=>{
  const {cid, pid}=req.params
  const quantity =req.body.quantity
  
  const cart=await CM.updateCartById(cid,pid,quantity)
  res.status(201).end()

})

export default router

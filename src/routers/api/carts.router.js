import  { Router } from "express"
import CM from "../../cartManager.js"
import { __dirname } from "../../utils.js";
import path from "path"

const router = Router();


router.post("/carts", async (req, res) => {
  const cart= await CM.addCart();
  res.status(200).json(cart)
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
router.post("/carts/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  await CM.updateCartById(cid,pid);
  res.status(201).end()
});

export default router

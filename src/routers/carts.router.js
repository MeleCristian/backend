const { Router } = require("express");
const CM = require("../cartManager");

const router = Router();
const cartManager = new CM.cartManager("./src/carritos.json");

router.post("/carts", async (req, res) => {
  await cartManager.addCart();
});
router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(parseInt(cid));
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(501).json({ error: `cart con id: ${cid} no encontrado ` });
  }
});
router.post("/carts/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  await cartManager.updateCartById(parseInt(cid), parseInt(pid));
  res.json(await cartManager.getCartById(parseInt(cid)));
});

module.exports = router;

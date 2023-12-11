import { Router } from "express"

import PM from "../../productMaanger.js"
import { __dirname } from "../../utils.js";

const router = Router();

router.get(`/products`, async (req, res) => {
  const { query } = req;
  
  let products = await PM.getProducts(query,true)
  res.status(200).json(products);
});

router.get(`/products/:pid`, async (req, res) => {
  const { pid } = req.params;
  const product = await PM.getProductById(pid)

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(501).json({ error: `Producto con id: ${pid} no encontrado ` });
  }
});

router.post("/products", async (req, res) => {
  const { body } = req;

  await PM.addProduct(body)
  res.status(201).json(body);
});

router.put("/products/:pid", async (req, res) => {
  const { body } = req;
  const { pid } = req.params;

  await PM.updateProductById(pid,body)
  res.status(204).end();
});

router.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;

  await PM.deletProductById(pid)
  res.status(204).end();
});

export default router
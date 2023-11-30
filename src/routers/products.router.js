import { Router } from "express"
import PM from "../productMaanger.js"
import { __dirname } from "../utils.js";
import path from "path"
import productsModels from "../models/products.models.js";

const router = Router();
const productList = new PM(path.join(__dirname, "/data/product-list.json"));


router.get(`/`, async (req, res) => {
  //let products=await productList.getProducts()
  let products= await productsModels.find({})
  res.render('home',{title: "Video Games",products})

});

router.get(`/products`, async (req, res) => {
  const { query } = req;
  const { limit } = query;

  let products = await productsModels.find({})
  if (!limit) {
    res.status(200).json(products);
    console.log(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    res.status(200).json(limitedProducts);
  }
});
router.get(`/products/:pid`, async (req, res) => {
  const { pid } = req.params;
  const product = await productList.getProductById(parseInt(pid));

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(501).json({ error: `Producto con id: ${pid} no encontrado ` });
  }
});

router.post("/products", async (req, res) => {
  const { body } = req;
  await productList.addProduct(body);
  res.status(201).json(body);
});

router.put("/products/:pid", async (req, res) => {
  const { body } = req;
  const { pid } = req.params;
  await productList.updateProductById(parseInt(pid), body);
  res.status(201).json(body);
});

router.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await productList.getProductById(parseInt(pid));
  await productList.deletProductById(parseInt(pid));
  res.status(201).json(deletedProduct);
});

export default router
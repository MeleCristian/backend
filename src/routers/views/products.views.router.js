import { Router } from "express"

import PM from "../../productMaanger.js"
import { __dirname } from "../../utils.js";

const router = Router();

router.get(`/products`, async (req, res) => {
  const { query } = req;
  
  let products = await PM.getProducts(query,false)
  
  res.render("products",{title:"Video games", ...products})
});


export default router
const express = require("express");
const PM = require("./productMaanger");

const app = express();
app.use(express.urlencoded({ extended: true }));

const productList = new PM.productManager("./text-output-file.json");

app.get("/", async (req, res) => {
  res.send("Hola desde el index");
});

app.get(`/products`, async (req, res) => {
  const { query } = req;
  const { limit } = query;
  let products = await productList.getProducts();
  if (!limit) {
    res.json(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  }
});
app.get(`/products/:id`, async (req, res) => {
  const { id } = req.params;
  const product = await productList.getProductById(parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.json({ error: `Producto con id: ${id} no encontrado ` });
  }
});
app.listen(8080, () => {
  console.log("servidor escuchando desde 8080");
});

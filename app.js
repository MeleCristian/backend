const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const products = [
  {
    id: 1,
    producto: "remera",
    precio: 2000,
    stock: 10,
  },
  {
    id: 2,
    producto: "buzo",
    precio: 5000,
    stock: 5,
  },
  {
    id: 3,
    producto: "pantalon",
    precio: 1000,
    stock: 3,
  },
  {
    id: 4,
    producto: "short",
    precio: 2500,
    stock: 7,
  },
  {
    id: 5,
    producto: "campera",
    precio: 20000,
    stock: 2,
  },
  {
    id: 6,
    producto: "jean",
    precio: 10000,
    stock: 8,
  },
  {
    id: 7,
    producto: "zapatillas",
    precio: 20000,
    stock: 5,
  },
  {
    id: 8,
    producto: "camisa",
    precio: 7000,
    stock: 10,
  },
  {
    id: 9,
    producto: "cinturon",
    precio: 1000,
    stock: 20,
  },
  {
    id: 10,
    producto: "chaleco",
    precio: 15000,
    stock: 10,
  },
];
app.get("/", (req, res) => {
  res.send("Hola desde el servidor de express");
});
app.get(`/products`, (req, res) => {
  const { query } = req;
  const { limit } = query;
  if (!limit) {
    res.json(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  }
});
app.get(`/products/:id`, (req, res) => {
  const { id } = req.params;
  const product = products.find((prod) => {
    return prod.id === parseInt(id);
  });
  if (product) {
    res.json(product);
  } else {
    res.json({ error: `Producto con id: ${id} no encontrado ` });
  }
});
app.listen(8080, () => {
  console.log("servidor escuchando desde 8080");
});

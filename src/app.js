const express = require("express");
const PM = require("./productMaanger");
const productsRouter = require("./routers/products.router");
const cartRouter = require("./routers/carts.router");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hola desde el index");
});

app.use("/api", productsRouter, cartRouter);
app.listen(PORT, () => {
  console.log("servidor escuchando desde 8080");
});

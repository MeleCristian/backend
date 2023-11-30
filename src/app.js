import express from "express"
import path from "path"

import { __dirname } from "./utils.js";
import productsRouter from "./routers/products.router.js"
import cartRouter from "./routers/carts.router.js"


import handlebars from "express-handlebars"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine() )
app.set('views',path.join(__dirname,'views') )
app.set('view engine', 'handlebars')

/* app.get("/", async (req, res) => {
  res.render('home',{title: "Video Games"})

}); */

app.use("/", productsRouter, cartRouter);


export default app
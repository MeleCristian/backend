import express from "express"
import productsRouter from "./routers/products.router.js"
import cartRouter from "./routers/carts.router.js"
import { __dirname } from "./utils.js";
import path from "path"
import handlebars from "express-handlebars"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine() )
app.set('views',path.join(__dirname,'views') )
app.set('view engine', 'handlebars')

app.get("/", async (req, res) => {
  res.render('home',{title: "Video Games"})

});

app.use("/api", productsRouter, cartRouter);
app.listen(PORT, () => {
  console.log("servidor escuchando desde 8080");
});

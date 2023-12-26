import express from "express"
import path from "path"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import passport from "passport"

import {init as initPassport} from './config/passport.config.js'
import { __dirname } from "./utils.js";
import productsApiRouter from "./routers/api/products.router.js"
import cartApiRouter from "./routers/api/carts.router.js"
import productsViewsRouter from "./routers/views/products.views.router.js"
import autApiRouter from './routers/api/auth.router.js'
import userRouter from "./routers/api/user.router.js"


const cookieSecret="Ads12DS@!3 {!2312 SDsadD3341@!#%512D!~+)Dsa(!#!"
const app = express();

app.use(cookieParser(cookieSecret))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine() )
app.set('views',path.join(__dirname,'views') )
app.set('view engine', 'handlebars')

initPassport()
app.use(passport.initialize())


app.use("/api", productsApiRouter, cartApiRouter,autApiRouter,userRouter);
app.use("/",productsViewsRouter)

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
  });

export default app
import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import {Server} from "socket.io"

const app = express();
const port = 8080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Tienda de ropa Argentina",
    name: "Campeones del mundo"
  });
})

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(port, () => {
  console.log(`Iniciado en http://localhost:${port}`);
});

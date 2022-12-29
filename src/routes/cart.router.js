import express from "express";
import { v4 } from "uuid";
import path from "path";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await getAll();
    res.send(carts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.post("/", async (req, res) => {
  const newCart = {
    id: v4(),
    products: [],
  };

  try {
    const carts = await getAll();
    await writeAll([...carts, newCart]);
    res.send(newCart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const carts = await getAll();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const carts = await getAll();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
    const products = await getAll();
    const product = products.find((product) => product.id === pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    const productInCart = cart.products.find((product) => product.id === pid);
    if (productInCart) {
      productInCart.quantity++;
      await writeAll(carts);
      res.send("Producto agregado al carrito");
      return;
    } else {
      cart.products.push({ id: pid, quantity: 1 });
      await writeAll(carts);
      res.send("Producto agregado al carrito");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const productInCart = cart.products.find((product) => product.id === pid);
    if (productInCart) {
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
        await writeAll(carts);
        res.send("Producto eliminado del carrito");
        return;
      } else {
        cart.products = cart.products.filter((product) => product.id !== pid);
        await writeAll(carts);
        res.send("Producto eliminado del carrito");
        return;
      }
    } else {
      res.status(404).send("Producto no encontrado en el carrito");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const carts = await getAll();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) {
      res.status(404).send("Carrito no encontrado");
      return;
    }
    const newCarts = carts.filter((cart) => cart.id !== cid);
    await writeAll(newCarts);
    res.send("Eliminado del carrito");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default cartRouter;
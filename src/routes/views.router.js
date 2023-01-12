import express from "express";

const router = express.Router();
let ListaProducts = [
  {product: "Camiseta titular Argentina", price: "20000"},
	{product: "Camiseta alternativa Argentina",price: "20000"},
	{product: "Short titular Argentina", price: "9000"},
	{product: "Short alternativa Argentina", price: "9000"},
	{product: "Medias titulares Argentina blancas", price: "4000"},
	{product: "Medias titulares Argentina negras", price: "4000"},
	{product: "Medias alternativa Argentina", price: "4000"},
	{product: "Camiseta entremaniento Argentina", price: "14000"},
	{product: "Campera entremaniento Argentina", price: "24000"},
	{product: "Musculosa entrenamiento alternativa Argentina", price: "12000"}
];

export default router;
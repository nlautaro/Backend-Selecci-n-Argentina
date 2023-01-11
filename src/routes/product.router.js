import { Router } from "express";

const router = Router();

const products = [
  {
		"id": 1,
		"title": "Camiseta titular Argentina",
		"description": "Camiseta titular de la selección Argentina Lionel Messi Qatar 2022",
		"price": 20000,
		"thumbnail": "https://assets.adidas.com/images/w_600,f_auto,q_auto/d88ae2138faf49be8f74aeca012c62eb_9366/Camiseta_Titular_Argentina_22_Messi_Blanco_HL8425_01_laydown.jpg",
		"stock": 150
	},
	{
		"id": 2,
		"title": "Camiseta alternativa Argentina",
		"description": "Camiseta alternativa de la selección Argentina Lionel Messi Qatar 2022",
		"price": 20000,
		"thumbnail": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a37248da803e40d08f48af04010aae24_9366/Camiseta_Suplente_Seleccion_Argentina_Messi_1_Azul_IQ5463_01_laydown.jpg",
		"stock": 100
	},
	{
		"id": 3,
		"title": "Short titular Argentina",
		"description": "Short titular de la selección Argentina Qatar 2022",
		"price": 9000,
		"thumbnail": "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/095/885/products/short-juego-argentina1-2b77fd6c0b763f88aa16622284057689-480-0.jpg",
		"stock": 100
	},
	{
		"id": 4,
		"title": "Short alternativa Argentina",
		"description": "Short alternativa de la selección Argentina Qatar 2022",
		"price": 9000,
		"thumbnail": "https://www.stockcenter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw0b9b8ba8/products/AD_HF1487/AD_HF1487-1.JPG",
		"stock": 100
	},
	{
		"id": 5,
		"title": "Medias titulares Argentina blancas",
		"description": "Medias titulares de la selección Argentina Qatar 2022 color blancas",
		"price": 4000,
		"thumbnail": "https://www.afashop.com.ar/ccstore/v1/images/?source=/file/v5435783882006836140/products/Medias_Uniforme_Titular_Argentina_22_Blanco_HB9207_03_standard.jpg&height=475&width=475",
		"stock": 100
	},
	{
		"id": 6,
		"title": "Medias titulares Argentina negras",
		"description": "Medias titulares de la selección Argentina Qatar 2022 color negras",
		"price": 4000,
		"thumbnail": "https://www.afashop.com.ar/ccstore/v1/images/?source=/file/v2966411569485729316/products/Medias_Uniforme_Titular_Argentina_22_Negro_HC5837_01_standard.jpg&height=475&width=475",
		"stock": 100
	},
	{
		"id": 7,
		"title": "Medias alternativa Argentina",
		"description": "Medias alternativa de la selección Argentina Qatar 2022",
		"price": 4000,
		"thumbnail": "https://www.afashop.com.ar/ccstore/v1/images/?source=/file/v8210111540727161594/products/HB9208_APP-F.jpg&height=475&width=475",
		"stock": 100
	},
	{
		"id": 8,
		"title": "Camiseta entremaniento Argentina",
		"description": "Camiseta de entremaniento celeste Argentina Qatar 2022",
		"price": 14000,
		"thumbnail": "https://assets.adidas.com/images/w_600,f_auto,q_auto/9d4f890d37824fd784b0ae9000e5ad44_9366/Camiseta_de_entrenamiento_Argentina_Tiro_23_Azul_HF3929_01_laydown.jpg",
		"stock": 100
	},
	{
		"id": 9,
		"title": "Campera entremaniento Argentina",
		"description": "Campera de entremaniento celeste Argentina Qatar 2022",
		"price": 24000,
		"thumbnail": "https://assets.adidas.com/images/w_600,f_auto,q_auto/9d4f890d37824fd784b0ae9000e5ad44_9366/Camiseta_de_entrenamiento_Argentina_Tiro_23_Azul_HF3929_01_laydown.jpg",
		"stock": 100
	},
	{
		"id": 10,
		"title": "Musculosa entrenamiento alternativa Argentina",
		"description": "Musculosa de entrenamiento alternativa Argentina Qatar 2022",
		"price": 12000,
		"thumbnail": "https://www.afashop.com.ar/ccstore/v1/images/?source=/file/v4578679696367312425/products/HF3924_1_APPAREL_Photography%20-%20eCommerce_Front%20View_grey.jpg&height=300&width=300",
		"stock": 100
	}
];

router.get("/", (req, res) => {
  res.send(products || []);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    res.status(404).send("Producto no encontrado");
  }
  res.send(product);
});

router.post("/", (req, res) => {
  const product = req.body;
  const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
  product.id = maxId + 1;
  products.push(product);
  res.send({
    status: "Ok",
    message: "Producto agregada",
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    res.status(404).send("Mascota no encontrada");
  }
  const productNew = req.body;
  product.title = productNew.title;

  const index = products.indexOf((product) => product.id === parseInt(id));
  products[index] = product;
  res.send({
    status: "Ok",
    message: "Producto actualizado",
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    res.status(404).send("Producto no encontrado");
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send({
    status: "Ok",
    message: "Producto eliminado",
  });
});

export default router;
import express from "express";
const app = express();

const products = [
  {
    id: 1,
    title: "Bag",
  },
  {
    id: 2,
    title: "Bottle",
  },
  {
    id: 3,
    title: "Cap",
  },
];

app.get("/", (req, res) => {
  res.send("Hello from node js");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const getSingleProduct = products.find((product) => product.id === productId);
  if (getSingleProduct) {
    res.send(getSingleProduct);
  } else {
    res.status(404).send("product not found!");
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});

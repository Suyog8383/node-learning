import express from "express";
const app = express();

const myFirstMiddleWare = (req, res, next) => {
  console.log("hello from middle ware");
  next();
};

app.use(myFirstMiddleWare);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});

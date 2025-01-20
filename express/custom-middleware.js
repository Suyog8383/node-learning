import express from "express";
const app = express();

const myFirstMiddleWare = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`time=${timeStamp} from ${req.url} to ${req.method}`);
  next();
};

app.use(myFirstMiddleWare);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});

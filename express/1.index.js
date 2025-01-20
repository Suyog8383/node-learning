import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Node Js");
});

app.listen(3000, () => {
  console.log("server running on the port 3000");
});

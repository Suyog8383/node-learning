import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;
const Mobile = [
  {
    id: 1,
    brand: "Nokia 1",
    price: "3000",
  },
  {
    id: 2,
    brand: "Nokia 2",
    price: "2500",
  },
  {
    id: 3,
    brand: "Nokia 3",
    price: "5000",
  },
];
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("/mobile/get", (req, res) => {
  res.status(200).send(Mobile);
});
app.post("/mobile/add", (req, res) => {
  const newMobile = {
    id: Mobile.length + 1,
    brand: `Nokia ${Mobile.length + 1}`,
    price: "5000",
  };
  Mobile.push(newMobile);
  res.status(200).send("Mobile Added!");
});

app.put("/mobile/update/:id", (req, res) => {
  const mobileId = parseInt(req.params.id);
  const updateMobile = Mobile.find((item) => item.id === mobileId);
  if (updateMobile) {
    updateMobile.price = "100";
    res.status(200).send("Mobile Updated");
  }
  res.status(401).send("Mobile Not Found");
});

app.delete("/mobile/delete/:id", (req, res) => {
  const mobileId = parseInt(req.params.id);
  const mobileIndex = Mobile.findIndex((item) => item.id === mobileId);
  if (mobileIndex !== -1) {
    Mobile.splice(mobileIndex, 1);
    res.status(200).send("Mobile Deleted!");
  }
  res.status(404).send("Mobile Not Deleted!");
});

app.listen(PORT, () => {
  console.log(`Server running on the PORT ${PORT}`);
});

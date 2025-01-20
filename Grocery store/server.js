import "dotenv/config";
import express from "express";
import groceryDb from "./database/db.js";
import router from "./routes/groceryRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

//connect to database
groceryDb();

//middleware
app.use(express.json());

//routes
app.use("/api/grocery", router);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

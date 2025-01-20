import "dotenv/config";
import express from "express";
import connectDataBase from "./database/db.js";
import route from "./routes/user-auth-route.js";
import homeRoute from "./routes/home-route.js";
import adminRoute from "./routes/admin-route.js";

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json());

//database connection
connectDataBase();

//routes
app.use("/api/auth", route);
app.use("/api/home", homeRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

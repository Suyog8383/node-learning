import mongoose from "mongoose";

//schema
const grocerySchema = new mongoose.Schema({
  title: String,
  price: String,
  createdAt: { type: Date, default: Date.now },
});

//model
const Grocery = mongoose.model("Grocery", grocerySchema);

export default Grocery;

import express from "express";
import groceryController from "../controllers/groceryController.js";
const router = express.Router();

router.get("/get", groceryController.getAllGrocery);
router.get("/get/:id", groceryController.getSingleGrocery);
router.post("/add", groceryController.addGrocery);
router.put("/update/:id", groceryController.updateGrocery);
router.delete("/delete/:id", groceryController.deleteGrocery);

export default router;

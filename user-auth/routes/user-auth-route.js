import express from "express";
import userController from "../controllers/user-controller.js";
const route = express.Router();

route.post("/register", userController.registerUser);
route.post("/login", userController.loginUser);

export default route;

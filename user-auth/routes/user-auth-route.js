import express from "express";
import userController from "../controllers/user-controller.js";
import authValidation from "../middleWare/auth-validation.js";
const route = express.Router();

route.post("/register", userController.registerUser);
route.post("/login", userController.loginUser);
route.post("/change-password", authValidation, userController.changePassword);

export default route;

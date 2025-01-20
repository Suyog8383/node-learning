import express from "express";
import authValidation from "../middleWare/auth-validation.js";
import adminMiddleWare from "../middleWare/admin-validation.js";

const adminRoute = express.Router();

adminRoute.get("/welcome", authValidation, adminMiddleWare, (req, res) => {
  res.send({
    message: "this is admin only page",
  });
});

export default adminRoute;

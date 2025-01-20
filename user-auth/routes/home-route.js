import express from "express";
import authValidation from "../middleWare/auth-validation.js";

const homeRoute = express.Router();

homeRoute.get("/welcome", authValidation, (req, res) => {
  const { userId, username, email, role } = req.userInfo;
  res.json({
    message: "this is home page!",
    data: {
      userId: userId,
      username: username,
      email: email,
      role: role,
    },
  });
});

export default homeRoute;

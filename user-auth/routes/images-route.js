import express from "express";
import authValidation from "../middleWare/auth-validation.js";
import adminMiddleWare from "../middleWare/admin-validation.js";
import upload from "../middleWare/imgae-upload.js";
import imageControllers from "../controllers/image-controller.js";

const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  authValidation,
  adminMiddleWare,
  upload.single("image"),
  imageControllers.uploadImage
);

imageRouter.get("/get", authValidation, imageControllers.getImages);

export default imageRouter;

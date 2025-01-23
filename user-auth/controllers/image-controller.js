import cloudinary from "../config/clodinary.js";
import uploadToClodinary from "../helpers/cloudinary-helper.js";
import imageModal from "../models/image.js";
import fs from "fs";

const uploadImage = async (req, res) => {
  try {
    //check if file is present in the request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }
    //upload on clodinary
    const { url, publicId } = await uploadToClodinary(req.file.path);
    //upload in mongodb
    const imageUpload = await imageModal.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: imageUpload,
    });
  } catch (error) {
    console.log(error);
  }
};

const getImages = async (req, res) => {
  try {
    const images = await imageModal.find({});
    return res.status(200).json({
      success: true,
      message: "All images",
      data: images,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    const image = await imageModal.findById(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    //first delete image from clodinary
    await cloudinary.uploader.destroy(image.publicId);
    //then delete from mongodb
    await imageModal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export default { uploadImage, getImages, deleteImage };

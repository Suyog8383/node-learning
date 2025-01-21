import cloudinary from "../config/clodinary.js";

const uploadToClodinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);

    const { secure_url, public_id } = uploadResult;

    return {
      url: secure_url,
      publicId: public_id,
    };
  } catch (error) {
    console.error("Errror uploading to cloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export default uploadToClodinary;

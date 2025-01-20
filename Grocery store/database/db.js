import mongoose from "mongoose";

const groceryDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://suyognagawade8383:suyognagawade123456@cluster0.7ruq5.mongodb.net/"
    )
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
};

export default groceryDB;

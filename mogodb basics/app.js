import mongoose, { Schema } from "mongoose";
mongoose
  .connect(
    "mongodb+srv://suyognagawade8383:suyognagawade8383@cluster0.06tuu.mongodb.net/"
  )
  .then(() => {
    console.log("database connected!");
  })
  .catch((err) => console.log(err));

//craete user schema
const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExample() {
  try {
    //create new user
    const newUser = await User.create({
      name: "test user 1",
      email: "test@gmail.com",
      age: 23,
      isActive: true,
      tags: ["developer", "designer"],
    });
    console.log("new user created=>", newUser);
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExample();

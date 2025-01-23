import User from "../models/user-auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if username or email already exists
    const checkUserExistance = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUserExistance) {
      return res.status(401).json({
        success: false,
        message: "Username or email already exists! Please try again.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUserExistance = await User.findOne({ email });
    if (!checkUserExistance) {
      return res.status(400).json({
        success: false,
        message: "Email not found, Please check the email id and try again!",
      });
    }
    const checkPassword = await bcrypt.compare(
      password,
      checkUserExistance.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email and password!",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: checkUserExistance._id,
        username: checkUserExistance.username,
        email: checkUserExistance.email,
        role: checkUserExistance.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    // Extract only the required fields
    const userData = {
      username: checkUserExistance.username,
      email: checkUserExistance.email,
      role: checkUserExistance.role,
      createdAt: checkUserExistance.createdAt,
      updatedAt: checkUserExistance.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "Successfully login",
      data: userData,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    //userid from token
    const userId = req.userInfo.userId;

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "please enter different password!",
      });
    }

    //check user exists or not
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "user not exists",
      });
    }

    //bcrypt password compare(check user entered old password is correct or not)
    const checkPassword = await bcrypt.compare(
      oldPassword,
      userExists.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid old password",
      });
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //save new hashed password into database
    userExists.password = hashedPassword;
    await userExists.save();

    return res.status(201).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
};

export default { registerUser, loginUser, changePassword };

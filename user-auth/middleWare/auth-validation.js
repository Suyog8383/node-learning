import jwt from "jsonwebtoken";

const authValidation = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("@SN ", token);

  if (!token) {
    return res.status(401).send({
      message: "please provide token",
    });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("@SN ", decodeToken);
    req.userInfo = decodeToken;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }
};

export default authValidation;

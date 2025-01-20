const adminMiddleWare = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(403).send({
      message: "access denied!",
    });
  }
  next();
};

export default adminMiddleWare;

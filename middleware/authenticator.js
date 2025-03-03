// Description: Middleware to authenticate user using JWT token.
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error authenticating user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticator;
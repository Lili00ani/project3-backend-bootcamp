const jwt = require("jsonwebtoken");

const { default: userModal } = require("../db/models/userModal");
// Middleware for authentication
const isAuthenticated = (req, res, next) => {
  // Get the token from the request cookies
  const token = req?.cookies?.token;

  // Verify the token
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded.id; // Add the decoded user object to the request object
    next();
  });
};

const isAuthorize = (requiredRole) => async (req, res, next) => {
  // Check if user object exists in request (i.e., if the user is authenticated)
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: You are not authenticated" });
  }
  let id = req.user;
  const user = await userModal.findOne({ where: { id } });
  if (user.dataValues.role !== requiredRole) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Insufficient permissions" });
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAuthorize,
};

const {
  login,
  register,
  findAllUsers,
  deleteUser,
  updateUser,
  findUserById,
  logout,
} = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const { auth: Auth0, requiresAuth } = require("express-openid-connect");

router.get("/signin", login);
router.post("/signup", register);
router.delete("/:id", requiresAuth, deleteUser);
router.put("/:id", requiresAuth, updateUser);
router.get("/users", requiresAuth, findAllUsers);
router.get("/:id", requiresAuth, findUserById);
router.post("/logout", requiresAuth, logout);

module.exports = router;

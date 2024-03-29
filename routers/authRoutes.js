// const {
//   login,
//   register,
//   findAllUsers,
//   deleteUser,
//   updateUser,
//   findUserById,
// } = require("../controllers/authController");
// const express = require("express");
// const { isAuthenticated, isAuthorize } = require("../middlewares/verifyToken");
// const router = express.Router();

// router.post("/signin", login);
// router.post("/signup", register);
// router.delete("/:id", isAuthenticated, isAuthorize("admin"), deleteUser);
// router.put("/:id", isAuthenticated, isAuthorize("admin"), updateUser);
// router.get("/users", isAuthenticated, isAuthorize("admin"), findAllUsers);
// router.get("/:id", isAuthenticated, isAuthorize("admin"), findUserById);

// module.exports = router;

// import { login, register } from "../controllers/authController";
const { login, register } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.post("signin", login);
router.post("signup", register);
module.exports = router;

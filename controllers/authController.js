const bcrypt = require("bcrypt");
const user = require("../db/models/userModal");
const uuid = require("uuid");
const { default: userModal } = require("../db/models/userModal");
const { generateJWT } = require("../utils/AuthToken");
const findAllUsers = async (req, res) => {
  try {
    const users = await userModal.findAll();
    res.send(users);
  } catch (error) {
    console.error("Error finding users:", error);
  }
};

const login = async (req, res) => {
  res.redirect("/login");

  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res
  //     .status(400)
  //     .json({ message: "Please provide email and password" });
  // }

  // try {
  //   const userExists = await userModal.findOne({ where: { email } });
  //   if (!userExists) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   const isPasswordValid = await bcrypt.compare(password, userExists.password);
  //   if (!isPasswordValid) {
  //     return res.status(401).json({ message: "Invalid password" });
  //   }
  //   const token = generateJWT(userExists);
  //   return res
  //     .status(200)
  //     .cookie("token", token, {
  //       httpOnly: true,
  //       maxAge: 3600000,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //     })
  //     .json({
  //       id: userExists.dataValues.id,
  //       name: userExists.dataValues.name,
  //       email: userExists.dataValues.email,
  //       role: userExists.dataValues.role,
  //       message: "Login successfull",
  //     });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const existingUser = await userModal.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuid.v4();
    await userModal.create({
      id,
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    await userModal.update({ name, email, password, role }, { where: { id } });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModal.destroy({ where: { id } });
    return res.status(200).json({ message: `User deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModal.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.status(200).cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully 🙁" });
};

module.exports = {
  register,
  findAllUsers,
  deleteUser,
  login,
  updateUser,
  findUserById,
  logout,
};

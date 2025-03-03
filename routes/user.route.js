const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user.model");
const authenticator = require("../middleware/authenticator");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ statusCode: 201, message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please register first!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ statusCode: 200, message: "User logged in successfully", token });
  } catch (error) {
    console.log("Error logging in user: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
});

router.get("/profile", authenticator, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }
    res.status(200).json({
      statusCode: 200,
      message: "User Profile fetched successfully fetched!",
      data: user,
    });
  } catch (error) {
    console.log("Error fetching user profile: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
});

router.patch("/update", authenticator, async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, password } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ statusCode: 200, message: "User updated successfully" });
  } catch (error) {
    console.log("Error updating user: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
});

router.delete("/delete", authenticator, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }
    res
      .status(200)
      .json({ statusCode: 200, message: "User deleted successfully" });
  } catch (error) {
    console.log("Error deleting user: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
});

module.exports = { router };

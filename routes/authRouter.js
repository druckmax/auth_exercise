import express from "express";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";

const router = express.Router();

const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Please provide correct email and password");

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password))) {
      const error = new Error("Incorrect credentials!");
      error.status = 401;
      throw error;
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

router.route("/signup").post(signup);
router.route("/signin").post(signin);

export default router;

import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register an User
export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    await User.create(req.body);
    res.status(201).json({ status: "User Registered" });
  } catch (error) {
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ Error: "Invalid Username" });
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    return res.json({ username, Status: "Logged in", token });
  } catch (error) {
    next(error);
  }
};

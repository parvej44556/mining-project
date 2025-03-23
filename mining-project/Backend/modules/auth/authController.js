const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("./auth.schema.js");

const users = async (req, res) => {
  try {
    const result = await userModel.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };
    const result = await userModel.create(user);
    res.status(201).json({ result, message: "✅ সাইন আপ সফল হয়েছে!" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error, error: "❌ সাইন আপ ব্যর্থ হয়েছে!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "❌ ভুল ইমেইল বা পাসওয়ার্ড!" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "❌ লগইন ব্যর্থ হয়েছে!" });
  }
};

module.exports = { users, signup, login };

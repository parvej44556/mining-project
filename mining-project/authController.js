const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "✅ সাইন আপ সফল হয়েছে!" });
  } catch (error) {
    res.status(500).json({ error: "❌ সাইন আপ ব্যর্থ হয়েছে!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "❌ ভুল ইমেইল বা পাসওয়ার্ড!" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "❌ লগইন ব্যর্থ হয়েছে!" });
  }
};

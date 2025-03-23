const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // .env ফাইল লোড করুন
const router = express.Router();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// 🔹 ইউজার রেজিস্ট্রেশন API
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🔹 ইনপুট যাচাই
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 🔹 ইমেইল ডুপ্লিকেট চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // 🔹 পাসওয়ার্ড হ্যাশ করুন
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 নতুন ইউজার তৈরি করুন
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// 🔹 ইউজার লগইন API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 ইনপুট যাচাই
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // 🔹 ইউজার খুঁজুন
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // 🔹 পাসওয়ার্ড যাচাই করুন
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // 🔹 JWT টোকেন তৈরি করুন
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: 'Login successful', token });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;

const express = require('express');
const { verifyToken, verifyAdmin } = require('./jwt');
const router = express.Router();

// এডমিন রাউট যেটি JWT টোকেন ভ্যালিডেশন এবং এডমিন চেক করবে
router.get('/admin-dashboard', verifyToken, verifyAdmin, (req, res) => {
  try {
    // সফলভাবে এডমিন প্যানেলে প্রবেশের জন্য সুইট মেসেজ
    return res.status(200).json({ message: 'Welcome to the Admin Dashboard', user: req.user });
  } catch (err) {
    console.error('Error accessing the admin dashboard:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;


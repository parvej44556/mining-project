const express = require('express');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// 🔹 এডমিন ড্যাশবোর্ড API (JWT টোকেন ও এডমিন অথরাইজেশন চেক সহ)
router.get('/admin-dashboard', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Welcome to the Admin Dashboard',
      admin: req.user, // লগইনকৃত এডমিনের তথ্য পাঠানো হচ্ছে
    });
  } catch (error) {
    console.error('❌ Admin Dashboard Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;



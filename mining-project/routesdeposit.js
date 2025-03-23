const express = require('express');
const User = require('../models/User');
const router = express.Router();

// 🔹 ডিপোজিট API
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // 🔹 Validate Input
    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid input data' });
    }

    // 🔹 MongoDB Transaction শুরু
    const session = await User.startSession();
    session.startTransaction();

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 🔹 ব্যালেন্স আপডেট করুন
    user.balance += amount;
    user.depositDate = new Date();

    await user.save({ session });

    // 🔹 Transaction Commit
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ success: true, message: 'Deposit successful', balance: user.balance });

  } catch (error) {
    console.error('❌ Deposit Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;

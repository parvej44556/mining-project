const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Coin = require("../models/Coin");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user coin");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "❌ ট্রান্সেকশন ডাটা আনতে সমস্যা হচ্ছে!" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { userId, coinId, amount, price, type } = req.body;

    // ইউজার ও কয়েন খুঁজুন
    const user = await User.findById(userId);
    const coin = await Coin.findById(coinId);

    if (!user || !coin) {
      return res.status(404).json({ error: "❌ ইউজার বা কয়েন পাওয়া যায়নি!" });
    }

    // ট্রান্সেকশন তৈরি করুন
    const transaction = new Transaction({
      user: userId,
      coin: coinId,
      amount,
      price,
      type,
      status: "completed"
    });

    await transaction.save();

    // ইউজারের ব্যালেন্স আপডেট
    if (type === "buy") {
      user.balance -= amount * price;
    } else if (type === "sell") {
      user.balance += amount * price;
    }
    
    await user.save();

    res.status(201).json({ message: "✅ ট্রান্সেকশন সফল হয়েছে!", transaction });
  } catch (error) {
    res.status(500).json({ error: "❌ ট্রান্সেকশন তৈরি করতে সমস্যা হচ্ছে!" });
  }
};

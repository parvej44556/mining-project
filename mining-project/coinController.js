const Coin = require("../models/Coin");

exports.getCoins = async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: "❌ কয়েন ডাটা আনতে সমস্যা হচ্ছে!" });
  }
};

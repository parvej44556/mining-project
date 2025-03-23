const Coin = require("../models/Coin");

exports.getCoins = async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: "❌ কয়েন ডাটা আনতে সমস্যা হচ্ছে!" });
  }
};

exports.addCoin = async (req, res) => {
  try {
    const { name, symbol, price, marketCap, volume, supply } = req.body;
    const coin = new Coin({ name, symbol, price, marketCap, volume, supply });
    await coin.save();
    res.status(201).json({ message: "✅ নতুন কয়েন যোগ করা হয়েছে!" });
  } catch (error) {
    res.status(500).json({ error: "❌ কয়েন যোগ করতে সমস্যা হচ্ছে!" });
  }
};

exports.updateCoin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCoin = await Coin.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedCoin);
  } catch (error) {
    res.status(500).json({ error: "❌ কয়েন আপডেট করতে সমস্যা হচ্ছে!" });
  }
};

exports.deleteCoin = async (req, res) => {
  try {
    await Coin.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ কয়েন মুছে ফেলা হয়েছে!" });
  } catch (error) {
    res.status(500).json({ error: "❌ কয়েন ডিলিট করতে সমস্যা হচ্ছে!" });
  }
};

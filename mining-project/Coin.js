const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coin", CoinSchema);

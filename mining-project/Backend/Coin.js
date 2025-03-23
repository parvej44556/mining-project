const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  volume: { type: Number, required: true },
  supply: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Coin", CoinSchema);

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coin: { type: mongoose.Schema.Types.ObjectId, ref: "Coin", required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["buy", "sell", "deposit", "withdraw"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);

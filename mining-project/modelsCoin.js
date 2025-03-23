const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true, 
      unique: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true } // অটোমেটিক createdAt এবং updatedAt যোগ করবে
);

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;


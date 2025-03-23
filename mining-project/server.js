const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// 🔹 .env ফাইল থেকে কনফিগার লোড করুন
dotenv.config();

// 🔹 Express অ্যাপ তৈরি করুন
const app = express();

// 🔹 Middleware
app.use(cors());                  // CORS Enable (Cross-Origin Resource Sharing)
app.use(express.json());          // JSON Data পার্সিং
app.use(morgan('dev'));           // API Request Logger

// 🔹 Routes ইমপোর্ট করুন
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/adminRoute');
const depositRoute = require('./routes/depositRoute'); // ✅ Deposit Route যুক্ত করা হয়েছে

// 🔹 Routes ব্যবহার করুন
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/deposit', depositRoute); // ✅ নতুন Route যুক্ত করা হয়েছে

// 🔹 MongoDB কানেকশন ফাংশন
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // যদি কানেকশন ফেইল হয়, সার্ভার বন্ধ করুন
    }
};
connectDB();

// 🔹 Central Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 🔹 সার্ভার চালু করুন
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

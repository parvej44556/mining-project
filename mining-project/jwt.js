const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// ✅ **JWT টোকেন জেনারেট করার ফাংশন** (সিকিউর ও ডায়নামিক)
const generateToken = (user, expiresIn = '1h') => {
  try {
    return jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET,            // Secret key (stored in .env)
      { expiresIn }                      // Expiry time (ডিফল্ট: ১ ঘণ্টা)
    );
  } catch (error) {
    console.error("❌ Token Generation Error:", error);
    return null;
  }
};

// ✅ **JWT টোকেন ভ্যালিডেট করার Middleware**
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No Token Provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Forbidden: Invalid Token' });
      }
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error("❌ Token Verification Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ **JWT টোকেন ভ্যালিডেট করে এডমিন চেক করার Middleware**
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
  next();
};

module.exports = { generateToken, verifyToken, verifyAdmin };

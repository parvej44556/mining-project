const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/coins", require("./coinRoutes"));
app.use("/api/transactions", require("./transactionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 সার্ভার চলছে: http://localhost:${PORT}`));

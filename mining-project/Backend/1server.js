const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// URI
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_KEY}@cluster0.w6okp.mongodb.net/pppp?retryWrites=true&w=majority&appName=Cluster0`;

// CONNECTING TO MONGODB
connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    // START THE SERVER ONLY AFTER A SUCCESSFUL CONNECTION
    app.listen(PORT, () => {
      console.log(`Mining is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", require("./modules/auth/authRoutes"));
// app.use("/api/coins", require("../coinRoutes"));

const express = require("express");
const { getCoins } = require("../controllers/coinController");

const router = express.Router();

router.get("/coins", getCoins);

module.exports = router;

const express = require("express");
const { getCoins, addCoin, updateCoin, deleteCoin } = require("../controllers/coinController");

const router = express.Router();

router.get("/", getCoins);
router.post("/", addCoin);
router.put("/:id", updateCoin);
router.delete("/:id", deleteCoin);

module.exports = router;

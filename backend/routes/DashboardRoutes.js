const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, require("../controllers/DashboardController"));

module.exports = router;
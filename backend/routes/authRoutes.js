const express = require("express");
const upload = require("../middleware/UploadMiddleware");
const uploadImage = require("../controllers/uploadImage");
const { protect } = require("../middleware/authMiddleware");
const { registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;
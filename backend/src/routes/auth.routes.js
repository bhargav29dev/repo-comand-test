const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  changePassword,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/me", authenticateToken, getMe);
router.post("/change-password", authenticateToken, changePassword);

module.exports = router;

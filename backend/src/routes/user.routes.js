const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
  deleteCurrentUser,
} = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const {
  requireAdmin,
  requireSelfOrAdmin,
} = require("../middleware/authorize.middleware");

const router = express.Router();

router.use(authenticateToken);

// Self-service (any authenticated user)
router.patch("/me", updateCurrentUser);
router.delete("/me", deleteCurrentUser);

// Admin-only: list & create
router.get("/", requireAdmin, getAllUsers);
router.post("/", requireAdmin, createUser);

// Self or admin
router.get("/:id", requireSelfOrAdmin, getUserById);
router.put("/:id", requireSelfOrAdmin, updateUser);
router.delete("/:id", requireSelfOrAdmin, deleteUser);

module.exports = router;

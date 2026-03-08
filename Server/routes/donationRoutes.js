const express = require("express");
const {
  createDonation,
  getMyDonations,
  getAllDonations
} = require("../controllers/donationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// User donate
router.post("/", protect, createDonation);

// User view own donations
router.get("/my", protect, getMyDonations);

// Admin view all
router.get(
  "/admin/all",
  protect,
  authorizeRoles("ADMIN"),
  getAllDonations
);

module.exports = router;
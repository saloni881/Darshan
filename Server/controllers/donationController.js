const Donation = require("../models/Donation");

// Create Donation
exports.createDonation = async (req, res, next) => {
  try {
    const { templeId, amount, message } = req.body;

    const donation = await Donation.create({
      userId: req.user._id,
      templeId,
      amount,
      message
    });

    res.status(201).json(donation);

  } catch (error) {
    next(error);
  }
};

// Get My Donations
exports.getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate("templeId");

    res.json(donations);

  } catch (error) {
    next(error);
  }
};

// Admin: Get All Donations
exports.getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find()
      .populate("userId", "name email")
      .populate("templeId");

    res.json(donations);

  } catch (error) {
    next(error);
  }
};
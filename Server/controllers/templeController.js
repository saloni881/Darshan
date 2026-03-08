const Temple = require('../models/Temple');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

const getAllTemples = async (req, res) => {
  const temples = await Temple.find().populate('organizer', 'username email');
  res.json(temples);
};

const getTempleById = async (req, res) => {
  const temple = await Temple.findById(req.params.id).populate('organizer', 'username email');
  if (!temple) return res.status(404).json({ message: 'Temple not found' });
  const slots = await Slot.find({ temple: temple._id });
  res.json({ temple, slots });
};

const getMyTemple = async (req, res) => {
  const temple = await Temple.findOne({ organizer: req.user._id });
  if (!temple) return res.status(404).json({ message: 'No temple found' });
  const slots = await Slot.find({ temple: temple._id });
  res.json({ temple, slots });
};

const createTemple = async (req, res) => {
  const { name, location, description, image } = req.body;
  const existing = await Temple.findOne({ organizer: req.user._id });
  if (existing) return res.status(400).json({ message: 'You already have a temple' });
  const temple = await Temple.create({ name, location, description, image, organizer: req.user._id });
  res.status(201).json(temple);
};

const updateTemple = async (req, res) => {
  const temple = await Temple.findById(req.params.id);
  if (!temple) return res.status(404).json({ message: 'Temple not found' });
  if (temple.organizer.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  const { name, location, description, image } = req.body;
  temple.name        = name        || temple.name;
  temple.location    = location    || temple.location;
  temple.description = description || temple.description;
  temple.image       = image       || temple.image;
  await temple.save();
  res.json(temple);
};

const deleteTemple = async (req, res) => {
  await Temple.findByIdAndDelete(req.params.id);
  await Slot.deleteMany({ temple: req.params.id });
  await Booking.deleteMany({ temple: req.params.id });
  res.json({ message: 'Temple deleted' });
};

module.exports = { getAllTemples, getTempleById, getMyTemple, createTemple, updateTemple, deleteTemple };
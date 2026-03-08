const Slot = require('../models/Slot');
const Temple = require('../models/Temple');

const getSlotsByTemple = async (req, res) => {
  const slots = await Slot.find({ temple: req.params.templeId });
  res.json(slots);
};

const getMySlots = async (req, res) => {
  const temple = await Temple.findOne({ organizer: req.user._id });
  if (!temple) return res.status(404).json({ message: 'No temple found' });
  const slots = await Slot.find({ temple: temple._id });
  res.json(slots);
};

const createSlot = async (req, res) => {
  const temple = await Temple.findOne({ organizer: req.user._id });
  if (!temple) return res.status(404).json({ message: 'Create a temple first' });
  const { name, open, close, normalDarshan, vipDarshan, description } = req.body;
  const slot = await Slot.create({ temple: temple._id, name, open, close, normalDarshan, vipDarshan, description });
  res.status(201).json(slot);
};

const updateSlot = async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate('temple');
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  if (slot.temple.organizer.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  Object.assign(slot, req.body);
  await slot.save();
  res.json(slot);
};

const deleteSlot = async (req, res) => {
  const slot = await Slot.findById(req.params.id).populate('temple');
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  if (slot.temple.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  await slot.deleteOne();
  res.json({ message: 'Slot deleted' });
};

module.exports = { getSlotsByTemple, getMySlots, createSlot, updateSlot, deleteSlot };
const User = require('../models/User');
const Temple = require('../models/Temple');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

const getDashboard = async (req, res) => {
  const [users, organizers, temples, darshans, bookings] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    User.countDocuments({ role: 'organizer' }),
    Temple.countDocuments(),
    Slot.countDocuments(),
    Booking.countDocuments(),
  ]);
  res.json({ users, organizers, temples, darshans, bookings });
};

const getUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
  res.json(users);
};

const getOrganizers = async (req, res) => {
  const organizers = await User.find({ role: 'organizer' }).select('-password').sort({ createdAt: -1 });
  res.json(organizers);
};

const getTemples = async (req, res) => {
  const temples = await Temple.find().populate('organizer', 'username email').sort({ createdAt: -1 });
  res.json(temples);
};

const getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'username email')
    .populate('temple', 'name')
    .populate('slot', 'name')
    .sort({ createdAt: -1 });
  res.json(bookings);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
};

module.exports = { getDashboard, getUsers, getOrganizers, getTemples, getBookings, deleteUser };
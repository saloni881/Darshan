const Booking = require('../models/Booking');
const Temple = require('../models/Temple');

const createBooking = async (req, res) => {
  const { templeId, slotId, bookingDate, darshnaName, noOfSlots, type } = req.body;
  const booking = await Booking.create({
    user: req.user._id, temple: templeId, slot: slotId,
    bookingDate, darshnaName, noOfSlots, type: type || 'Normal',
  });
  await booking.populate(['temple', 'slot']);
  res.status(201).json(booking);
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('temple', 'name location image')
    .populate('slot', 'name open close')
    .sort({ createdAt: -1 });
  res.json(bookings);
};

const getOrganizerBookings = async (req, res) => {
  const temple = await Temple.findOne({ organizer: req.user._id });
  if (!temple) return res.status(404).json({ message: 'No temple found' });
  const bookings = await Booking.find({ temple: temple._id })
    .populate('user', 'username email')
    .populate('slot', 'name open close')
    .sort({ createdAt: -1 });
  res.json(bookings);
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  booking.status = 'Cancelled';
  await booking.save();
  res.json({ message: 'Booking cancelled' });
};

module.exports = { createBooking, getMyBookings, getOrganizerBookings, cancelBooking };
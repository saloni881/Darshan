const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  temple:        { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  slot:          { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  bookingDate:   { type: Date, required: true },
  darshnaName:   { type: String, required: true },
  noOfSlots:     { type: Number, required: true, min: 1 },
  type:          { type: String, enum: ['Normal', 'VIP'], default: 'Normal' },
  status:        { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  temple:          { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  name:            { type: String, required: true },
  open:            { type: String, required: true },
  close:           { type: String, required: true },
  normalDarshan:   { type: Number, required: true },
  vipDarshan:      { type: Number, required: true },
  description:     { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
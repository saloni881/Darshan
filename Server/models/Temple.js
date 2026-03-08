const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  location:    { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String, default: '' },
  organizer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getOrganizerBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/',         protect, authorizeRoles('user'), createBooking);
router.get('/my',        protect, authorizeRoles('user'), getMyBookings);
router.get('/organizer', protect, authorizeRoles('organizer'), getOrganizerBookings);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
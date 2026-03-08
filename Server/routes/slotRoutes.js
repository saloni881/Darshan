const express = require('express');
const router = express.Router();
const {
  getSlotsByTemple,
  getMySlots,
  createSlot,
  updateSlot,
  deleteSlot,
} = require('../controllers/slotController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/my',               protect, authorizeRoles('organizer'), getMySlots);
router.get('/temple/:templeId', getSlotsByTemple);
router.post('/',                protect, authorizeRoles('organizer'), createSlot);
router.put('/:id',              protect, authorizeRoles('organizer'), updateSlot);
router.delete('/:id',           protect, authorizeRoles('organizer', 'admin'), deleteSlot);

module.exports = router;
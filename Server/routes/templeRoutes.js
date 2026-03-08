const express = require('express');
const router = express.Router();
const {
  getAllTemples,
  getTempleById,
  getMyTemple,
  createTemple,
  updateTemple,
  deleteTemple,
} = require('../controllers/templeController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get('/',    getAllTemples);
router.get('/my',  protect, authorizeRoles('organizer'), getMyTemple);
router.get('/:id', getTempleById);
router.post('/',   protect, authorizeRoles('organizer'), createTemple);
router.put('/:id', protect, authorizeRoles('organizer'), updateTemple);
router.delete('/:id', protect, authorizeRoles('admin'), deleteTemple);

module.exports = router;
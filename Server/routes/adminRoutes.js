const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getUsers,
  getOrganizers,
  getTemples,
  getBookings,
  deleteUser,
} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.use(protect, authorizeRoles('admin'));

router.get('/dashboard',    getDashboard);
router.get('/users',        getUsers);
router.get('/organizers',   getOrganizers);
router.get('/temples',      getTemples);
router.get('/bookings',     getBookings);
router.delete('/users/:id', deleteUser);

module.exports = router;
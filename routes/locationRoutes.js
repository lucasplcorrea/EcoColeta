const express = require('express');
const { getLocations, getLocation, createLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLocations);
router.get('/:location_id', authMiddleware, getLocation);
router.post('/', authMiddleware, createLocation);
router.put('/:location_id', authMiddleware, updateLocation);
router.delete('/:location_id', authMiddleware, deleteLocation);

module.exports = router;

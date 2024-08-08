
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations about locations
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Retrieve all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The location ID
 *                   name:
 *                     type: string
 *                     description: The location name
 *                   description:
 *                     type: string
 *                     description: The location description
 *                   street:
 *                     type: string
 *                     description: The street name
 *                   number:
 *                     type: string
 *                     description: The house/building number
 *                   complement:
 *                     type: string
 *                     description: Additional address details
 *                   district:
 *                     type: string
 *                     description: The district or neighborhood
 *                   city:
 *                     type: string
 *                     description: The city name
 *                   state:
 *                     type: string
 *                     description: The state code (e.g., SP)
 *                   zip:
 *                     type: string
 *                     description: The ZIP code
 *                   latitude:
 *                     type: number
 *                     format: double
 *                     description: The latitude
 *                   longitude:
 *                     type: number
 *                     format: double
 *                     description: The longitude
 *                   linkMaps:
 *                     type: string
 *                     description: The Google Maps link
 */

/**
 * @swagger
 * /locations/{location_id}:
 *   get:
 *     summary: Retrieve a specific location by ID
 *     tags: [Locations]
 *     parameters:
 *       - name: location_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 street:
 *                   type: string
 *                 number:
 *                   type: string
 *                 complement:
 *                   type: string
 *                 district:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 zip:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                   format: double
 *                 longitude:
 *                   type: number
 *                   format: double
 *                 linkMaps:
 *                   type: string
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               number:
 *                 type: string
 *               complement:
 *                 type: string
 *               zip:
 *                 type: string
 *     responses:
 *       201:
 *         description: Location created
 */

/**
 * @swagger
 * /locations/{location_id}:
 *   put:
 *     summary: Update an existing location
 *     tags: [Locations]
 *     parameters:
 *       - name: location_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               street:
 *                 type: string
 *               number:
 *                 type: string
 *               complement:
 *                 type: string
 *               district:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip:
 *                 type: string
 *               latitude:
 *                 type: number
 *                 format: double
 *               longitude:
 *                 type: number
 *                 format: double
 *     responses:
 *       200:
 *         description: Location updated
 */

/**
 * @swagger
 * /locations/{location_id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     parameters:
 *       - name: location_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Location deleted
 */

const express = require('express');
const { 
  getLocations, 
  getLocation, 
  createLocation, 
  updateLocation, 
  deleteLocation 
} = require('../controllers/locationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLocations);
router.get('/:location_id', authMiddleware, getLocation);
router.post('/', authMiddleware, createLocation);
router.put('/:location_id', authMiddleware, updateLocation);
router.delete('/:location_id', authMiddleware, deleteLocation);

module.exports = router;

const express = require('express');
const { getLocations, getLocation, createLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations about locations
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all locations
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
 *                   locality:
 *                     type: string
 *                     description: The location locality
 *                   coordinates:
 *                     type: string
 *                     description: The location coordinates
 */
router.get('/', authMiddleware, getLocations);

/**
 * @swagger
 * /{location_id}:
 *   get:
 *     summary: Retrieve a specific location by ID
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
 *                 locality:
 *                   type: string
 *                 coordinates:
 *                   type: string
 */
router.get('/:location_id', authMiddleware, getLocation);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
 *               locality:
 *                 type: string
 *               coordinates:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Location created
 */
router.post('/', authMiddleware, createLocation);

/**
 * @swagger
 * /{location_id}:
 *   put:
 *     summary: Update an existing location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
 *               locality:
 *                 type: string
 *               coordinates:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Location updated
 */
router.put('/:location_id', authMiddleware, updateLocation);

/**
 * @swagger
 * /{location_id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
router.delete('/:location_id', authMiddleware, deleteLocation);

module.exports = router;

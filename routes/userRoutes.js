const express = require('express');
const { getUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations about users
 */

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retrieve the current user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user name
 *                 email:
 *                   type: string
 *                   description: The user email
 */
router.get('/me', authMiddleware, getUser);

/**
 * @swagger
 * /me:
 *   delete:
 *     summary: Delete the current user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;

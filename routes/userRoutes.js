/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users (name and email only)
 *     tags: [Users]
 *     
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retrieve the logged-in user's data
 *     tags: [Users]
 *     
 *     responses:
 *       200:
 *         description: The user's data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 gender:
 *                   type: string
 *                   description: The user's gender
 *                 cpf:
 *                   type: string
 *                   description: The user's CPF
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   description: The user's birth date
 *                 address:
 *                   type: string
 *                   description: The user's address
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /me:
 *   put:
 *     summary: Update the logged-in user's data
 *     tags: [Users]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's new password
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *               cpf:
 *                 type: string
 *                 description: The user's CPF
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The user's birth date
 *               address:
 *                 type: string
 *                 description: The user's address
 *     responses:
 *       200:
 *         description: The user's updated data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 gender:
 *                   type: string
 *                   description: The user's gender
 *                 cpf:
 *                   type: string
 *                   description: The user's CPF
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   description: The user's birth date
 *                 address:
 *                   type: string
 *                   description: The user's address
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /me:
 *   delete:
 *     summary: Delete the logged-in user's account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's password for confirmation
 *     responses:
 *       200:
 *         description: User account deleted
 *       401:
 *         description: Unauthorized or incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     description: Exclui um usuário específico pelo ID, exigindo a senha do usuário a ser excluído.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: integer
 *       - in: body
 *         name: password
 *         required: true
 *         description: Senha do usuário a ser excluído
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "senhaSecreta"
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Senha incorreta ou usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Senha incorreta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Incorrect password"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting user"
 */

const express = require('express');
const router = express.Router();
const { getAllUsers, getMe, updateMe, deleteMe, deleteUserById } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, getAllUsers);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateMe);
router.delete('/me', authMiddleware, deleteMe);
router.delete('/users/:id', authMiddleware, deleteUserById);

module.exports = router;

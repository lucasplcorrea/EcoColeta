const express = require('express');
const { getUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, getUser);
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;

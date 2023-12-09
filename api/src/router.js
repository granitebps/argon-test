const express = require('express');
const { login, me } = require('./services/auth_service');
const { verifyToken } = require('./helper/auth');

const router = express.Router();
router.post('/login', login);
router.get('/me', verifyToken, me);

module.exports = router;

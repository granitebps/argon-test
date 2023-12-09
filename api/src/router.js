const express = require('express');
const { login, me } = require('./services/auth_service');
const { verifyToken } = require('./helper/auth');
const validate = require('./helper/validation');
const { loginValidation } = require('./validation/auth');

const router = express.Router();
router.post('/login', validate(loginValidation), login);
router.get('/me', verifyToken, me);

module.exports = router;

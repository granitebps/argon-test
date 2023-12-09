const express = require('express');
const { login } = require('../services/auth_service');

const router = express.Router();

router.post('/', login);

module.exports = router;

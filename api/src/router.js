const express = require('express');

const { login, me, updateProfile } = require('./services/auth_service');
const { upload } = require('./helper/index');
const { verifyToken } = require('./helper/auth');
const validate = require('./helper/validation');
const { loginValidation, updateProfileValidation } = require('./validation/auth');

const router = express.Router();
router.post('/login', validate(loginValidation), login);
router.get('/me', verifyToken, me);

router.put('/profile', verifyToken, upload.single('image'), validate(updateProfileValidation), updateProfile);

module.exports = router;

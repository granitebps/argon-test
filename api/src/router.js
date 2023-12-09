const express = require('express');

const { login, me, updateProfile } = require('./services/auth_service');
const { upload } = require('./helper/index');
const { verifyToken } = require('./helper/auth');
const validate = require('./helper/validation');
const { loginValidation, updateProfileValidation } = require('./validation/auth');
const { listUser, createUser, updateUser } = require('./services/user_service');
const { createUserValidation, updateUserValidation } = require('./validation/user');
const { storeAttendace } = require('./services/attendance_service');
const { attendanceValidation } = require('./validation/attendace');

const router = express.Router();
router.post('/login', validate(loginValidation), login);
router.get('/me', verifyToken, me);

router.put('/profile', verifyToken, upload.single('image'), validate(updateProfileValidation), updateProfile);

router.get('/users', verifyToken, listUser);
router.post('/users', verifyToken, upload.single('image'), validate(createUserValidation), createUser);
router.put('/users/:id', verifyToken, upload.single('image'), validate(updateUserValidation), updateUser);

router.post('/attendances', verifyToken, validate(attendanceValidation), storeAttendace);

module.exports = router;

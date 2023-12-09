const express = require('express');

const { upload } = require('./middleware/index');
const { verifyToken, verifyRole } = require('./middleware/auth');
const validate = require('./middleware/validation');

const { login, me, updateProfile } = require('./services/auth_service');
const { storeAttendace, summaryAttendance, listAttendance } = require('./services/attendance_service');
const { listUser, createUser, updateUser } = require('./services/user_service');

const { loginValidation, updateProfileValidation } = require('./validation/auth');
const { createUserValidation, updateUserValidation } = require('./validation/user');
const { attendanceValidation } = require('./validation/attendace');

const router = express.Router();

router.post('/login', validate(loginValidation), login);
router.get('/me', verifyToken, me);

router.put('/profile', verifyToken, upload.single('image'), validate(updateProfileValidation), updateProfile);

router.get('/users', verifyToken, verifyRole('admin'), listUser);
router.post(
  '/users',
  verifyToken,
  verifyRole('admin'),
  upload.single('image'),
  validate(createUserValidation),
  createUser
);
router.put(
  '/users/:id',
  verifyToken,
  verifyRole('admin'),
  upload.single('image'),
  validate(updateUserValidation),
  updateUser
);

router.get('/attendances/summary', verifyToken, verifyRole('user'), summaryAttendance);
router.get('/attendances', verifyToken, verifyRole('admin'), listAttendance);
router.post('/attendances', verifyToken, verifyRole('user'), validate(attendanceValidation), storeAttendace);

module.exports = router;

const { body } = require('express-validator');

const MAX_FILESIZE = 10485760; //10 mb

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Not a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 8 })
    .withMessage('Password must be min 8 chars'),
  body('fcm_token').optional({ values: 'falsy' }),
];

const updateProfileValidation = [
  body('image').custom(async (value, { req }) => {
    if (req.file) {
      if (!req.file.mimetype.includes('image')) throw new Error('Only support images type.');
      if (req.file.size > MAX_FILESIZE) throw new Error('Maximum filesize is 10MB.');
    }

    return true;
  }),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password')
    .optional({
      values: 'falsy',
    })
    .isLength({ min: 8 })
    .withMessage('Password must be min 8 chars'),
];

module.exports = { loginValidation, updateProfileValidation };

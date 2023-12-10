const { body } = require('express-validator');

const MAX_FILESIZE = 10485760; //10 mb

const createUserValidation = [
  body('image').custom(async (value, { req }) => {
    if (!req.file) throw new Error('Incorrect type of field, select File type.');
    if (!req.file.mimetype.includes('image')) throw new Error('Only support images type.');
    if (req.file.size > MAX_FILESIZE) throw new Error('Maximum filesize is 10MB.');

    return true;
  }),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Not a valid email'),
  body('position').notEmpty().withMessage('Position is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be min 8 chars'),
  ,
];

const updateUserValidation = [
  body('image').custom(async (value, { req }) => {
    if (req.file) {
      if (!req.file.mimetype.includes('image')) throw new Error('Only support images type.');
      if (req.file.size > MAX_FILESIZE) throw new Error('Maximum filesize is 10MB.');
    }

    return true;
  }),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Not a valid email'),
  body('position').notEmpty().withMessage('Position is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').optional({ values: 'falsy' }).isLength({ min: 8 }).withMessage('Password must be min 8 chars'),
  ,
];

module.exports = { createUserValidation, updateUserValidation };

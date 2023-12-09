const { body } = require('express-validator');

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Not a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 8 })
    .withMessage('Password must be min 8 chars'),
];

module.exports = { loginValidation };

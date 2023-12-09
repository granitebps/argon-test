const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const bcrypt = require('bcrypt');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  /**
   * @type {import('sequelize').Model} user
   */
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(400).json({
      success: false,
      message: 'Wrong email or password',
    });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(400).json({
      success: false,
      message: 'Wrong email or password!',
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      position: user.position,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 }
  );

  res.json({
    success: true,
    message: 'Success login',
    data: {
      token,
    },
  });
};

module.exports = { login };

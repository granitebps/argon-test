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
    process.env.JWT_SECRET
    // { expiresIn: 60 }
  );

  res.json({
    success: true,
    message: 'Success',
    data: {
      token,
    },
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const me = async (req, res) => {
  res.json({
    success: true,
    message: 'Success',
    data: {
      id: req.auth.id,
      name: req.auth.name,
      email: req.auth.email,
      image: req.auth.image,
      position: req.auth.position,
      phone: req.auth.phone,
      role: req.auth.role,
    },
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateProfile = async (req, res) => {
  const payload = {
    phone: req.body.phone,
  };
  if (req.body.password) {
    payload.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.file) {
    payload.image = req.file.filename;
  }

  await User.update(payload, {
    where: {
      id: req.auth.id,
    },
  });

  // TODO: Notification

  // TODO: Logging

  res.json({
    success: true,
    message: 'Success',
  });
};

module.exports = { login, me, updateProfile };

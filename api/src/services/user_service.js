const { Op } = require('sequelize');
const { User } = require('../models/index');
const bcrypt = require('bcrypt');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getUser = async (req, res) => {
  const users = await User.findByPk(req.params.id, {
    attributes: ['id', 'name', 'email', 'position', 'phone', 'image'],
  });

  res.json({
    success: true,
    message: 'Success',
    data: users,
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const listUser = async (req, res) => {
  const users = await User.findAll({
    where: {
      role: 'user',
    },
    attributes: ['id', 'name', 'email', 'position', 'phone', 'image'],
  });

  res.json({
    success: true,
    message: 'Success',
    data: users,
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createUser = async (req, res) => {
  const { name, email, position, phone, password } = req.body;

  const exists = await User.findOne({
    where: {
      email,
    },
  });
  if (exists) {
    res.status(422).json({
      success: false,
      message: 'Email already exists',
    });
    return;
  }

  await User.create({
    name,
    email,
    position,
    phone,
    password: await bcrypt.hash(password, 10),
    role: 'user',
    image: req.file.filename,
  });

  res.json({
    success: true,
    message: 'Success',
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, position, phone, password } = req.body;

  const exists = await User.findOne({
    where: {
      email,
      id: {
        [Op.ne]: id,
      },
    },
  });
  if (exists) {
    res.status(422).json({
      success: false,
      message: 'Email already exists',
    });
    return;
  }

  const payload = {
    name,
    email,
    position,
    phone,
  };
  if (password) {
    payload.password = await bcrypt.hash(password, 10);
  }
  if (req.file) {
    payload.image = req.file.filename;
  }
  await User.update(payload, {
    where: {
      id,
    },
  });

  res.json({
    success: true,
    message: 'Success',
  });
};

module.exports = { listUser, createUser, updateUser, getUser };

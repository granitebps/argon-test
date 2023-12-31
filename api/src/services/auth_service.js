const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const amqp = require('amqplib');
const admin = require('../firebase');
const { Op } = require('sequelize');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const login = async (req, res) => {
  const { email, password, fcm_token } = req.body;
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

  // Save fcm token
  user.fcm_token = fcm_token;
  await user.save();

  res.json({
    success: true,
    message: 'Success',
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        position: user.position,
        phone: user.phone,
        role: user.role,
      },
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

  // Notification
  const admins = await User.findAll({
    where: {
      role: 'admin',
      fcm_token: {
        [Op.not]: null,
      },
    },
  });
  const registrationTokens = admins.map((a) => a.fcm_token);
  const message = {
    data: {
      message: `User with email ${req.auth.email} has changed their profile`,
    },
    notification: {
      title: `User with email ${req.auth.email} has changed their profile`,
    },
    tokens: registrationTokens,
  };
  admin
    .messaging()
    .sendEachForMulticast(message)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
      }
    });

  // Logging
  const updatedUser = await User.findByPk(req.auth.id);
  try {
    const message = {
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        position: updatedUser.position,
        phone: updatedUser.phone,
      },
    };
    const { RABBIT_MQ_USERNAME, RABBIT_MQ_PASSWORD, RABBIT_MQ_HOST } = process.env;
    const connection = await amqp.connect(`amqp://${RABBIT_MQ_USERNAME}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}`);
    const channel = await connection.createChannel();
    await channel.assertQueue('logging', { durable: false });
    channel.sendToQueue('logging', Buffer.from(JSON.stringify(message)));
    console.log(' [x] Sent ', message);
    await channel.close();
  } catch (error) {
    console.log('Failed to send message to logging: ', error);
  }

  res.json({
    success: true,
    message: 'Success',
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      position: updatedUser.position,
      phone: updatedUser.phone,
      role: updatedUser.role,
    },
  });
};

module.exports = { login, me, updateProfile };

const { Op } = require('sequelize');
const { Attendance, User } = require('../models/index');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const todayAttendance = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0);

  const data = await Attendance.findOne({
    where: {
      user_id: req.auth.id,
      date: today,
    },
  });

  res.json({
    success: true,
    message: 'Success',
    data,
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const summaryAttendance = async (req, res) => {
  let start = new Date();
  start.setDate(1);
  let end = new Date();
  end.setHours(0, 0, 0);
  if (req.query.start && req.query.end) {
    start = req.query.start;
    end = req.query.end;
  }

  const data = await Attendance.findAll({
    where: {
      user_id: req.auth.id,
      date: {
        [Op.between]: [start, end],
      },
    },
    order: [['date', 'DESC']],
  });

  res.json({
    success: true,
    message: 'Success',
    data,
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const storeAttendace = async (req, res) => {
  const user = req.auth;
  const { clock_in, clock_out } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0);
  /** @type {import('sequelize').Model} */
  let att = await Attendance.findOne({
    where: {
      user_id: user.id,
      date: today,
    },
  });
  if (!att) {
    att = await Attendance.create({
      user_id: user.id,
      clock_in,
      clock_out,
      date: today,
    });
  } else {
    att.clock_in = clock_in;
    att.clock_out = clock_out;
    att.save();
  }

  res.json({
    success: true,
    message: 'Success',
    data: {
      clock_in: att.clock_in,
      clock_out: att.clock_out,
      date: att.date,
    },
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const listAttendance = async (req, res) => {
  const data = await Attendance.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'position', 'phone'],
      },
    ],
    order: [['date', 'DESC']],
  });

  res.json({
    success: true,
    message: 'Success',
    data,
  });
};

module.exports = { storeAttendace, summaryAttendance, listAttendance, todayAttendance };

const { Attendance } = require('../models/index');

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
    await Attendance.create({
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
  });
};

module.exports = { storeAttendace };

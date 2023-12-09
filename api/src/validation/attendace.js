const { body } = require('express-validator');

const attendanceValidation = [
  body('clock_in')
    .optional({
      values: 'falsy',
    })
    .isTime({ hourFormat: 'hour24', mode: 'withSeconds' }),
  body('clock_out')
    .optional({
      values: 'falsy',
    })
    .isTime({ hourFormat: 'hour24', mode: 'withSeconds' }),
];

module.exports = { attendanceValidation };

const { validationResult } = require('express-validator');

const validate = (validations) => {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const data = errors.array().map((e) => ({
      message: e.msg,
      field: e.path,
    }));
    res.status(422).json({
      success: false,
      message: data[0].message,
      data,
    });
  };
};

module.exports = validate;

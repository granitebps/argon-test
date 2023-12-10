const jwt = require('jsonwebtoken');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const verifyToken = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if (token === null) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        req.auth = null;
      } else {
        req.auth = decoded;
      }
    });

    if (!req.auth) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const verifyRole = (role) => {
  return async (req, res, next) => {
    const user = req.auth;
    if (user.role == role) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
  };
};

module.exports = { verifyToken, verifyRole };

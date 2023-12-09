const jwt = require('jsonwebtoken');

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
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { verifyToken };

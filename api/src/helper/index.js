const multer = require('multer');
const { extname } = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.split('.');
    let savedFileName = `${fileName[0]}-${Date.now()}${extname(file.originalname)}`;
    cb(null, savedFileName);
  },
});
const upload = multer({
  storage,
});

module.exports = { upload };

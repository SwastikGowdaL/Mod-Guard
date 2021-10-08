const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
      return cb(new Error('Please provide a valid image file'));
    }
    cb(undefined, true);
  },
});

module.exports = upload;

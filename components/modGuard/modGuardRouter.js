const express = require('express');
const upload = require('./middleware/multer');
const modGuardController = require('./modGuardController');
const auth = require('./middleware/auth');
const validator = require('./middleware/validation');
const limiter = require('./middleware/rateLimiter');

const router = new express.Router();

//* implementing rate limiter
router.use(limiter);

//* router for receiving "posting" post request
router.post(
  '/modGuard',
  auth,
  upload.single('image_file'),
  validator,
  modGuardController.modGuard,
  (error, req, res, next) => {
    res.status(400).send({
      status: 'error',
      error: error.message,
    });
  }
);

module.exports = router;

const express = require('express');
const upload = require('./middleware/multer');
const modGuardController = require('./modGuardController');
const auth = require('./middleware/auth');
const validator = require('./middleware/validation');
const rateLimiter = require('./middleware/rateLimiter');

const router = new express.Router();

//* router for receiving "moderation" request
router.post(
  '/modGuard',
  rateLimiter,
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

//* router for receiving "moderation" request & opting for publisher/consumer strategy
//* no rate limiter implemented on this route handler
router.post(
  '/modGuard/pubcon',
  auth,
  upload.single('image_file'),
  validator,
  modGuardController.modGuardPubCon,
  (error, req, res, next) => {
    res.status(400).send({
      status: 'error',
      error: error.message,
    });
  }
);

module.exports = router;

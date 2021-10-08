const express = require('express');
const upload = require('./middleware/multer');
const modGuardController = require('./modGuardController');

const router = new express.Router();

//* router for receiving "posting" post request
router.post(
  '/modGuard',
  //   auth,
  upload.single('image_file'),
  modGuardController.modGuard,
  (error, req, res, next) => {
    res.status(400).send({
      status: 'error',
      error: error.message,
    });
  }
);

module.exports = router;

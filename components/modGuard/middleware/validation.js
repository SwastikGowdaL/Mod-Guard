const schema = require('../helpers/schemaValidation');

const validator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    if (req.file && req.body.image_link && req.body.image_moderation) {
      throw new Error(
        "please provide either image_link or image_file, don't provide both"
      );
    }
    if (!req.file && !req.body.image_link && req.body.image_moderation) {
      console.log(req.file);
      throw new Error(
        'please provide either image_link or image_file, for moderation of image'
      );
    }
    if (req.body.image_moderation) {
      const formatedImageModeration = req.body.image_moderation.split(',');
      formatedImageModeration.forEach((val) => {
        switch (val) {
          case 'nudity':
            break;
          case 'wad':
            break;
          case 'gore':
            break;
          case 'offensive':
            break;
          default:
            throw new Error(
              'for image_moderation you can only choose from any of these [nudity,wad,gore,offensive]'
            );
        }
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validator;

const imageModeration = require('./imageModeration');

const modGuard = async (req, res) => {
  try {
    let response = {};
    const moderationData = JSON.parse(JSON.stringify(req.body));
    if (moderationData.strategy === '1') {
      if (Object.hasOwn(moderationData, 'image_moderation')) {
        if (req.file && moderationData.image_moderation === 'nudity') {
          const imageModerationResponse = await imageModeration.nsfwDetection(
            req.file.buffer
          );
          response.isNSFW = imageModerationResponse;
        }
        if (Object.hasOwn(moderationData, 'image_link') && !req.file) {
          console.log('inside imagelink controller');
          response = await imageModeration.extensiveImageModeration(
            moderationData.image_link,
            moderationData.image_moderation
          );
        }
      }
      res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  modGuard,
};

const fs = require('fs');
const download = require('download');
const https = require('https');
const ShortUniqueId = require('short-unique-id');
const sharp = require('sharp');
const imageModeration = require('./imageModeration');
const profanityDetection = require('./profanityDetection');
const maliciousUrlDetection = require('./maliciousUrlDetection');

const uid = new ShortUniqueId({ length: 10 });

const modGuard = async (req, res) => {
  try {
    let response = {};
    const moderationData = JSON.parse(JSON.stringify(req.body));
    //* checking whether the user selected strategy 1
    if (moderationData.strategy === '1') {
      if (Object.hasOwn(moderationData, 'image_moderation')) {
        if (req.file && moderationData.image_moderation === 'nudity') {
          const imageModerationResponse = await imageModeration.nsfwDetection(
            req.file.buffer
          );
          response.isNSFW = imageModerationResponse;
        }
        if (req.file && moderationData.image_moderation !== 'nudity') {
          const filename = `${uid()}.jpg`;
          fs.writeFileSync(filename, req.file.buffer, 'binary');
          response = await imageModeration.extensiveImageModeration2(
            filename,
            moderationData.image_moderation
          );
          fs.unlink(filename, (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`successfully deleted ${filename}`);
          });
        }
        if (
          Object.hasOwn(moderationData, 'image_link') &&
          moderationData.image_moderation !== 'nudity'
        ) {
          response = await imageModeration.extensiveImageModeration(
            moderationData.image_link,
            moderationData.image_moderation
          );
        }

        if (
          Object.hasOwn(moderationData, 'image_link') &&
          moderationData.image_moderation === 'nudity'
        ) {
          const filename = `${uid()}.jpg`;
          fs.writeFileSync(filename, await download(moderationData.image_link));
          const imageModerationResponse = await imageModeration.nsfwDetection(
            `./${filename}`
          );
          response.isNSFW = imageModerationResponse;
          fs.unlink(filename, (err1) => {
            if (err1) {
              console.log(err1);
            }
            console.log(`successfully deleted ${filename}`);
          });
        }
      }
      if (Object.hasOwn(moderationData, 'isProfane')) {
        response.isProfane = await profanityDetection.isProfane(
          moderationData.isProfane
        );
      }
      if (Object.hasOwn(moderationData, 'filter_profanity')) {
        response.filtered_profanity = await profanityDetection.filterProfanity(
          moderationData.filter_profanity
        );
      }
      if (Object.hasOwn(moderationData, 'isMalicious')) {
        response.isMalicious = await maliciousUrlDetection(
          moderationData.isMalicious
        );
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

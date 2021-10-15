const ShortUniqueId = require('short-unique-id');
const fs = require('fs');
const download = require('download');
const imageModeration = require('./imageModeration');
const profanityDetection = require('./profanityDetection');
const maliciousUrlDetection = require('./maliciousUrlDetection');
const spamDetection = require('./spamDetection');

const uid = new ShortUniqueId({ length: 10 });

const modGuardServices = async (moderationData, imageBuffer) => {
  let response = {};

  //* sends the image buffer it received to nsfw detection by nsfwjs module, only if the image_moderation details is nudity
  if (imageBuffer && moderationData.image_moderation === 'nudity') {
    const imageModerationResponse = await imageModeration.nsfwDetection(
      imageBuffer
    );
    response.isNSFW = imageModerationResponse;
  }

  //* checks whether the user provided an image and whether selected other image_moderation details than nudity , if so
  //* then writes that to a jpg file and saves it and then sends that file to sight engine api service
  if (imageBuffer && moderationData.image_moderation !== 'nudity') {
    const filename = `${uid()}.jpg`;
    fs.writeFileSync(filename, imageBuffer, 'binary');
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

  //* checks whether the link of the image was provided & whether selected other image_moderation details than nudity &
  //* sends it to sight engine api service along with the image_moderation details
  if (Object.prototype.hasOwnProperty.call(moderationData, 'image_link')) {
    response = await imageModeration.extensiveImageModeration(
      moderationData.image_link,
      moderationData.image_moderation
    );
  }

  //*  checks whether the image link was provided and whether only the nudity was provided in image_moderation details
  //* if so then downloads the file from that link and then sends it to nsfwjs module for nsfw detection
  // if (
  //   Object.prototype.hasOwnProperty.call(moderationData, 'image_link') &&
  //   moderationData.image_moderation === 'nudity'
  // ) {
  //   const filename = `${uid()}.jpg`;
  //   fs.writeFileSync(filename, await download(moderationData.image_link));
  //   const imageModerationResponse = await imageModeration.nsfwDetection(
  //     `./${filename}`
  //   );
  //   console.log(imageModerationResponse);
  //   response.isNSFW = imageModerationResponse;
  //   fs.unlink(filename, (err1) => {
  //     if (err1) {
  //       console.log(err1);
  //     }
  //     console.log(`successfully deleted ${filename}`);
  //   });
  // }

  //* checking whether the user provided isProfane field
  if (Object.prototype.hasOwnProperty.call(moderationData, 'isProfane')) {
    response.isProfane = await profanityDetection.isProfane(
      moderationData.isProfane
    );
  }

  //* checking whether the user provided text to filter profanity
  if (
    Object.prototype.hasOwnProperty.call(moderationData, 'filter_profanity')
  ) {
    response.filtered_profanity = await profanityDetection.filterProfanity(
      moderationData.filter_profanity
    );
  }

  //* checking whether the user provided malicious link
  if (Object.prototype.hasOwnProperty.call(moderationData, 'isMalicious')) {
    response.isMalicious = await maliciousUrlDetection(
      moderationData.isMalicious
    );
  }

  //* checking whether the user provided content for spamDetection
  if (Object.prototype.hasOwnProperty.call(moderationData, 'isSpam')) {
    response.isSpam = await spamDetection.spamContentDetection(
      moderationData.isSpam
    );
  }

  //* checking whether the user provided content for spamEmailDetection
  if (Object.prototype.hasOwnProperty.call(moderationData, 'isSpamEmail')) {
    response.isSpamEmail = await spamDetection.spamEmailDetection(
      moderationData.isSpamEmail
    );
  }

  return response;
};

module.exports = modGuardServices;

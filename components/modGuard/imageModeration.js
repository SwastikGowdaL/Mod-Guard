const nsfw = require('nsfwjs');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const helpers = require('./helpers');

require('dotenv').config();

//* this variable is used to load the models needed for imageModeration
let _model;

// eslint-disable-next-line camelcase
const load_model = async () => {
  _model = await nsfw.load();
};

const nsfwDetection = async (imageBuffer) => {
  try {
    const convertedImage = await helpers.convert(imageBuffer);
    const predictions = await _model.classify(convertedImage);
    convertedImage.dispose();
    const isNSFW = await helpers.serenityCalculation(predictions);
    if (isNSFW === 'unsafe') {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

const extensiveImageModeration = async (imageLink, imageModerationModels) => {
  try {
    const imageModDetails = await axios.get(
      'https://api.sightengine.com/1.0/check.json',
      {
        params: {
          url: imageLink,
          models: imageModerationModels,
          api_user: process.env.SIGHT_ENGINE_API_USER,
          api_secret: process.env.SIGHT_ENGINE_API_SECRET,
        },
      }
    );
    return await helpers.imageModerationConversion(
      imageModDetails.data,
      imageModerationModels
    );
  } catch (err) {
    console.log(err);
  }
};

const extensiveImageModeration2 = async (imageName, imageModerationModels) => {
  const data = new FormData();
  data.append('media', fs.createReadStream(`./${imageName}`));
  data.append('models', imageModerationModels);
  data.append('api_user', process.env.SIGHT_ENGINE_API_USER);
  data.append('api_secret', process.env.SIGHT_ENGINE_API_SECRET);

  const res = await axios({
    method: 'post',
    url: 'https://api.sightengine.com/1.0/check.json',
    data,
    headers: data.getHeaders(),
  });
  return helpers.imageModerationConversion(res.data, imageModerationModels);
};

const imageModeration = {
  load_model,
  nsfwDetection,
  extensiveImageModeration,
  extensiveImageModeration2,
};

module.exports = imageModeration;

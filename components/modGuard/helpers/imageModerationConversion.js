const nsfwProbability = require('./nsfwProbability');
const weaponProbability = require('./weaponProbability');
const drugsProbability = require('./drugsProbability');
const alcoholProbability = require('./alcoholProbability');
const goreProbability = require('./goreProbability');
const offensiveProbability = require('./offensiveProbability');

const imageModerationConversion = async (
  imageModDetails,
  imageModerationModels
) => {
  const response = {};
  const splitImageModerationModels = imageModerationModels.split(',');
  splitImageModerationModels.forEach((model) => {
    switch (model) {
      case 'nudity':
        response.isNSFW = nsfwProbability(imageModDetails.nudity);
        break;
      case 'wad':
        response.hasWeapon = weaponProbability(imageModDetails.weapon);
        response.hasDrugs = drugsProbability(imageModDetails.drugs);
        response.hasAlcohol = alcoholProbability(imageModDetails.alcohol);
        break;
      case 'offensive':
        response.isOffensive = offensiveProbability(
          imageModDetails.offensive.prob
        );
        break;
      case 'gore':
        response.isGore = goreProbability(imageModDetails.gore.prob);
        break;
      default:
        break;
    }
  });
  return response;
};

module.exports = imageModerationConversion;

const predictionEvaluator = require('./predictionEvaluator');

//* calculates and returns whether the imageSerenity is safe or unsafe, by checking the first two arg of predictions
const serenityCalculation = async (predictions) => {
  if (
    predictionEvaluator(predictions[0]) === 'unsafe' ||
    predictionEvaluator(predictions[1]) === 'unsafe'
  ) {
    return 'unsafe';
  }
  return 'safe';
};

module.exports = serenityCalculation;

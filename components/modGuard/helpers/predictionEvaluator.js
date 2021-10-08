//* evaluates whether the predictions are safe or unsafe based on the probability and serenityLevel
const predictionEvaluator = (prediction) => {
  const serenityLevel = 30;
  if (
    prediction.className === 'Hentai' ||
    prediction.className === 'Porn' ||
    prediction.className === 'Sexy'
  ) {
    const convertedProbability = prediction.probability * 100;
    if (convertedProbability > serenityLevel) {
      return 'unsafe';
    }
  }
  return 'safe';
};

module.exports = predictionEvaluator;

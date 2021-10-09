const goreProbability = (probability) => {
  const convertedProbability = probability * 100;
  if (convertedProbability > 20) {
    return true;
  }
  return false;
};

module.exports = goreProbability;

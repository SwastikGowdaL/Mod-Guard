const nsfwProbability = (nsfwImageDetails) => {
  const raw = nsfwImageDetails.raw * 100;
  const safe = nsfwImageDetails.safe * 100;
  if (raw > 20 && safe < 80) {
    return true;
  }
  return false;
};

module.exports = nsfwProbability;

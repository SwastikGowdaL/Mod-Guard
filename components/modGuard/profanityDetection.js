const Filter = require('bad-words');

const filter = new Filter();

const isProfane = async (text) => {
  if (filter.isProfane(text)) {
    return true;
  }
  return false;
};

const filterProfanity = async (text) => filter.clean(text);

module.exports = {
  isProfane,
  filterProfanity,
};

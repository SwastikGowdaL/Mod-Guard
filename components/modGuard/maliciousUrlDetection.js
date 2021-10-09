const axios = require('axios');
const helpers = require('./helpers');

require('dotenv').config();

const maliciousUrlDetection = async (link) => {
  try {
    let formatedLink;
    const URL = 'https://ipqualityscore.com/api/json/url/';
    if (link.startsWith('https://') || link.startsWith('http://')) {
      formatedLink = helpers.formatLink(link);
    } else {
      formatedLink = link;
    }
    const response = await axios.get(
      `${URL}${process.env.MALICIOUS_URL_SCANNER_KEY}/${formatedLink}`
    );
    return response.data.unsafe;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = maliciousUrlDetection;

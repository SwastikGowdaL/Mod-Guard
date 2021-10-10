const AkismetClient = require('akismet-api');
const axios = require('axios');

require('dotenv').config();

const key = process.env.AKISMET_KEY;
const blog = process.env.BLOG;
const client = new AkismetClient.Client({ key, blog });

const validateAkismetCredentials = async () => {
  try {
    const isValid = await client.verifyKey();

    if (!isValid) {
      console.log('Invalid key!');
    }
  } catch (err) {
    console.error('Could not reach Akismet:', err.message);
  }
};

const spamContentDetection = async (content) => {
  try {
    const isSpam = await client.checkSpam(content);
    if (isSpam) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('Something went wrong:', err.message);
  }
};

const spamEmailDetection = async (email) => {
  const emailData = await axios.get(
    `https://ipqualityscore.com/api/json/email/${process.env.MALICIOUS_URL_SCANNER_KEY}/${email}`
  );
  if (emailData.data.valid) {
    return false;
  }
  return true;
};

validateAkismetCredentials();

module.exports = {
  spamContentDetection,
  spamEmailDetection,
};

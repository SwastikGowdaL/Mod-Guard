const Joi = require('joi');

const schema = Joi.object({
  strategy: Joi.number().valid(1, 2).required(),
  isProfane: Joi.string(),
  filter_profanity: Joi.string(),
  image_moderation: Joi.string(),
  image_link: Joi.string().uri(),
  isMalicious: Joi.string().uri(),
  isSpam: {
    ip: Joi.string().ip({
      version: ['ipv4', 'ipv6'],
    }),
    useragent: Joi.string(),
    content: Joi.string(),
    email: Joi.string().email(),
    name: Joi.string(),
  },
  isSpamEmail: Joi.string().email(),
});

module.exports = schema;

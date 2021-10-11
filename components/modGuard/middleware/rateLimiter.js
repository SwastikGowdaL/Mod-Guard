const slowDown = require('express-slow-down');

const limiter = slowDown({
  windowMs: 1 * 60 * 500, // 1 minute
  delayAfter: 3, // allow 2 requests per 1 minute, then...
  delayMs: 1000, // begin adding 10 sec of delay per request above 2:
  maxDelayMs: 2000,
});

module.exports = limiter;

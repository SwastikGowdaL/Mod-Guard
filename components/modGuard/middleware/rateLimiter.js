const slowDown = require('express-slow-down');

const limiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minute
  delayAfter: 10, // allow 10 requests per 1 minute, then...
  delayMs: 500, // begin adding 500 ms of delay per request above 10:
  maxDelayMs: 1000,
});

module.exports = limiter;

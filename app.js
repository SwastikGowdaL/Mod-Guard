const express = require('express');
const modGuard = require('./components/modGuard');

const moderationConsumer = require('./components/modGuard/consumers/modGuardConsumer1');

const app = express();
app.use(express.json());

app.use(modGuard);

moderationConsumer.startConsumer();

module.exports = app;

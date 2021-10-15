const express = require('express');
const modGuard = require('./components/modGuard');

const moderationConsumer1 = require('./components/modGuard/consumers/modGuardConsumer1');
const moderationConsumer2 = require('./components/modGuard/consumers/modGuardConsumer2');

const app = express();
app.use(express.json());

app.use(modGuard);

moderationConsumer1.startConsumer();
moderationConsumer2.startConsumer();

module.exports = app;

const express = require('express');
const modGuard = require('./components/modGuard');

const app = express();
app.use(express.json());

app.use(modGuard);

module.exports = app;

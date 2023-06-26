const express = require('express');
const pilot = express.Router();
const { admin } = require('../../../controller');

pilot.post('/motorista', async (req, res) => {
  await admin.pilot.create(req);
  res.redirect('../admin');
});

module.exports = pilot;
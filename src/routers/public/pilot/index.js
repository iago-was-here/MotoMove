const express = require('express');
const pilot = express.Router();
const { admin } = require('../../../controller');

pilot.post('/motorista', async (req, res) => {
  const data = await admin.pilot.create(req);
  console.log(data);
  res.redirect('../admin');
});

module.exports = pilot;
const express = require('express');
const client = express.Router();
const { admin } = require('../../../controller');

client.post('/cliente', async (req, res) => {
  const data = await admin.client.create(req);
  console.log(data);
  res.redirect('../admin');
});

module.exports = client;
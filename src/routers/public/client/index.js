const express = require('express');
const client = express.Router();
const { admin } = require('../../../controller');

client.post('/cliente', async (req, res) => {
  await admin.client.create(req);
  res.redirect('/clientes');
});

module.exports = client;
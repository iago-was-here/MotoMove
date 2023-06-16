const express = require('express');
const admin = express.Router();
const client = require('./Client');
const pilot = require('./Pilot');
const race = require('./race');

admin.get('/admin', (req, res) => {
  res.render('dashboard-admin', {
    title: 'MOTO MOVE | Administrador'
  });
});

admin.use('/clientes', client);
admin.use('/motoristas', pilot);
admin.use('/corridas', race);

module.exports = admin;
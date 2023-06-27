const express = require('express');
const admin = express.Router();
const client = require('./Client');
const pilot = require('./pilot');
const race = require('./race');
const auth = require('./auth');

admin.get('/admin', (req, res) => {
  res.render('dashboard-admin', {
    title: 'MOTO MOVE | Administrador'
  });
});

admin.use('/clientes', client);
admin.use('/motoristas', pilot);
admin.use('/corridas', race);
admin.use('/auth', auth);

module.exports = admin;
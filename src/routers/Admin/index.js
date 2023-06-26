const express = require('express');
const admin = express.Router();
const client = require('./Client');
const pilot = require('./pilot');
const race = require('./race');
const auth = require('./auth');

admin.use('/auth', auth);

// admin.use('*', (req, res, next) => {
//   if (!req.session.usuario) {
//     res.redirect('/');
//   }
//   next();
// });

admin.get('/admin', (req, res) => {
  res.render('dashboard-admin', {
    title: 'MOTO MOVE | Administrador'
  });
});

admin.use('/clientes', client);
admin.use('/motoristas', pilot);
admin.use('/corridas', race);

module.exports = admin;
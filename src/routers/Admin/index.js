const express = require('express');
const admin = express.Router();
const client = require('./Client');
const pilot = require('./pilot');
const race = require('./race');
const auth = require('./auth');
const authController = require('../../controller/admin/Auth');


admin.get('/admin', authController.authenticate, (req, res) => {
  res.render('dashboard-admin', {
    title: 'MOTO MOVE | Administrador'
  });
});

admin.use('/clientes', authController.authenticate, client);
admin.use('/motoristas', authController.authenticate, pilot);
admin.use('/corridas', authController.authenticate, race);
admin.use('/auth', auth);

module.exports = admin;
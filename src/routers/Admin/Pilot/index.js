const express = require('express');
const pilot = express.Router();
// const database = require('../../../database');

pilot.get('/', (req, res) => {
  res.render('motoristas', {
    title: 'MOTO MOVE | Administrador | Motoristas'
  });
});

module.exports = pilot;
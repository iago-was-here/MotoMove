const express = require('express');
const race = express.Router();

race.get('/', (req, res) => {
  res.render('corridas', {
    title: 'MOTO MOVE | Administrador | Corridas'
  });
});

module.exports = race;
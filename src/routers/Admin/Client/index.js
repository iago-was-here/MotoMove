const express = require('express');
const client = express.Router();
// const database = require('../../../database');

client.get('/', (req, res) => {
  res.render('clientes', {
    title: 'MOTO MOVE | Administrador | Clientes'
  });
});


module.exports = client;
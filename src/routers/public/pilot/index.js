const express = require('express');
const pilot = express.Router();
const { admin } = require('../../../controller');

pilot.post('/motorista', async (req, res) => {
  const data = await admin.pilot.create(req);
  console.log(data);
  res.render('inicio', {
    title: 'MOTO MOVE | Bem-Vindo',
    response: { 
      error: data.error || false,
      message: data.error ? data.message : 'Piloto cadastrado com sucesso!'
    }
  });
});

module.exports = pilot;
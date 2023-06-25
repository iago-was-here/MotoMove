const express = require('express');
const client = express.Router();
const { admin } = require('../../../controller');

client.post('/cliente', async (req, res) => {
  const data = await admin.client.create(req);
  console.log(data);
  res.render('inicio', {
    title: 'MOTO MOVE | Bem-Vindo',
    response: { 
      error: data.error || false,
      message: data.error ? data.message : 'Cliente cadastrado com sucesso!'
    }
  });
});

module.exports = client;
const express = require('express');
const client = express.Router();
const { admin } = require('../../../controller');

client.get('/', async (req, res) => {
  res.render('clientes', {
    title: 'MOTO MOVE | Administrador | Clientes',
    data: await admin.client.getAll()
  });
});

client.get('/editar/:cpf', async (req, res) => {
  console.log(await admin.client.getByCpf(req));
  res.redirect('/clientes');
});

client.get('/excluir/:cpf', async (req, res) => {
  await admin.client.delete(req);
  res.redirect('/clientes');
});


module.exports = client;
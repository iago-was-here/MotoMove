const express = require('express');
const pilot = express.Router();
const { admin } = require('../../../controller');

pilot.get('/', async (req, res) => {
  res.render('motoristas', {
    title: 'MOTO MOVE | Administrador | Motoristas',
    data: await admin.pilot.getAll()
  });
});

pilot.get('/editar/:cpf', async (req, res) => {
  console.log(await admin.pilot.getByCpf(req));
  res.redirect('/motoristas');
});

pilot.get('/excluir/:cpf', async (req, res) => {
  await admin.pilot.delete(req);
  res.redirect('/motoristas');
});

module.exports = pilot;
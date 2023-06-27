const express = require('express');
const pilot = express.Router();
const { admin } = require('../../../controller');
const client = require('../Client');

pilot.get('/', async (req, res) => {
  res.render('motoristas', {
    title: 'MOTO MOVE | Administrador | Motoristas',
    data: await admin.pilot.getAll()
  });
});

pilot.get('/editar/:cpf', async (req, res) => {
  let data = await admin.client.getByCpf(req);
  data[0].dataNascimento = JSON.stringify(data[0].dataNascimento).split("T")[0].replace('"','');
  res.redirect('/motoristas', {
    title: 'MOTO MOVE | Administrador | Motoristas',
    data: data[0]
  });
});

pilot.post('/editar', async(req, res) =>{
  await admin.pilot.update(req);
  res.redirect("/motoristas")
})

pilot.get('/excluir/:cpf', async (req, res) => {
  await admin.pilot.delete(req);
  res.redirect('/motoristas');
});

module.exports = pilot;
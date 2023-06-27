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
  let data = await admin.client.getByCpf(req);
  data[0].dataNascimento = JSON.stringify(data[0].dataNascimento).split("T")[0].replace('"','');
  res.render("editar-cliente", {
    title: 'MOTO MOVE | Administrador | Clientes',
    data: data[0]
  });
});

client.post('/editar', async(req, res) =>{
  await admin.client.update(req);
  res.redirect("/clientes")
})

client.get('/excluir/:cpf', async (req, res) => {
  await admin.client.delete(req);
  res.redirect('/clientes');
});


module.exports = client;
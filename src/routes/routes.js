const express = require('express');
const routes = express.Router();

routes.get('/',function(req, res){
  console.log('Eita');
  res.send('Eita');
});

// Tela Inicial sem login
routes.get('/inicio', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Bem-Vindo'
  };
  res.render('inicio', dadosTemplate);
});

// Login

// Cadastro Cliente

// Cadastro Motorista

// Admin
routes.get('/admin', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador'
  };
  res.render('dashboard-admin', dadosTemplate);
})

module.exports = routes;
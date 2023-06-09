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
routes.get('/login', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Login' 
  };
  res.render('login', dadosTemplate);
});

// Cadastro Cliente
routes.get('/cadastro/cliente', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Cadastro Cliente'
  };
  res.render('cadastro-cliente', dadosTemplate);
});

// Cadastro Motorista
routes.get('/cadastro/motorista', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Cadastro Motorista'
  };
  res.render('cadastro-motorista', dadosTemplate);
});

module.exports = routes;
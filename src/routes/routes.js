const express = require('express');
const routes = express.Router();

// ********************************
//            Homepage
// ********************************
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

// ********************************
//            Dashboard
// ********************************
// Admin
routes.get('/admin', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador'
  };
  res.render('dashboard-admin', dadosTemplate);
});

// Cliente
routes.get('/clientes', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador | Clientes'
  };
  res.render('clientes', dadosTemplate);
});

routes.get('/cliente', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador | Editar | Cliente'
  };
  res.render('editar-cliente', dadosTemplate);
});

// Motorista
routes.get('/motoristas', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador | Motoristas'
  };
  res.render('motoristas', dadosTemplate);
});

routes.get('/motorista', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador | Editar | Motorista'
  };
  res.render('editar-motorista', dadosTemplate);
});

// Corrida
routes.get('/corridas', function(req, res) {
  const dadosTemplate = {
    title: 'MOTO MOVE | Administrador | Corridas'
  };
  res.render('corridas', dadosTemplate);
});

module.exports = routes;
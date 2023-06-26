const express = require('express');
const router = express.Router();
const admin = require('./admin');
const public = require('./public');
const database = require('../database');

router.get('/', (req, res) => {
  res.render('inicio', {
    title: 'MOTO MOVE | Bem-Vindo'
  });
});

router.get('/connection', async (req, res) => {
  const connection = await database.getConnection();
  console.log(connection);
  res.send('Conexão realizada com sucesso!');
});

router.use('/', public);
router.use('/', admin);

module.exports = router;
const express = require('express');
const auth = express.Router();
const { admin } = require('../../../controller');

auth.post('/login', async (req, res) => {
  admin.auth.login(req, res);
});

auth.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = auth;
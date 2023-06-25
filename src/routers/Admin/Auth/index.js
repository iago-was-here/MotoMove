const express = require('express');
const auth = express.Router();
const { admin } = require('../../../controller');

auth.post('/login', async (req, res) => {
    admin.auth.login(req, res);
});

module.exports = auth;
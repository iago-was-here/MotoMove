const express = require('express');
const public = express.Router();
const client = require('./client');
const pilot = require('./pilot');

public.use('/cadastrar', client);
public.use('/cadastrar', pilot);

module.exports = public;
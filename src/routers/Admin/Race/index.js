const express = require('express');
const race = express.Router();
const raceController = require('../../../controller/admin/race')
const pilotController = require('../../../controller/admin/pilot');
const clientController = require('../../../controller/admin/client');

race.get('/', async (req, res) => {
  const races = await raceController.getAll();
  const pilots = await pilotController.getAll();
  const passengers = await clientController.getAll();

  res.render('corridas', {
    title: 'MOTO MOVE | Administrador | Corridas',
    races: races,
    pilots: pilots,
    passengers: passengers
  });
});

race.post('/cadastrar', async (req, res) => {
  const data = await raceController.create(req);
  res.redirect('/corridas');
});

module.exports = race;
const express = require('express');
const routes = express.Router();

routes.use((req, res, next) => {
  console.log(req.url);
  automaticRoute(req.url);
  next();
})

routes.get('/', function (req, res) {
  res.send('Eita');
});

// Tela Inicial sem login
// routes.get('/inicio', function(req, res) {
//   const dadosTemplate = {
//     title: 'MOTO MOVE | Bem-Vindo',
//     style: 'public/css/style.css'
//   };
//   res.render('inicio', dadosTemplate);
// });

var automaticRoute = function (path) {
  routes.get(path, function (req, res) {
    var view = path.slice(1, path.lenght);
    res.render(view);
  });
}

module.exports = routes;
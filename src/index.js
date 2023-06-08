const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs.engine())
  .set('view engine', 'handlebars')
  .set('views', __dirname + '/views')
  .use('/assets', express.static(__dirname + '/assets'))
  .use('/bootstrap', express.static(__dirname, '..', 'node_modules/bootstrap/'))
  .use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});

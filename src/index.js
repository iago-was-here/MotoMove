const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs.engine())
  .set('view engine', 'handlebars')
  .set('views', __dirname + '/views')
  .use('/public', express.static(__dirname + '/public/'))
  .use('/bootstrap', express.static('node_modules/bootstrap/'))
  .use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
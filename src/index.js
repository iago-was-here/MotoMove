require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routers');

const app = express();
const port = 8080;

app.engine('handlebars', exphbs.engine())
  .set('view engine', 'handlebars')
  .set('views', __dirname + '/views')
  .use(express.urlencoded({ extended: true }))
  .use('/public', express.static(__dirname + '/public/'))
  .use('/bootstrap', express.static('node_modules/bootstrap/'))
  .use('/', routes)
  .use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
    })
  );

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
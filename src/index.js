import routes from './routes/routes.js';
import express  from 'express';
import exphbs from 'express-handlebars';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});

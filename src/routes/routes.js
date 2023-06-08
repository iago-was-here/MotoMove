import express  from 'express';
const routes = express.Router();

routes.get("/",function(req, res){
    console.log('Eita');
    res.send('Eita');
})

// Tela Inicial sem login
routes.get("/inicio", function(req, res) {
    const dadosTemplate = {
        title: 'MOTO MOVE | Bem-Vindo',
        style: "../public/css/style.css"
    }
    res.render('inicio', dadosTemplate);
})

export default routes;
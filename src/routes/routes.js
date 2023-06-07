import express  from 'express';
const routes = express.Router();

routes.get("/",function(req, res){
    console.log('Eita');
})

export default routes;
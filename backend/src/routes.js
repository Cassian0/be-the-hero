const express = require('express');

const OngController = require('./controllers/OngController');/* importando ong controller */
const IncidentController = require('./controllers/IncidentController');/* importando incidet controller */
const ProfileController = require('./controllers/ProfileController');/* importando profile controller listar atraves de um valor especifico */
const SessionController = require('./controllers/SessionController');/* importando controller de login */

const routes = express.Router();

routes.post('/sessions', SessionController.create);/* rota de login */

routes.get('/ongs', OngController.index);/* rota de listagem */
routes.post('/ongs', OngController.create);/* rota de criacao */
routes.get('/profile', ProfileController.index);/* listar uma ong especifica */

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);/* através do id informado pelo usuario é excluido um caso "/:id" */


module.exports = routes;
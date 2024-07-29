import express from 'express';

import { validar } from '../services/validacoes.js';
import { administrador } from '../controllers/administrador.js';
import { horarios } from '../controllers/horarios.js';


const routes = express.Router();



routes.post ('/usuario/cadastro', validar.validacaoCadastro, administrador.cadastro);

routes.post('/usuario/login', administrador.login);


// Horários.

routes.post('/usuario/horarios', horarios.retornoHorarios);

routes.post('/usuario/lancarHora', horarios.lancarHora);


// Banco de horas.

routes.post('/usuario/buscarBanco', horarios.puxarBancoHoras);

routes.post('/usuario/lancarBanco', horarios.salvarBancoHora);


export default routes;
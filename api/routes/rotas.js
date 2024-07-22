import express from 'express';

import { validar } from '../services/validacoes.js';
import { administrador } from '../controllers/administrador.js';

const routes = express.Router();



routes.post ('/usuario/cadastro', validar.validacaoCadastro, administrador.cadastro);





export default routes;
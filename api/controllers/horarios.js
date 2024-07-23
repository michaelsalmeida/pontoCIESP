import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { cookie } from '../services/cookie.js'
import { horariosDB } from '../models/horarios.js';
import { criarjwt, parseJwt, autorizacao } from "../services/jwt.js"
import { campoIndefinido, erroPadrao, jogaErro } from '../services/tratamentos.js'

dotenv.config(); 

async function retornoHorarios (req, res) {
    try {
        const { dataEscolhida } = req.body;

        // Pega o token enviado pelo front que está no cookie
        const token = await cookie(req.headers.cookies);

        // Decodifica para pegar as informações do usuário logado
        const decoded = parseJwt(token);

        const dadosHorario = await horariosDB.buscarHoras(decoded.registro, dataEscolhida);

        res.status(200).json({ status : 'success', horarios : dadosHorario});


    } catch (error) {
        erroPadrao(res, error);
    }
}




export const horarios = {
    retornoHorarios
}
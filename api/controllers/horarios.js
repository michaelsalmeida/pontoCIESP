import bcrypt from 'bcryptjs';
import dotenv, { parse } from 'dotenv';

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

async function lancarHora (req, res) {
    try {
        const { data, entrada, saida, idaAlmoco, voltaAlmoco, cargaDiaria, motivo } = req.body;

        const token = await cookie(req.headers.cookies);

        const decoded = parseJwt(token);

        await horariosDB.lancarHoraBanco(data, entrada, saida, idaAlmoco, voltaAlmoco, cargaDiaria, motivo, decoded.registro);

        res.status(201).json({ status : 'success', msg : 'Lançamento feito com sucesso'});

    } catch (error) {
        erroPadrao(res, error);
    }
}

async function salvarBancoHora (req, res) {
    try {
        const { horaParaBanco } = req.body;

        const token = await cookie(req.headers.cookies);

        const decoded = parseJwt(token);

        await horariosDB.salvarBanco(decoded.registro, horaParaBanco);

        res.status(201).json({ status : 'success', msg : 'Banco de horas salvo'});

    } catch (error) {
        erroPadrao(res, error);
    }
}


async function puxarBancoHoras (req ,res) {
    try {
        const token = await cookie(req.headers.cookies);

        const decoded = parseJwt(token);

        console.log(decoded);

        const qtdBando = await horariosDB.puxarBancoHoras(decoded.registro);

        res.status(201).json({ status : 'success', msg : 'Banco de horas resgatado com sucesso', banco : qtdBando})

    } catch (error) {
        erroPadrao(res, error);
    }
}



export const horarios = {
    retornoHorarios,
    lancarHora,
    puxarBancoHoras,
    salvarBancoHora
}
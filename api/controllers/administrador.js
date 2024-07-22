import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { cookie } from '../services/cookie.js'
import { administradorDB } from '../models/administrador.js'
import { criarjwt, parseJwt, autorizacao } from "../services/jwt.js"
import { campoIndefinido, erroPadrao, jogaErro } from '../services/tratamentos.js'


async function cadastro (req, res) {
    const  { registro, nome, email, senha, tipo } = req.body;

    try {
        console.log(registro, nome, email, senha, tipo)
        await campoIndefinido([registro, nome, email, senha, tipo]) // Verifica se os campos foram definidos

        // verifica se o email ja existe na tabela do google (cada email so pode estar em uma tabela só, ou no login normao ou no do google)
        const usuarioExisteTabela = await administradorDB.emailExiste(email, 'funcionarios');
    
        if (usuarioExisteTabela.length > 0) {
            jogaErro('Email já cadastrado na plataforma!')
        }
        
        // criptografia da senha do usuário
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt);
        
        // cadastro em si do usuário
        await administradorDB.cadastrar(registro, nome, email, senhaHash, tipo)
        res.status(201).json({ status : 'success' , msg : "Usuário cadastrado com sucesso! Realize o login!"})

    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            error.mensagem = 'Email ou username já utilizado!'
        }

        erroPadrao(res, error)
    }
}



export const administrador = {
    cadastro
}
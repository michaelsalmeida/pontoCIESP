import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { cookie } from '../services/cookie.js'
import { administradorDB } from '../models/administrador.js'
import { criarjwt, parseJwt, autorizacao } from "../services/jwt.js"
import { campoIndefinido, erroPadrao, jogaErro } from '../services/tratamentos.js'

dotenv.config(); 

async function cadastro (req, res) {
    const  { registro, nome, sobrenome, email, senha, tipo } = req.body;

    try {
        await campoIndefinido([registro, nome, sobrenome, email, senha, tipo]) // Verifica se os campos foram definidos

        const registroJaExiste = await administradorDB.registroExiste(registro, 'funcionarios');

        // verifica se o email ja existe na tabela do google (cada email so pode estar em uma tabela só, ou no login normao ou no do google)
        const usuarioExisteTabela = await administradorDB.emailExiste(email, 'funcionarios');
        
        if (registroJaExiste.length > 0) {
            jogaErro('Registro já existente no sistema')
        };

        if (usuarioExisteTabela.length > 0) {
            jogaErro('Email já cadastrado na plataforma!')
        };
        
        // criptografia da senha do usuário
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt);
        
        // cadastro em si do usuário
        await administradorDB.cadastrar(registro, nome, sobrenome, email, senhaHash, tipo);

        await administradorDB.zerarBancoHoras(registro);
        
        res.status(201).json({ status : 'success' , msg : "Usuário cadastrado com sucesso! Realize o login!"})

    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            error.mensagem = 'Email ou username já utilizado!'
        }

        erroPadrao(res, error)
    }
}

async function login (req, res) {
    const { registro, senha } = req.body;

    try {
        await campoIndefinido([registro, senha]);

        const consulta = await administradorDB.loginModel(registro);
        
        console.log(consulta);

        if (consulta.length == 0) {
            jogaErro('Login ou senha inválidos');
        }

        if (consulta.senha == undefined || !(await bcrypt.compare(senha, consulta.senha))) {
            jogaErro('Login ou senha inválidos');
        }

        const token = criarjwt(consulta.registro, consulta.nome, consulta.sobrenome, consulta.email, consulta.tipo);

        const dadosUsuario = {
            registro : consulta.registro,
            nome : consulta.nome,
            sobrenome : consulta.sobrenome,
            email : consulta.email,
            tipo : consulta.tipo
        }

        res.cookie('usuario', token, {maxAge: 10800000, secure : true, sameSite : 'none'})

        res.status(201).json({ status : 'success', msg : 'Login realizado com sucesso', dados : dadosUsuario, cookie : token})

    } catch (error) {
        erroPadrao(res, error);
    }
}



export const administrador = {
    cadastro,
    login
}
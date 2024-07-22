import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { jogaErro } from './tratamentos.js';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export function criarjwt(id, nome, email, tipo, google = '') {
        const payload = {
            id,
            nome,
            email,
            tipo,
            google
        }

    const options = {
        expiresIn: '3h' 
    };

    return jwt.sign(payload, secretKey, options);
}

// Função de descriptografia
export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');

    var parsedData = JSON.parse(jsonPayload);

    var result = {
        id: ('sub' in parsedData) ? parsedData.sub : parsedData.id,
        nome: ('given_name' in parsedData) ? parsedData.given_name : parsedData.nome,
        email: parsedData.email,
        tipo: parsedData.tipo,
        google: parsedData.google,
        iss: parsedData.iss
    };

    return result;
}

export async function autorizacao(tipo, token) {
    // Verifica se o token foi criado utilizando a secretKey
    jwt.verify(token, secretKey);
    
    // recupera os dados do payload
    const payload = parseJwt(token);

    // Verifica se o tipo do payload, 
    // é igual ao tipo exigido na verificação
    if (payload.tipo != tipo) {
        jogaErro(`Realize o login com permissão de ${tipo}`)
    }
}
import conn from './conn.js';

async function emailExiste (email, tabela) {
    const sql = `SELECT * FROM ${tabela} WHERE email = ?`;
    const [consulta] = await conn.execute(sql, [email]);
    
    return consulta;

}

async function registroExiste (email, tabela) {
    const sql = `SELECT * FROM ${tabela} WHERE registro = ?`;
    const [consulta] = await conn.execute(sql, [email]);
    
    return consulta;

}

async function cadastrar (registro, nome, sobrenome, email, senha, tipo) {
    const sql = 'INSERT INTO funcionarios VALUES (?, ?, ?, ?, ?, ?)';

    const [insercao] = await conn.execute(sql, [registro, nome, sobrenome, email, senha, tipo]);

    return insercao;
}

async function zerarBancoHoras (registro) {
    const sql = 'INSERT INTO bancoDeHoras VALUES (default, ?, ?)';

    const [insercao] = await conn.execute(sql, ['00:00', registro]);

    return insercao;

}

async function loginModel(registro) {
    const sql = "SELECT registro, nome, sobrenome, email, senha, tipo FROM funcionarios WHERE registro = ?";

    const [[consulta]] = await conn.execute(sql, [registro]);

    return consulta;
}


export const administradorDB = {
    registroExiste,
    emailExiste,
    cadastrar,
    loginModel,
    zerarBancoHoras
}
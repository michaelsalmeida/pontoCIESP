import conn from './conn.js';

async function emailExiste (email, tabela) {
    const sql = `SELECT * FROM ${tabela} WHERE email = ?`;
    const [consulta] = await conn.execute(sql, [email]);
    
    return consulta;

}

async function cadastrar (registro, nome, email, senha, tipo) {
    const sql = 'INSERT INTO funcionarios VALUES (?, ?, ?, ?)';

    const [insercao] = await conn.execute(sql, [registro, nome, email, senha, tipo]);

    return insercao;
}


export const administradorDB = {
    emailExiste,
    cadastrar
}
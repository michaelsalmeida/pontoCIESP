import conn from './conn.js';

async function buscarHoras(registro, mes) {

    const sql = `SELECT * FROM cargaHoraria WHERE fk_idRegistro = ? AND (data >= ? AND data <= ?) ORDER BY data ASC`;

    const inicio = `${mes}-01`;
    const fim = `${mes}-31`;
    const [consulta] = await conn.execute(sql, [registro, inicio, fim]);

    return consulta;
}

async function lancarHoraBanco (data, entrada, saida, idaAlmoco, voltaAlmoco, motivo, registro) {
    const sql = 'INSERT INTO cargaHoraria VALUES (default, ?, ?, ?, ?, ?, ?, ?)';

    const [insercao] = await conn.execute(sql, [data, entrada, saida, idaAlmoco, voltaAlmoco, motivo, registro])
}

async function salvarBanco (registro, hora) {
    const sql = 'INSERT INTO bancoDeHoras VALUES (default, ?, ?)';

    const [insercao] = await conn.execute(sql, [hora, registro]);

    return insercao;
}


export const horariosDB = {
    buscarHoras,
    lancarHoraBanco,
    salvarBanco
}
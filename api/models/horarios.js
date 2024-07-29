import conn from './conn.js';

async function buscarHoras(registro, mes) {

    const sql = `SELECT * FROM cargaHoraria WHERE fk_idRegistro = ? AND (data >= ? AND data <= ?) ORDER BY data ASC`;

    const inicio = `${mes}-01`;
    const fim = `${mes}-31`;
    const [consulta] = await conn.execute(sql, [registro, inicio, fim]);

    return consulta;
}

async function lancarHoraBanco (data, entrada, saida, idaAlmoco, voltaAlmoco, cargaDiaria, motivo, registro) {
    const sql = 'INSERT INTO cargaHoraria VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)';

    const [insercao] = await conn.execute(sql, [data, entrada, saida, idaAlmoco, voltaAlmoco, cargaDiaria, motivo, registro])
}

async function salvarBanco (registro, hora) {
    const sql = 'UPDATE bancoDeHoras SET horasAcumuladas = ? WHERE fk_idRegistro = ?';

    const [insercao] = await conn.execute(sql, [hora, registro]);

    return insercao;
}

async function puxarBancoHoras (registro) {
    const sql = 'SELECT horasAcumuladas FROM bancoDeHoras WHERE fk_idRegistro = ?';

    const [consulta] = await conn.execute(sql, [registro, ]);

    return consulta;
}


export const horariosDB = {
    buscarHoras,
    lancarHoraBanco,
    salvarBanco,
    puxarBancoHoras
}
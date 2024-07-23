import conn from './conn.js';

async function buscarHoras(registro, mes) {

    const sql = `SELECT * FROM cargaHoraria WHERE fk_idRegistro = ? AND (data >= ? AND data <= ?)`;

    const inicio = `${mes}-01`;
    const fim = `${mes}-31`;
    const [consulta] = await conn.execute(sql, [registro, inicio, fim]);

    return consulta;
}





export const horariosDB = {
    buscarHoras
}
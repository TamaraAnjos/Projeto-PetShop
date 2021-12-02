import database from '../Repositorio/ConnectionDB.js';

async function insertServico({descricao, valor_servico, tempo_servico}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_servico(?, ?, ?);';
    const insertServ = [descricao, valor_servico, tempo_servico];
    conn.query(sql, insertServ);
    conn.end();
}

async function validaServico(id_servico){
    
    const conn = await database.connect();
    const sql = 'select * from tbl_servico where servico_deletado = 0 and id_servico = ?';
    const [rows] = await conn.query(sql, id_servico);
    conn.end();
    return rows;
}

async function updateServico({descricao, valor_servico, tempo_servico}, {id_servico}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_servico (?, ?, ?, ?)';
    const servUpdate = [descricao, valor_servico, tempo_servico, id_servico];
    await conn.query(sql, servUpdate);
}

async function deleteServico({id_servico}){
    console.log(id_servico);
    const conn = await database.connect();
    const sql = 'CALL sp_delete_servico(?)';
    const serDelete = [id_servico];
    await conn.query(sql, serDelete);
}
export default {insertServico, validaServico, updateServico, deleteServico};
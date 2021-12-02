import database from '../Repositorio/ConnectionDB.js';

async function insertServicoFun({descricao, valor_servico, tempo_servico, name, cpf}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_servico_fun(?, ?, ?, ?, ?);';
    const insertServFun = [descricao, valor_servico, tempo_servico, name, cpf];
    conn.query(sql, insertServFun);
    conn.end();
}

async function validaServicoFun(id_servico, id_funcionario, FK_ID_Servico){
    
    const conn = await database.connect();
    const sql = 'select * from tbl_servico where servico_deletado = 0 and id_servico = ?';
    const sql2 = 'select * from tbl_funcionario where funcionario_deletado = 0 and id_funcionario = ?';
    const sql3 = 'select * from servico_funcionario where servico_funcionario_deletado = 0 and FK_ID_Servico = ?';
    const [rows] = await conn.query(sql, sql2, sql3, id_servico, id_funcionario, FK_ID_Servico);
    conn.end();
    return rows;
}

async function updateServicoFun({descricao, valor_servico, tempo_servico, name, cpf}, {id_servico, id_funcionario, FK_ID_Servico}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_servico_fun (?, ?, ?, ?, ?, ?, ?, ?)';
    const servfunUpdate = [descricao, valor_servico, tempo_servico, name, cpf, id_servico, id_funcionario, FK_ID_Servico];
    await conn.query(sql, servfunUpdate);
}

async function deleteServicoFun({id_servico, id_funcionario, FK_ID_Servico}){
    const conn = await database.connect();
    const sql = 'CALL sp_deleta_servico_fun (?, ?, ?)';
    const funsDelete = [id_servico, id_funcionario , FK_ID_Servico];
    await conn.query(sql, funsDelete);
}
export default {insertServicoFun, validaServicoFun, updateServicoFun, deleteServicoFun};
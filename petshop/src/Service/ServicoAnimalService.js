import database from '../Repositorio/ConnectionDB.js';

async function insertServicoA({name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso, descricao, valor_servico, tempo_servico, data_servico}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_animal_servico(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const insertServA = [name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso, descricao, valor_servico, tempo_servico, data_servico];
    conn.query(sql, insertServA);
    conn.end();
}

async function validaServicoA(FK_ID_Animal, id_cliente, id_animal, id_servico){
    
    const conn = await database.connect();
    const sql = 'select * from animal_servico where animal_servico_deletado = 0 and FK_ID_Animal = ?';
    const sql2 = 'select * from tbl_cliente where cliente_deletado = 0 and id_cliente = ?';
    const sql3 = 'select * from tbl_animal where animal_deletado = 0 and id_animal = ?';
    const sql4 = 'select * from tbl_servico where servico_deletado = 0 and id_servico = ?';
    const [rows] = await conn.query(sql, sql2, sql3, sql4, FK_ID_Animal, id_cliente, id_animal, id_servico);
    conn.end();
    return rows;
}

async function updateServicoA({name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso, descricao, valor_servico, tempo_servico, data_servico}, {id_cliente, id_animal, id_servico, FK_ID_Animal}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_animal_servico (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const servAUpdate = [name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso, descricao, valor_servico, tempo_servico, data_servico, id_cliente, id_animal, id_servico, FK_ID_Animal];
    await conn.query(sql, servAUpdate);
}

async function deleteServicoA({id_cliente, id_animal, id_servico, FK_ID_Animal}){
    const conn = await database.connect();
    const sql = 'CALL sp_deleta_animal_servico (?, ?, ?, ?)';
    const seraniDelete = [id_cliente, id_animal, id_servico, FK_ID_Animal];
    await conn.query(sql, seraniDelete);
}
export default {insertServicoA, validaServicoA, updateServicoA, deleteServicoA};
import database from '../Repositorio/ConnectionDB.js';

async function insertFuncionario({name, cpf}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_fun(?, ?)';
    const insertFun = [name, cpf];
    conn.query(sql, insertFun);
    conn.end();
}

async function validaFuncionario(id_funcionario){
    const conn = await database.connect();
    const sql = 'select * from tbl_funcionario where funcionario_deletado = 0 and id_funcionario = ?';
    const [rows] = await conn.query(sql, id_funcionario);
    conn.end();
    return rows;
}

async function updateFuncionario({name, cpf}, {id_funcionario}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_fun (?, ?, ?)';
    const funUpdate = [name, cpf, id_funcionario];
    await conn.query(sql, funUpdate);
}

async function deleteFuncionario({id_funcionario}){
    console.log(id_funcionario);
    const conn = await database.connect();
    const sql = 'CALL sp_deleta_fun (?)';
    const funDelete = [id_funcionario];
    await conn.query(sql, funDelete);
}
export default {insertFuncionario, validaFuncionario, updateFuncionario, deleteFuncionario};
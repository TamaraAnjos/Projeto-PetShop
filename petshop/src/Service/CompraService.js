import database from '../Repositorio/ConnectionDB.js';

async function insertCompra({name, cpf, nascimento, sexo, telefone, email, nome_f, cpf_f, valor, date, id_cliente, id_funcionario}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_compra_cli_fun(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const compraInsert = [name, cpf, nascimento, sexo, telefone, email, nome_f, cpf_f, valor, date, id_cliente, id_funcionario];
    conn.query(sql, compraInsert);
    conn.end();
}

async function validaCompra(id_compra, id_cliente, id_funcionario){
    const conn = await database.connect();
    const sql = 'select * from tbl_compra where compra_deletada = 0 and id_compra = ?';
    const sql2 = 'select * from tbl_cliente where cliente_deletado = 0 and id_cliente = ?';
    const sql3 = 'select * from tbl_funcionario where funcionario_deletado = 0 and id_funcionario = ?';
    const [rows] = await conn.query(sql, sql2, sql3, id_compra, id_cliente, id_funcionario);
    conn.end();
    return rows;
}

async function updateCompra({name, cpf, nascimento, sexo, telefone, email, nome_f, cpf_f, valor, date}, {id_compra, id_cliente, id_funcionario}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_compra_cli_fun(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const newUserData = [name, cpf, nascimento, sexo, telefone, email, nome_f, cpf_f, valor, date, id_compra, id_cliente, id_funcionario];
    conn.query(sql, newUserData);
    conn.end();
}

async function deleteCompraS({id_compra, id_cliente, id_funcionario}){
    const conn = await database.connect();
    const sql = 'CALL sp_deleta_compra_cli_fun (?, ?, ?)';
    const comsDelete = [id_compra, id_cliente, id_funcionario];
    await conn.query(sql, comsDelete);
}
export default {insertCompra, validaCompra, updateCompra, deleteCompraS}

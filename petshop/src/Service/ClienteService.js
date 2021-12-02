import database from '../Repositorio/ConnectionDB.js';

async function insertCliente({name, cpf, nascimento, sexo, telefone, email}) {
    const conn = await database.connect();

    const sql = 'CALL sp_insere_clientes(?, ?, ?, ?, ?, ?);';
    const userInsert = [name, cpf, nascimento, sexo, telefone, email];
    conn.query(sql, userInsert);
    conn.end();
}

async function validaCliente(id_cliente){
    console.log(id_cliente);
    const conn = await database.connect();
    const sql = 'Select * from tbl_cliente where cliente_deletado = 0 and id_cliente = ?';
    const [rows] = await conn.query(sql, id_cliente);
    conn.end();
    return rows;
}

async function updateCliente({name, cpf, nascimento, sexo, telefone, email}, {id_cliente}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_clientes (?, ?, ?, ?, ?, ?, ?)';
    const cliUpdate = [name, cpf, nascimento, sexo, telefone, email, id_cliente];
    await conn.query(sql, cliUpdate);
}

async function deleteCliente({id_cliente}){
    const conn = await database.connect();
    const sql = 'CALL sp_delete_servico_fun(?)';
    const cliDelete = [id_cliente];
    await conn.query(sql, cliDelete);
}
export default {insertCliente, validaCliente, updateCliente, deleteCliente};
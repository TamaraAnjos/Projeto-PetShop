import database from '../Repositorio/ConnectionDB.js';

async function insertAnimal({name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso}) {
    const conn = await database.connect();
    const sql = 'CALL sp_insere_animal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const animalInsert = [name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso];
    conn.query(sql, animalInsert);
    conn.end();
}

async function validaAnimal(id_cliente, id_animal){
    const conn = await database.connect();
    const sqlcli = 'Select * from tbl_cliente where cliente_deletado = 0 and id_cliente = ?';
    const sql = 'select * from tbl_animal where animal_deletado = 0 and id_animal = ?';
    const [rows] = await conn.query(sqlcli, sql, id_cliente, id_animal);
    conn.end();
    return rows;
}

async function updateAnimal({name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso}, {id_cliente, id_animal}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_animal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const animalUpdate = [name, cpf, nascimento, sexo, telefone, email, nome_animal, especie, sexo_a, nascimento_a, peso, id_cliente, id_animal];
    await conn.query(sql, animalUpdate);
}

async function deleteAnimal({id_cliente, id_animal}){
    console.log(id_cliente, id_animal);
    const conn = await database.connect();
    const sql = 'CALL sp_delete_animal(?, ?)';
    const aniDelete = [id_cliente, id_animal];
    await conn.query(sql, aniDelete);
}
export default {insertAnimal, validaAnimal, updateAnimal, deleteAnimal};
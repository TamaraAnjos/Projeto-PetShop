import database  from '../repositorio/connectionDB.js';

async function insertUser(email, password, userName){
    const conn = await database.connect();
    const sql = 'CALL sp_insere_usuario (?, ?, ?)';
    const newUserData = [email, password, userName]
    conn.query(sql, newUserData);
    conn.end();
}

async function validaUser(id_login){
    console.log(id_login);
    const conn = await database.connect();
    const sql = 'Select * from tbl_usuarios where usuario_deletado = 0 and id_login = ?';
    const [rows] = await conn.query(sql, id_login);
    conn.end();
    return rows;
}
    async function updateUser({email, password, userName}, {id_login}){
    const conn = await database.connect();
    const sql = 'CALL sp_atualiza_usuario (?, ?, ?, ?)';
    const newUserData = [email, password, userName, id_login]
    conn.query(sql, newUserData);
    conn.end();
}
async function deleteUser({id_login}){
    console.log(id_login);
    const conn = await database.connect();
    const sql = 'CALL sp_delete_usuario(?)';
    const userDelete = [id_login];
    await conn.query(sql, userDelete);
}
async function checkEmail(userEmail){
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuarios WHERE email=?';
    const [rows] = await conn.query(sql, userEmail);
    conn.end();
    return rows;
}

export default {insertUser, updateUser, deleteUser, checkEmail, validaUser};
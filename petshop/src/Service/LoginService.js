import database from '../Repositorio/ConnectionDB.js';

async function login(userEmail, password){
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuarios WHERE email = ? and senha = md5(?) and usuario_deletado = 0';
    const dataLogin = [userEmail, password];
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();
    return rows;
}

async function changePassword(newPassword, userEmail){
    const conn = await database.connect();
    const sql = 'UPDATE tbl_usuarios SET senha = ? WHERE email = ? and usuario_deletado = 0';
    const dataNewPassword = [newPassword, userEmail];
    await conn.query(sql, dataNewPassword);
    conn.end();
}
export default {login, changePassword};
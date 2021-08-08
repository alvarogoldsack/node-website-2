const pool = require('./../utils/bd');

const verify = async(uid) => {
    const query = "UPDATE ?? SET habilitado = 1 WHERE confirmacionCorreo = ?"
    const params = [process.env.T_USUARIOS, uid];
    return await pool.query(query, params);
}
const auth = async(username, pass) => {
    const query = "SELECT id, admin FROM ?? WHERE username = ? AND pass = ? AND habilitado = 1 AND eliminado = 0";
    const params = [process.env.T_USUARIOS, username, pass];
    return await pool.query(query, params);
}

const create = (obj) => pool.query("INSERT INTO ?? SET ?", [process.env.T_USUARIOS, obj]).then(response => response).catch(err => console.error(err));

const createImages = (obj) => pool.query("INSERT INTO ?? SET ?", [process.env.T_USUARIOSIMG, obj]).then(response => response).catch(err => console.error(err));

const getSingle = async(id) => {
    try {
        const query = "SELECT u.id, u.username, u.mail, u.pass, uI.uid AS uuid FROM ?? AS u JOIN ?? AS uI ON u.id = uI.id_usuario WHERE u.eliminado = 0 AND u.id = ?";
        const params = [process.env.T_USUARIOS, process.env.T_USUARIOSIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const all = async() => {
    try {
        const query = "SELECT u.id, u.username, uI.uid AS uuid FROM usuarios AS u JOIN usuarios_imagenes AS uI ON u.id = uI.id_usuario WHERE u.eliminado = 0 AND u.habilitado = 1";
        return await pool.query(query);
    } catch (error) {
        console.error(error);
    }
}

const update = async(id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_USUARIOS, obj, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const updateImg = async(id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id_usuario = ?";
        const params = [process.env.T_USUARIOSIMG, obj, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const del = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_USUARIOS, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const delImg = async(id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id_usuario = ?";
        const params = [process.env.T_USUARIOSIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}



module.exports = {create, createImages, getSingle, all, update, del, delImg, updateImg, verify, auth}
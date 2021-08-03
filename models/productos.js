const pool = require('./../utils/bd');

// const getAll = async() => {
//     const query = "SELECT p.id, p.nombre, p.descripcion, FROM ?? AS p WHERE p.eliminado = 0";
//     // ?? == nombre de tabla ? == cualquier otra variable
//     const params = [process.env.T_PRODUCTOS];
//     // T_PRODUCTOS = "productos", T_CATEGORIAS = "categorias", T_USUARIOS = "usuarios"
//     const rows = await pool.query(query, params);
//     return rows;
// }

const getAll = async() => {
    try {
        const query = "SELECT p.nombre, p.descripcion, pI.uid AS uuid FROM productos AS p JOIN productos_imagenes AS pI ON p.id = pI.id_producto WHERE p.eliminado = 0";
        return await pool.query(query);
    } catch (error) {
        console.error(error);
    }
}

const getSingle = async(id) => {
    const query = "SELECT p.id, p.nombre, p.descripcion FROM ?? AS p  WHERE p.id = ? AND p.eliminado = 0";
    const params = [process.env.T_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    return rows;
}
const create = (obj) => 
    pool.query("INSERT INTO ?? SET ?", [process.env.T_PRODUCTOS, obj]).then(response => response).catch(err => console.error(err));

const createImages = (obj) =>
    pool.query("INSERT INTO ?? SET ?", [process.env.T_PRODUCTOSIMG, obj]).then(response => response).catch(err => console.error(err));

const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, obj, id];
    return await pool.query(query, params);
}
const del = async(id) => {
    const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, id];
    return await pool.query(query, params);
}




module.exports = {getAll, getSingle, create, update, del, createImages}
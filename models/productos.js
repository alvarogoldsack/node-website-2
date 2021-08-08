const pool = require('./../utils/bd');

// const getAll = async() => {
//     const query = "SELECT p.id, p.nombre, p.descripcion, FROM ?? AS p WHERE p.eliminado = 0";
//     // ?? == nombre de tabla ? == cualquier otra variable
//     const params = [process.env.T_PRODUCTOS];
//     // T_PRODUCTOS = "productos", T_CATEGORIAS = "categorias", T_USUARIOS = "usuarios"
//     const rows = await pool.query(query, params);
//     return rows;
// }

const getSingle = async(id) => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, pI.uid AS uuid FROM ?? AS p JOIN ?? AS pI ON p.id = pI.id_producto WHERE p.eliminado = 0 AND p.id = ?";
        const params = [process.env.T_PRODUCTOS, process.env.T_PRODUCTOSIMG, id];
        return await pool.query(query, params);
    } catch (error) {
        console.error(error);
    }
}

const getAll = async() => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, pI.uid AS uuid FROM productos AS p JOIN productos_imagenes AS pI ON p.id = pI.id_producto WHERE p.eliminado = 0";
        return await pool.query(query);
    } catch (error) {
        console.error(error);
    }
}

const create = (obj) => 
    pool.query("INSERT INTO ?? SET ?", [process.env.T_PRODUCTOS, obj]).then(response => response).catch(err => console.error(err));

const createImages = (obj) =>
    pool.query("INSERT INTO ?? SET ?", [process.env.T_PRODUCTOSIMG, obj]).then(response => response).catch(err => console.error(err));


    const update = async(id, obj) => {
        try {
            const query = "UPDATE ?? SET ? WHERE id = ?";
            const params = [process.env.T_PRODUCTOS, obj, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const updateImg = async(id, obj) => {
        try {
            const query = "UPDATE ?? SET ? WHERE id_producto = ?";
            const params = [process.env.T_PRODUCTOSIMG, obj, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const del = async(id) => {
        try {
            const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
            const params = [process.env.T_PRODUCTOS, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const delImg = async(id) => {
        try {
            const query = "UPDATE ?? SET eliminado = 1 WHERE id_producto = ?";
            const params = [process.env.T_PRODUCTOSIMG, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    



module.exports = {getAll, getSingle, create, update, updateImg, del, delImg, createImages}
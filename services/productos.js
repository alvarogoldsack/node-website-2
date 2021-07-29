const {create, createImages, update, updateImg} = require("./../models/productos");
const {imgFile} = require("./../utils/fileHandler");

const createProducto = async(body, file) => {
    try {
        const {insertId : id_Producto} = await create(body);
        const uid = imgFile(file);
        const obj = {id_Producto, uid};
        const {insertId : idImg} = await createImages(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }

}

const updateProducto = async(id, body, file) => {
    try {
        const id_Producto = await update(id,body);
        if (file){
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await updateImg(id, obj);
            return idImg;
        }
        else{
            return id_Producto;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = {createProducto, updateProducto};
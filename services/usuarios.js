const {create, createImages, update, updateImg} = require("./../models/usuarios");
const {imgFile} = require("./../utils/fileHandler");

const createUsuario = async(body, file) => {
    try {
        const {insertId : id_usuario} = await create(body);
        const uid = imgFile(file);
        const obj = {id_usuario, uid};
        const {insertId : idImg} = await createImages(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }

}

const updateUsuario = async(id, body, file) => {
    try {
        const id_usuario = await update(id,body);
        if (file){
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await updateImg(id, obj);
            return idImg;
        }
        else{
            return id_usuario;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = {createUsuario, updateUsuario};
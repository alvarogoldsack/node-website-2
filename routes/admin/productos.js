const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const service  = require('./../../services/productos');
const model = require('./../../models/productos');
const {validateProducto} = require('./../../middlewares/usuarios');

const get = async(req,res) => {
    const productos = await model.getAll();
    res.render('adminProductos' , {productos});
}

const create = async (req, res) => {
    const producto = req.body;
    const idImg = await service.createProducto(req.body, req.file);
    console.log(producto);
    // const {insertId} = await model.create(producto);
    // console.log(insertId);
    res.redirect('http://localhost:3000');
}
const del = async (req, res) => {
    const {id} = req.params;
    const msgProductos = await model.del(id);
    const msgImagen = await model.delImg(id);
    res.redirect('/admin/productos');
}
const getUpdate = async (req, res) => {
    const [producto] = await model.getSingle(req.params.id);
    console.log(producto);
    res.render('productosUpdate', {producto})
}
const update = async (req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.updateProducto(req.params.id, req.body, req.file);
    console.log(idImg);
    res.redirect('/admin/productos');
}
router.get('/create', (req, res) => res.render('createProducto'));
router.post('/create', upload.single("imagen"), validateProducto, create);
router.post('/update/:id', upload.single("imagen"), update);
router.get('/', get);
router.get('/update/:id', getUpdate);
router.get('/delete/:id', del);
module.exports = router;
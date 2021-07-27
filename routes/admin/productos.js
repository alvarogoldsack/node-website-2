const express = require('express');
const router = express.Router();
const model = require('./../../models/productos');

const get = async(req,res) => {
    const productos = await model.getAll();
    res.render('adminProductos' , {productos});
}

const create = async (req, res) => {
    const producto = req.body;
    console.log(producto);
    const {insertId} = await model.create(producto);
    console.log(insertId);
    res.redirect('/admin/productos');
}
const update = async (req, res) => {
    const {id} = req.params;
    const producto = req.body;
    console.log(producto);
    const {insertId} = await model.update(id, producto);
    console.log(insertId);
    res.redirect('/admin/productos');
}
const showUpdate = async (req, res) => {
    const {id} = req.params;
    const [producto] = await model.getSingle(id);
    res.render('updateProducto', {producto});
}
const del = async (req, res) => {
    const {id} = req.params;
    const {insertId} = await model.del(id);
    console.log(insertId);
    res.redirect('/admin/productos');
}
router.get('/', get);
router.post('/create', create);
router.get('/update/:id', showUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', del);
module.exports = router;
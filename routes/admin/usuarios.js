const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const service  = require('./../../services/usuarios');
const model = require('./../../models/usuarios');

const create = async (req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.createUsuario(req.body, req.file);
    console.log(idImg);
    res.redirect('/admin/usuarios');
}
const getAll = async (req, res) => {
    const usuarios = await model.all();
    console.log(usuarios);
    res.render('adminUsuarios', {usuarios})
}
const del = async (req, res) => {
    const {id} = req.params;
    const msgUsuarios = await model.del(id);
    const msgImagen = await model.delImg(id);
    res.redirect('/admin/usuarios');
}
const getUpdate = async (req, res) => {
    const [usuario] = await model.getSingle(req.params.id);
    console.log(usuario);
    res.render('usuariosUpdate', {usuario})
}
const update = async (req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.updateUsuario(req.params.id, req.body, req.file);
    console.log(idImg);
    res.redirect('/admin/usuarios');
}

router.get('/create', (req, res) => res.render('createUsuarios'))
router.post('/create', upload.single("imagen"), create);
router.post('/update/:id', upload.single("imagen"), update);
router.get('/', getAll);
router.get('/update/:id', getUpdate);
router.get('/delete/:id', del);
module.exports = router;
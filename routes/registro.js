const express = require('express');
const router = express.Router();
const model = require('./../models/usuarios');
const config = { dest: './public/tmp'};
const upload = multer(config);
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const service  = require('./../services/usuarios');
const { send } =require('./../services/mail')

const showRegistro = (req, res) => {
    res.render('registro');
}
const create = async (req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.createUsuario(req.body, req.file);
    const usuario = req.body;
    console.log(usuario);
    const uid = uuid();
    console.log(uid)
    const usuarioFinal = { //usuario que voy a pasar a la BDD
        username: usuario.username,
        pass: sha1(usuario.pass),
        mail: usuario.mail,
        confirmacionCorreo: uid,
    }
    // verificar si el nombre o el mail ya existen 
    // const usuariosExistentes = await model.all();
    // usuariosExistentes.forEach(usuario => {
    //     if (usuario.username == usuarioFinal.username || usuario.mail == usuarioFinal.mail){
    //         res.render('registro', {message: "el nombre de usuario y/o mail ingresado ya existe"})
    //     }
    // })
    const agregado = await model.create(usuarioFinal);
    console.log(agregado);
    send({
        mail : usuarioFinal.mail, 
        cuerpo:
         `<h1> Bienvenido ${usuarioFinal.username}</h1>
         <a href="${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Link magico</a>`,
        });
    res.redirect('/usuarios');
}
const verify = async(req, res) => {
    const {uid} = req.params;
    console.log(uid);
    const messageId = await model.verify(uid);
    res.redirect('/productos');
}

router.get('/', (req, res) => res.render('registro'));
router.get('/', showRegistro);
router.post('/', upload.single("imagen"), create);
router.post('/', create);
router.get('/verify/:uid', verify);
module.exports = router;
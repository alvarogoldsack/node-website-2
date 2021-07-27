const express = require('express');
const router = express.Router();
const model = require('./../models/usuarios');

const getAll = async (req, res) => {
    const Usuarios = await model.all();
    console.log(Usuarios);
    res.render('usuarios', {Usuarios})
}

router.get('/', getAll);
module.exports = router;
const express = require('express');
const router = express.Router();
const model = require('./../models/usuarios');

const getAll = async (req, res) => {
    const usuarios = await model.all();
    console.log(usuarios);
    res.render('usuarios', {usuarios})
}

router.get('/', getAll);
module.exports = router;
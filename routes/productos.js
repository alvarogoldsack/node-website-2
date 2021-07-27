const express = require('express');
const router = express.Router();
const {getAll} = require('./../models/productos');

const get = async(req, res) => {
    const productos = await getAll();
    console.log(productos);
    res.render('index', {productos});
}

router.get('/', get);
module.exports = router;
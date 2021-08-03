// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

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
const {schemas} = require('./schemas/usuarios');

const validateLogin = (req, res, next) => {
    const {error, value} = schemas.login.validate(req.body);
    error ? res.render('login', {message : error.details[0].message}) : next();
}

const validateRegistro = (req, res, next) => {
    const {error, value} = schemas.registro.validate(req.body);
    error ? res.render('registro', {message : error.details[0].message}) : next();
}

const validateProducto = (req, res, next) => {
    const {error, value} = schemas.createP.validate(req.body);
    error ? res.render('createProducto', {message : error.details[0].message}) : next();
}

module.exports = {validateLogin, validateRegistro, validateProducto}
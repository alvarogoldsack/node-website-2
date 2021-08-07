const Joi = require('@hapi/joi'); //npm i @hapi/joi.js

const schemas = {
    login: Joi.object().keys({
        username: Joi.string().required().messages({
            "string.empty": "El nombre de usuario es obligatorio"
        }),
        pass: Joi.string().min(3).max(20).required().messages({
            "string.empty" : "La contraseña es obligatoria",
            "string.min" : "La contraseña tiene que tener como minimo 3 caracteres",
            "string.max" : "La contraseña puede tener como maximo 20 caracteres"
        }),
    }),
    registro: Joi.object().keys({
        username: Joi.string().required().messages({
            "string.empty": "El nombre de usuario es obligatorio"
        }),
        mail: Joi.string().email().required().messages({
            "string.empty": "El correo es no puede estar vacío"
        }),
        pass: Joi.string().min(3).max(20).required().messages({
            "string.empty": "La contraseña es obligatoria",
            "string.min" : "La contraseña tiene que tener como minimo 3 caracteres",
            "string.max" : "La contraseña puede tener como maximo 20 caracteres"
        }),
    }),
}

module.exports = {schemas};
const Joi = require('@hapi/joi'); 

const schemas = { 
    login: Joi.object().keys({
        username: Joi.string().required().messages({
            "string.empty" : "El nombre de usuario no puede estar vacío"
        }),
        pass: Joi.string().required().min(3).max(20).messages({
            "string.empty" : "El pass no puede estar vacío",
            "string.min" : "El pass tiene que tener como mínimo 3 caracteres"
        }),
    }),
    registro: Joi.object().keys({
        username: Joi.string().required(),
        pass: Joi.string().required().min(3).max(20),
        mail: Joi.string().email().required(),
    })
}

module.exports = {schemas};
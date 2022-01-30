let joi = require("joi");
let id = joi.string();
let nombre = joi.string().min(3);
let apellido = joi.string().min(3);
let edad = joi.number();
let alias = joi.string().min(2);
let avatar = joi.string().min(3);
let text = joi.string();
let day = joi.string();
let hour = joi.string();
let mensajesSchema = {
    author: {
        id:id.required(),
        nombre: nombre.required(),
        apellido: apellido.required(),
        edad: edad.required(),
        alias: alias.required(),
        avatar: avatar.required()
    },
    text: text.required(),
    day: day,
    hour: hour
}

module.exports = {mensajesSchema}

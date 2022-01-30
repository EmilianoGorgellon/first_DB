let joi = require("joi");
let nombre = joi.string().min(3);
let foto = joi.string().min(3);
let precio = joi.number();

let productosSchema = {
    nombre: nombre.required(),
    precio: precio.required(),
    foto: foto.required()
}

module.exports = {productosSchema}

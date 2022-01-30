let {Schema, model} = require("mongoose");
let {mensajesSchema} = require("../schema/mensajes.schema");
let mensajeSchema = new Schema(mensajesSchema);
let mensajeModel = new model("mensajes", mensajeSchema);

module.exports = {mensajeModel};

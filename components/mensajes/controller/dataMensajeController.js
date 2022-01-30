const {config} = require("../../../config");
// mongo
let {mensajeModel} = require("../../../models/model/mensajes.model");
let {connection} = require("../../../config/mongodb");
// firebase
let {db:firebaseDB} = require("../../../utils/firebase");

let Mensaje = require("../services/dataMensajeService");
let mensaje;
if (config.db_name === "mongo"){
    mensaje = new Mensaje(mensajeModel, null, config.db_name);
} else if (config.db_name === "firebase") {
    mensaje = new Mensaje(firebaseDB, "mensajes", config.db_name);
} else {
    mensaje = new Mensaje("./data/mensajes.txt", null, null);
}

const sendDataMensajes = async (req, res, next) => {
    res.json(await mensaje.readMensajes());
}
module.exports = {sendDataMensajes};

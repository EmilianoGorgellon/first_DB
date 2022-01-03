let Mensaje = require("../services/dataMensajeService");
let dbSqlite = require("../../../config/dbSqlite3")
let mensaje = new Mensaje(dbSqlite.client, "mensajes");

const sendDataMensajes = async (req, res, next) => {
    await res.json(mensaje.readMensajes());
}
module.exports = {sendDataMensajes};

let Producto = require("../service/dataFormService");
const db_object = require("../../../config/db");
let producto = new Producto(db_object.client, "producto")
const sendDataPost = async (req, res) => {
    await res.json(producto.insertProducto(req.body))
}
    
module.exports = { sendDataPost }
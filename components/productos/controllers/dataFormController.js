let Producto = require("../service/dataFormService");
const { config } = require("../../../config");
const { productoModel } = require("../../../models/model/productos.model");
const { db: firebaseDB } = require("../../../utils/firebase");
let producto;
if (config.db_name === "mongo") {
    producto = new Producto(productoModel, null, config.db_name);
} else if (config.db_name === "firebase") {
    producto = new Producto(firebaseDB, "productos", config.db_name);
} else {
    producto = new Producto("./data/productos.txt", null, config.db_name);
}
const sendDataPost = async (req, res) => {
    await res.json(producto.insertProducto(req.body))
}
    
module.exports = { sendDataPost }
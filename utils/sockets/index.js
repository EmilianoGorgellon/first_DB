let {Server: SocketIo} = require("socket.io");
let moment = require("moment");
const {config} = require("../../config");
// util
// let inspect = require("../../helper/normalizr/util");

// fileSystem
const fs = require("fs");
// mongo
let {mensajeModel} = require("../../models/model/mensajes.model");
let {productoModel} = require("../../models/model/productos.model");
let {connection} = require("../../config/mongodb");
// firebase
let {db:firebaseDB} = require("../../utils/firebase");

let Mensaje = require("../../components/mensajes/services/dataMensajeService");
let Producto = require("../../components/productos/service/dataFormService");
let mensajes;
let producto;
if (config.db_name === "mongo") {
    mensajes = new Mensaje(mensajeModel, null, config.db_name);
    producto = new Producto(productoModel, null, config.db_name);    
} else if (config.db_name === "firebase") {
    mensajes = new Mensaje(firebaseDB, "mensajes", config.db_name);
    producto = new Producto(firebaseDB, "productos", config.db_name);
} else {
    mensajes = new Mensaje("./data/mensajes.txt", null, config.db_name);
    producto = new Producto("./data/productos.txt", null, config.db_name);
}
class Socket {
    static instancia;
    constructor(http){
        if (Socket.instancia){
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new SocketIo(http);
        this.mensajes = [];
        this.productos = [];
    }

    init() {
        try {
            this.io.on('connect', async socket => {
                this.mensajes = await this.readDataMensajes();
                // inspect(this.mensajes)
                this.productos = await this.readDataProducto();
                let dataNormalizeJson = JSON.stringify(this.mensajes);
                dataNormalizeJson = dataNormalizeJson.length;
                let dataDenormalize = await this.compresion();
                dataDenormalize = JSON.stringify(dataDenormalize).length;
                let porcentajeCompresion = (dataNormalizeJson * 100) / dataDenormalize;
                socket.emit("init", this.mensajes, this.productos, porcentajeCompresion.toFixed(2))
                socket.on("chat_text", async data => {
                    data = {
                        ...data,
                        day: moment().format('L'),
                        hour: moment().format('LTS')
                    }
                    await this.sendMensaje(data);
                    this.productos = await this.readDataProducto();
                    this.mensajes = await this.readDataMensajes();
                    dataNormalizeJson = JSON.stringify(this.mensajes);
                    dataNormalizeJson = dataNormalizeJson.length;
                    dataDenormalize = await this.compresion();
                    dataDenormalize = JSON.stringify(dataDenormalize).length;
                    porcentajeCompresion = dataNormalizeJson * 100 / dataDenormalize;
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos, porcentajeCompresion.toFixed(2));
                })

                socket.on("addProduct", async data => {
                    this.productos = await this.readDataProducto();
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
    async compresion() {
        return await mensajes.compresionChat()
    }
    async readDataMensajes (value) {
        return await mensajes.readMensajes(value);
    }
    async sendMensaje(data) {
        return await mensajes.insertMensaje(data);
    }
    async readDataProducto() {
        return await producto.readProductos();
    }
}

module.exports = Socket;
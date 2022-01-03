let {Server: SocketIo} = require("socket.io");
let moment = require("moment");

let dbSqlite = require("../../config/dbSqlite3");
let Mensaje = require("../../components/mensajes/services/dataMensajeService");
let mensajes = new Mensaje(dbSqlite.client, "mensajes");

let dbSql = require("../../config/db");
let Producto = require("../../components/productos/service/dataFormService");
let producto = new Producto(dbSql.client, "producto");

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
                this.productos = await this.readDataProducto();
                socket.emit("init", this.mensajes, this.productos)
                
                socket.on("chat_text", async data => {
                    data = {
                        day: moment().format('L'),
                        hour: moment().format('LTS'), 
                        ...data
                    }
                    this.mensajes.push(data);
                    this.productos = await this.readDataProducto();
                    await this.sendMensaje(data);
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos);
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
    async readDataMensajes () {
        return await mensajes.readMensajes();
    }
    async sendMensaje(data) {
        return await mensajes.insertMensaje(data);
    }
    async readDataProducto() {
        return await producto.readProductos();
    }
}

module.exports = Socket;
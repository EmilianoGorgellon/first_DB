let fs = require("fs");
let {sendDataNormalizr} = require("../../../helper/normalizr");
class Mensaje {
    constructor(db_client, db_collection, db_name) {
        this.db_client = db_client;
        this.db_collection = db_collection;
        this.db_name = db_name
    }
    async readMensajes(readMensajesFs) {
        try {
            if (this.db_name === "mongo") {
                let dataMsj = await this.db_client.find().select('-_id');;
                return sendDataNormalizr(dataMsj);
            } else if (this.db_name === "firebase"){
                let getProductos = await this.db_client.collection(`${this.db_collection}`).get();
                let dataMsj = [];
                getProductos.forEach(element => dataMsj.push({id:element.id, ...element.data()}))
                return sendDataNormalizr(dataMsj);
            }
            let getAllData = await fs.promises.readFile(`${this.db_client}`, 'utf-8');
            if (readMensajesFs) return JSON.parse(getAllData);
            return sendDataNormalizr(JSON.parse(getAllData));
        } catch (error) {
            console.log("Error en read mensajes")
        }
    }
    async insertMensaje(data){
        try {
            if (this.db_name === "mongo") {                
                return await this.db_client.create(data);
            } else if (this.db_name === "firebase") {
                return await this.db_client.collection(`${this.db_collection}`).doc().set(data);
            }
            let getAllData = await this.readMensajes(true);
            getAllData.push(data);
            return await fs.promises.writeFile(`${this.db_client}`, JSON.stringify(getAllData, null, 2));
        } catch (error) {
            console.log("Error en insert mensaje")
        }
    }
    async compresionChat() {
        if (this.db_name === "mongo") {
            let dataMsj = await this.db_client.find().select('-_id');;
            return dataMsj;
        } else if (this.db_name === "firebase"){
            let getProductos = await this.db_client.collection(`${this.db_collection}`).get();
            let dataMsj = [];
            getProductos.forEach(element => dataMsj.push({id:element.id, ...element.data()}))
            return dataMsj;
        }
        let getAllData = await fs.promises.readFile(`${this.db_client}`, 'utf-8');
        return JSON.parse(getAllData);
    }
}

module.exports = Mensaje;
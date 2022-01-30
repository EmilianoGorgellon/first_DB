let fs = require("fs");
class Producto {
    constructor(db_client, db_collection, db_name){
        this.db_client = db_client;
        this.db_collection = db_collection;
        this.db_name = db_name
    }
    async insertProducto(data){
        try {
            if (this.db_name === "mongo") {
                return await this.db_client.create({...data});
            } else if (this.db_name === "firebase") {
                return await this.db_client.collection(`${this.db_collection}`).doc().set({...data})
            }
            let getAllData = await this.readProductos();
            getAllData.push({...data});
            return await fs.promises.writeFile(`${this.db_client}`, JSON.stringify(getAllData, null, 2));
        } catch (error) {
            console.log("Hubo error en catch de insertproudcot en producot")
        }
    }
    async readProductos() {
        try {
            if (this.db_name === "mongo") {
                return await this.db_client.find().select('-_id');
            } else if (this.db_name === "firebase") {
                let getProductos = await this.db_client.collection(`${this.db_collection}`).get();
                let sendData = [];
                getProductos.forEach(element => sendData.push({...element.data()}))
                return sendData;
            }
            let getAllData = await fs.promises.readFile(`${this.db_client}`, 'utf-8')
            return JSON.parse(getAllData);
        } catch (error) {
            console.log("Hay error en read prorudtos ")
        }
    }
}

module.exports = Producto;
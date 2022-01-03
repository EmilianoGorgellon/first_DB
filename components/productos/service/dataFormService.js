class Producto {
    constructor(db, db_name){
        this.db = db;
        this.db_name = db_name
    }
    async insertProducto(body){
        let data = {
            ...body
        }
        return await this.db.from(`${this.db_name}`).insert(data)
    }
    async readProductos() {
        return await this.db.from(`${this.db_name}`);
    }
}

module.exports = Producto;
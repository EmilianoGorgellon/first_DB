class Mensaje {
    constructor(db, db_name) {
        this.db = db;
        this.db_name = db_name
    }
    async readMensajes() {
        return await this.db.from(`${this.db_name}`);
    }
    async insertMensaje(body){
        let data = {
            ...body
        }
        return await this.db.from(`${this.db_name}`).insert(data)
    }

}

module.exports = Mensaje;
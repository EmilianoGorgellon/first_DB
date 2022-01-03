let { db } = require("./index");
let knex = require("knex");

const mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
})

class DatabaseSql {
    static client;
    constructor() {
        if (DatabaseSql.client) {
            return DatabaseSql.client
        }
        DatabaseSql.client = mysql
        this.client = DatabaseSql.client
    }
}

module.exports = new DatabaseSql();
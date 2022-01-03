let knex = require("knex");

let sqlite3 = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    }
});

class DatabaseSQlite3 {
    static client;
    constructor() {
        if (DatabaseSQlite3.client) {
            return DatabaseSQlite3.client
        }
        DatabaseSQlite3.client = sqlite3
        this.client = DatabaseSQlite3.client
    }
}

module.exports = new DatabaseSQlite3();
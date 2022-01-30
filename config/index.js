require("dotenv").config();
const name = require("../helper/switchDB");
const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    cors: `${process.env.CORS}`,
    mongo_atlas: process.env.MONGO_ATLAS_URI,
    db_name: name.db_name
}

module.exports = {config}
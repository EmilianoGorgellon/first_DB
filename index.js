let express = require("express");
let app = express();
let cors = require("cors");
const {config} = require("./config");
let Socket = require("./utils/sockets")
let {Server: HttpServer} = require("http");
let path = require("path");
// data base
const dbSql_object = require("./config/db");
const dbSql = dbSql_object.client;
const dbSqlite = require("./config/dbSqlite3");

(async ()=>{
    try {
        // create table producto in sql
        let hastable = await dbSql.schema.hasTable('producto');
        if(!hastable){
            await dbSql.schema.createTable("producto", table =>{
                table.increments("id").primary(),
                table.string("name"),
                table.integer("price"),
                table.string("image")
            });
        } else {
            console.log("Ya existe la tabla producto")
        }
    } catch (error) {
        console.log(error);
    }
})();

(async ()=>{
    try {
        // create table Mensaje in sqlite3
        let hastable = await dbSqlite.client.schema.hasTable('mensajes');
        if(!hastable){
            await dbSqlite.client.schema.createTable("mensajes", table =>{
                table.string("day"),
                table.string("hour"),
                table.string("name"),
                table.string("email"),
                table.string("mensaje")
            });
        } else {
            console.log("Ya existe la tabla mensaje")
        }
    } catch (error) {
        console.log("Error" + error);
    }
})();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(config.cors));

// handlebars
app.set("views", path.join(__dirname , "views", "ejs"));
app.set("view engine", "ejs");

// Routes
app.use(require("./routes"));

// Socket
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
socket.init();


httpServer.listen(config.port)
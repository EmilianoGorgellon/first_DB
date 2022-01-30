let express = require("express");
let app = express();
let cors = require("cors");
const {config} = require("./config");
let Socket = require("./utils/sockets")
let {Server: HttpServer} = require("http");
let path = require("path");

// Middlewares
app.use(express.static(path.join(__dirname, "public", "html")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(config.cors));

// handlebars
app.set("views", path.join(__dirname , "views", "ejs"));
app.set("view engine", "ejs");

// Routes
app.use(require("./routes"));
app.use('/api/productos-test', require("./routes/productos.test"));

// Socket
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
socket.init();


httpServer.listen(config.port)
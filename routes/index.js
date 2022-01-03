let express = require("express");
let router = express.Router();
const {sendDataPost} = require("../components/productos/controllers/dataFormController");

router.get('/', (req, res, next) => {
    res.render("form", { formularioTitle:"Formulario" });
})

router.post('/api/productos', sendDataPost);


module.exports = router;
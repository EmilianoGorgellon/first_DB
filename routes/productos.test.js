let express = require("express");
let router = express.Router();
let faker = require("faker");
faker.locale = "es";

router.get('/', (req, res, next) => {
    const arrayObject = [];
    for (let i = 0; i < 5; i++) {
        const object = {
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.avatar()
        }
        arrayObject.push(object)
    }
    res.send("ESTOY EN EL TEST BRO");
})

// router.post('/api/productos', sendDataPost);


module.exports = router;
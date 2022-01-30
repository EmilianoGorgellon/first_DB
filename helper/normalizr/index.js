let {schema, normalize} = require("normalizr");


const sendDataNormalizr = async (dataMsj) => {
    let data = {
        id: "mensajes",
        mensajes: dataMsj
    }
    const mensajes = new schema.Entity("mensajes");
    const organigrama = new schema.Entity('organigrama', {
        author: [mensajes]
    })
    let mensajeNormalizado = normalize(data, organigrama);
    return mensajeNormalizado
}


module.exports = {sendDataNormalizr}


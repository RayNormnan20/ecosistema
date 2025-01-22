const userModel = require("../data/userModel");

const obtenerUser=async (usuario, password) => {
    let user = null;
    try {
        user = await userModel.obtenerUser(usuario, password);
        console.log(user);
        return user;
    } catch (exception) {
        console.error('Error en obtenerUser Model:', exception);
        user = null;
    }
    return user;
}

module.exports = {obtenerUser};
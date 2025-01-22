//Importar conexion (PASO 1)
const dataType = require('sequelize');
const conexion = require("./conexion");

//Falta definir el objeto relacional a la tabla en la BD

//Mis consultas SQL
const userModel ={
    //Es lo mismo que //function getUser(usuario, password,callback){}
    obtenerUser: async (usuario, password) => {
        let resultado = null;
        try {
            const consulta = "SELECT * FROM usuario WHERE usuario=:usuario and password= AES_ENCRYPT(:password,'IDAT')";
            [resultado]= await conexion.query(consulta, {
                replacements: { usuario: usuario,password:password }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultado);
            return resultado;
        } catch (exception) {
            console.error('Error en obtenerUser Model:', exception);
            resultado = null;
            
        }
        return resultado;
    }
}
//Exporto las variables que quiero que sean accedidas de esta clase
module.exports=userModel;
//Importar userModel y Path
const userService = require("../service/userService");


const getLogin =async(req, res)=>{
    try{
        const {usuario, password} = req.body;
        const user=await userService.obtenerUser(usuario,password);
        res.status(200).json(user);
    }catch(excpetion){
        res.status(500).json({user:null,error:"Error al crear el producto"});
    }
}

//Exporto las variables que quiero que sean accedidas de esta clase
module.exports={
    getLogin
}
